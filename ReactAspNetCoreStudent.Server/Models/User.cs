using System.ComponentModel.DataAnnotations;

namespace AspNetCore.WebAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public bool IsAdmin { get; set; } = false;

        public string Photo { get; set; } = "User.png"; 
    }
}