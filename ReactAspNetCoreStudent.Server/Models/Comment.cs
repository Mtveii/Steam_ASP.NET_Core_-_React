using System.ComponentModel.DataAnnotations;

namespace ReactAspNetCoreStudent.Server.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public string Text { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int ScreenshotId { get; set; }
        public Screenshot Screenshot { get; set; }
    }
}