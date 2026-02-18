using System.ComponentModel.DataAnnotations;

namespace TaskManager.API.DTOs
{
    public class CreateTaskRequest
    {
        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public bool IsDone { get; set; } = false;

        [Required]
        public int UserId { get; set; }
    }
}
