using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace AspNetCore.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private static List<ChatMessage> _chatMessages = new List<ChatMessage>();
        private static readonly object _lockObject = new object();

        [HttpGet]
        public IActionResult GetMessages()
        {
            try
            {
                lock (_lockObject)
                {
                    var recentMessages = _chatMessages
                        .OrderBy(m => m.Timestamp)
                        .TakeLast(100)
                        .ToList();

                    return Ok(recentMessages);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to get messages" });
            }
        }

        [HttpPost]
        public IActionResult SendMessage([FromBody] ChatMessage message)
        {
            try
            {
                if (message == null || string.IsNullOrEmpty(message.Message))
                {
                    return BadRequest(new { error = "Message is required" });
                }

                if (string.IsNullOrEmpty(message.Username))
                {
                    return BadRequest(new { error = "Username is required" });
                }

                var trimmedMessage = message.Message.Trim();
                if (trimmedMessage.Length > 500)
                {
                    trimmedMessage = trimmedMessage.Substring(0, 500);
                }

                var newMessage = new ChatMessage
                {
                    Id = _chatMessages.Count > 0 ? _chatMessages.Max(m => m.Id) + 1 : 1,
                    UserId = message.UserId,
                    Username = message.Username.Trim(),
                    UserPhoto = message.UserPhoto ?? "User.png",
                    Message = trimmedMessage,
                    Timestamp = DateTime.UtcNow
                };

                lock (_lockObject)
                {
                    _chatMessages.Add(newMessage);

                    if (_chatMessages.Count > 200)
                    {
                        _chatMessages = _chatMessages
                            .OrderBy(m => m.Timestamp)
                            .TakeLast(200)
                            .ToList();
                    }
                }

                return Ok(newMessage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to send message" });
            }
        }

        [HttpDelete("clear")]
        public IActionResult ClearMessages()
        {
            try
            {
                lock (_lockObject)
                {
                    _chatMessages.Clear();
                }
                return Ok(new { message = "Chat cleared successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to clear chat" });
            }
        }

        [HttpPost("add-sample")]
        public IActionResult AddSampleMessages()
        {
            try
            {
                var sampleMessages = new[]
                {
                    new ChatMessage { Id = 1, UserId = 1, Username = "admin", UserPhoto = "User.png", Message = "Welcome to the global chat!", Timestamp = DateTime.UtcNow.AddMinutes(-10) },
                };

                lock (_lockObject)
                {
                    _chatMessages.AddRange(sampleMessages);
                }

                return Ok(new { message = "Sample messages added", count = sampleMessages.Length });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to add sample messages" });
            }
        }

        [HttpGet("debug")]
        public IActionResult Debug()
        {
            lock (_lockObject)
            {
                return Ok(new
                {
                    totalMessages = _chatMessages.Count,
                    messages = _chatMessages.Select(m => new {
                        m.Id,
                        m.Username,
                        Message = m.Message.Length > 50 ? m.Message.Substring(0, 50) + "..." : m.Message,
                        m.Timestamp
                    }),
                    memoryUsage = _chatMessages.Count * 100 
                });
            }
        }
    }

    public class ChatMessage
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string UserPhoto { get; set; } = "User.png";
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
    }
}