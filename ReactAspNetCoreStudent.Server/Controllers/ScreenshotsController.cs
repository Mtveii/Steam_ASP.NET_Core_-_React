// Controllers/ScreenshotsController.cs
using AspNetCore.WebAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using ReactAspNetCoreStudent.Server.Models;

namespace ReactAspNetCoreStudent.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScreenshotsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ScreenshotsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Screenshot>>> GetScreenshots()
        {
            return await _context.Screenshots
                .Include(s => s.Comments)
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Screenshot>> GetScreenshot(int id)
        {
            var screenshot = await _context.Screenshots
                .Include(s => s.Comments)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (screenshot == null)
                return NotFound();

            return screenshot;
        }

        [HttpPost]
        public async Task<ActionResult<Screenshot>> PostScreenshot(Screenshot screenshot)
        {
            screenshot.CreatedAt = DateTime.UtcNow;
            _context.Screenshots.Add(screenshot);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetScreenshot), new { id = screenshot.Id }, screenshot);
        }

        [HttpPost("{id}/vote")]
        public async Task<ActionResult> Vote(int id, [FromBody] VoteRequest voteRequest)
        {
            var screenshot = await _context.Screenshots.FindAsync(id);
            if (screenshot == null)
                return NotFound();

            screenshot.Rating += voteRequest.VoteValue;
            await _context.SaveChangesAsync();

            return Ok(new { newRating = screenshot.Rating });
        }

        [HttpPost("{id}/comments")]
        public async Task<ActionResult<Comment>> AddComment(int id, Comment comment)
        {
            var screenshot = await _context.Screenshots.FindAsync(id);
            if (screenshot == null)
                return NotFound();

            comment.ScreenshotId = id;
            comment.CreatedAt = DateTime.UtcNow;
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetScreenshot), new { id = comment.Id }, comment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScreenshot(int id)
        {
            var screenshot = await _context.Screenshots.FindAsync(id);
            if (screenshot == null)
                return NotFound();

            _context.Screenshots.Remove(screenshot);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}