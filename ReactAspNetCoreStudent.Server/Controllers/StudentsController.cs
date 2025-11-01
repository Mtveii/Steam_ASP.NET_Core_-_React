// Controllers/StudentsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspNetCore.WebAPI.Models;
using AspNetCore.WebAPI.Data;

namespace AspNetCore.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetStudents([FromQuery] string search = "")
        {
            try
            {
                var students = _context.Students.AsQueryable();

                if (!string.IsNullOrEmpty(search))
                {
                    students = students.Where(s =>
                        (s.Name != null && s.Name.Contains(search)) ||
                        (s.Surname != null && s.Surname.Contains(search)));
                }

                var result = await students.OrderBy(s => s.Name).ToListAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to get games" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudent(int id)
        {
            try
            {
                var student = await _context.Students.FindAsync(id);
                if (student == null)
                {
                    return NotFound(new { error = "Game not found" });
                }

                return Ok(student);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to get game" });
            }
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> PostStudent([FromBody] Student student)
        {
            try
            {
                if (student == null)
                {
                    return BadRequest(new { error = "Game data is required" });
                }

                if (string.IsNullOrEmpty(student.Name) || string.IsNullOrEmpty(student.Surname))
                {
                    return BadRequest(new { error = "Game title and publisher are required" });
                }

                var newStudent = new Student
                {
                    Name = student.Name.Trim(),
                    Surname = student.Surname.Trim(),
                    Age = student.Age,
                    GPA = student.GPA,
                    Photo = string.IsNullOrEmpty(student.Photo) ? "default.png" : student.Photo
                };

                _context.Students.Add(newStudent);
                await _context.SaveChangesAsync();

                return Ok(newStudent);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to create game" });
            }
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> PutStudent([FromBody] Student student)
        {
            try
            {
                var existingStudent = await _context.Students.FindAsync(student.Id);
                if (existingStudent == null)
                {
                    return NotFound(new { error = "Game not found" });
                }

                existingStudent.Name = student.Name;
                existingStudent.Surname = student.Surname;
                existingStudent.Age = student.Age;
                existingStudent.GPA = student.GPA;
                existingStudent.Photo = student.Photo;

                await _context.SaveChangesAsync();
                return Ok(existingStudent);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to update game" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            try
            {
                var student = await _context.Students.FindAsync(id);
                if (student == null)
                {
                    return NotFound(new { error = "Game not found" });
                }

                _context.Students.Remove(student);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Game deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to delete game" });
            }
        }

        [HttpPost("fix-images")]
        public async Task<IActionResult> FixImages()
        {
            var students = await _context.Students.ToListAsync();
            foreach (var student in students)
            {
                if (string.IsNullOrEmpty(student.Photo) || student.Photo == "default.png")
                {
                    student.Photo = "default.png";
                }
            }
            await _context.SaveChangesAsync();
            return Ok(new { message = "Images fixed", totalFixed = students.Count });
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new { message = "StudentsController is working", timestamp = DateTime.UtcNow });
        }

        [HttpGet("debug")]
        public async Task<IActionResult> Debug()
        {
            var students = await _context.Students.ToListAsync();
            return Ok(new
            {
                totalGames = students.Count,
                games = students.Select(s => new { s.Id, s.Name, s.Photo })
            });
        }
    }
}