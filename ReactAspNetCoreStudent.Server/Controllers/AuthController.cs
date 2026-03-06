using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using AspNetCore.WebAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using AspNetCore.WebAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace AspNetCore.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly AppDbContext _db;

        public AuthController(ILogger<AuthController> logger, AppDbContext db)
        {
            _logger = logger;
            _passwordHasher = new PasswordHasher<User>();
            _db = db;

            // Ensure there are default users in the database
            try
            {
                if (!_db.Users.Any())
                {
                    var admin = new User { Username = "admin", Email = "admin@gmail.com", IsAdmin = true, Photo = "User.png" };
                    admin.Password = _passwordHasher.HashPassword(admin, "admin123");

                    var user = new User { Username = "user", Email = "user@gmail.com", IsAdmin = false, Photo = "User.png" };
                    user.Password = _passwordHasher.HashPassword(user, "user123");

                    _db.Users.AddRange(admin, user);
                    _db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to seed default users");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { success = false, error = "Username and password are required" });

            if (await _db.Users.AnyAsync(u => u.Username.ToLower() == request.Username.ToLower()))
                return BadRequest(new { success = false, error = "Username already exists" });

            var isFirstUser = !await _db.Users.AnyAsync();

            var newUser = new User
            {
                Username = request.Username,
                Email = request.Email ?? string.Empty,
                IsAdmin = isFirstUser,
                Photo = request.Photo ?? "User.png"
            };

            newUser.Password = _passwordHasher.HashPassword(newUser, request.Password);

            _db.Users.Add(newUser);
            await _db.SaveChangesAsync();

            var safeUser = new { newUser.Id, newUser.Username, newUser.Email, newUser.IsAdmin, newUser.Photo };
            return Ok(new { success = true, user = safeUser });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { success = false, error = "Username and password are required" });

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == request.Username.ToLower());
            if (user == null)
                return BadRequest(new { success = false, error = "Invalid username or password" });

            var verify = _passwordHasher.VerifyHashedPassword(user, user.Password, request.Password);
            if (verify != PasswordVerificationResult.Success)
                return BadRequest(new { success = false, error = "Invalid username or password" });

            var safeUser = new { user.Id, user.Username, user.Email, user.IsAdmin, user.Photo };
            return Ok(new { success = true, user = safeUser });
        }

        // Note: without server-side sessions the client must tell which user is current (e.g. by storing id/token)
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser([FromQuery] int? id, [FromQuery] string? username)
        {
            if (id == null && string.IsNullOrEmpty(username))
                return Ok(new { success = false, user = (object?)null });

            User? user = null;
            if (id != null)
                user = await _db.Users.FindAsync(id.Value);
            else if (!string.IsNullOrEmpty(username))
                user = await _db.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

            if (user == null)
                return Ok(new { success = false, user = (object?)null });

            return Ok(new { success = true, user });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // No server-side session to clear when using DB-based auth without cookies
            return Ok(new { success = true, message = "Logged out" });
        }

        [HttpGet("users-list")]
        public async Task<IActionResult> GetUsersList()
        {
            var users = await _db.Users.Select(u => new { u.Id, u.Username, u.Email, u.IsAdmin, u.Photo }).ToListAsync();
            var total = await _db.Users.CountAsync();
            return Ok(new { totalUsers = total, users });
        }

        [HttpPost("reset-users")]
        public async Task<IActionResult> ResetUsers()
        {
            try
            {
                _db.Users.RemoveRange(_db.Users);
                await _db.SaveChangesAsync();

                var admin = new User { Username = "admin", Email = "admin@gmail.com", IsAdmin = true, Photo = "User.png" };
                admin.Password = _passwordHasher.HashPassword(admin, "admin123");

                var user = new User { Username = "user", Email = "user@gmail.com", IsAdmin = false, Photo = "User.png" };
                user.Password = _passwordHasher.HashPassword(user, "user123");

                _db.Users.AddRange(admin, user);
                await _db.SaveChangesAsync();

                return Ok(new { success = true, message = "Users reset to default" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to reset users");
                return StatusCode(500, new { success = false, error = "Failed to reset users" });
            }
        }

        [HttpGet("debug")]
        public async Task<IActionResult> Debug()
        {
            var users = await _db.Users.Select(u => new { u.Id, u.Username, u.IsAdmin, u.Photo }).ToListAsync();
            var total = users.Count;
            return Ok(new
            {
                totalUsers = total,
                users,
                sessionHasData = false
            });
        }

        [HttpPost("upload-photo")]
        public async Task<IActionResult> UploadPhoto(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            // Validate file size (max 5 MB)
            const long maxFileSize = 5 * 1024 * 1024;
            if (file.Length > maxFileSize)
                return BadRequest("File too large. Max 5 MB allowed.");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var originalFileName = Path.GetFileName(file.FileName);
            var ext = Path.GetExtension(originalFileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(ext) || !allowedExtensions.Contains(ext))
                return BadRequest("Invalid file type.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "pics");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = $"{Guid.NewGuid()}{ext}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            try
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to save uploaded file");
                return StatusCode(500, "Failed to save file");
            }

            return Ok(new { fileName = uniqueFileName });
        }
    }

}