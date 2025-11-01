using System.ComponentModel.DataAnnotations;

namespace ReactAspNetCoreStudent.Server.Models
{
    public class Screenshot
    {
        public int Id { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}