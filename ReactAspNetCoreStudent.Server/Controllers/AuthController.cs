using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace AspNetCore.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private static readonly List<User> _defaultUsers = new()
        {
            new User { Id = 1, Username = "admin", Email = "admin@gmail.com", Password = "admin123", IsAdmin = true, Photo = "User.png" },
            new User { Id = 2, Username = "user", Email = "user@gmail.com", Password = "user123", IsAdmin = false, Photo = "User.png" }
        };

        private List<User> GetUsersFromSession()
        {
            try
            {
                var usersJson = HttpContext.Session.GetString("Users");
                if (!string.IsNullOrEmpty(usersJson))
                {
                    return JsonSerializer.Deserialize<List<User>>(usersJson) ?? new List<User>();
                }

                SaveUsersToSession(_defaultUsers);
                return _defaultUsers;
            }
            catch (Exception ex)
            {
                return _defaultUsers;
            }
        }

        private void SaveUsersToSession(List<User> users)
        {
            try
            {
                var usersJson = JsonSerializer.Serialize(users);
                HttpContext.Session.SetString("Users", usersJson);
            }
            catch (Exception ex)
            {
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var users = GetUsersFromSession();

            if (users.Any(u => u.Username == request.Username))
                return BadRequest(new { success = false, error = "Username already exists" });

            var isFirstUser = !users.Any();

            var newUser = new User
            {
                Id = users.Count > 0 ? users.Max(u => u.Id) + 1 : 1,
                Username = request.Username,
                Email = request.Email,
                Password = request.Password,
                IsAdmin = isFirstUser,
                Photo = request.Photo ?? "User.png"
            };

            users.Add(newUser);
            SaveUsersToSession(users);

            HttpContext.Session.SetString("UserId", newUser.Id.ToString());
            HttpContext.Session.SetString("Username", newUser.Username);
            HttpContext.Session.SetString("Email", newUser.Email);
            HttpContext.Session.SetString("IsAdmin", newUser.IsAdmin.ToString());
            HttpContext.Session.SetString("Photo", newUser.Photo);

            return Ok(new { success = true, user = newUser });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var users = GetUsersFromSession();
            var user = users.FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);

            if (user == null)
                return BadRequest(new { success = false, error = "Invalid username or password" });

            HttpContext.Session.SetString("UserId", user.Id.ToString());
            HttpContext.Session.SetString("Username", user.Username);
            HttpContext.Session.SetString("Email", user.Email);
            HttpContext.Session.SetString("IsAdmin", user.IsAdmin.ToString());
            HttpContext.Session.SetString("Photo", user.Photo ?? "User.png");

            return Ok(new { success = true, user });
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userId))
                return Ok(new { success = false, user = (object?)null });

            var users = GetUsersFromSession();
            var user = users.FirstOrDefault(u => u.Id.ToString() == userId);
            return Ok(new { success = true, user });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Ok(new { success = true, message = "Logged out" });
        }

        [HttpGet("users-list")]
        public async Task<IActionResult> GetUsersList()
        {
            var users = GetUsersFromSession();
            var userList = users.Select(u => new { u.Id, u.Username, u.Email, u.IsAdmin, u.Photo }).ToList();
            return Ok(new { totalUsers = users.Count, users = userList });
        }

        [HttpPost("reset-users")]
        public IActionResult ResetUsers()
        {
            SaveUsersToSession(_defaultUsers);
            return Ok(new { success = true, message = "Users reset to default" });
        }

        [HttpGet("debug")]
        public IActionResult Debug()
        {
            var users = GetUsersFromSession();
            return Ok(new
            {
                totalUsers = users.Count,
                users = users.Select(u => new { u.Id, u.Username, u.IsAdmin, u.Photo }),
                sessionHasData = !string.IsNullOrEmpty(HttpContext.Session.GetString("Users"))
            });
        }

        [HttpPost("upload-photo")]
        public async Task<IActionResult> UploadPhoto(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "pics");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return Ok(new { fileName = uniqueFileName });
        }
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public bool IsAdmin { get; set; } = false;
        public string Photo { get; set; } = "User.png";
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Photo { get; set; }
    }
}