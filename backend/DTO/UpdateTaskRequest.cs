using System.ComponentModel.DataAnnotations;

namespace TaskManager.API.DTOs
{
    public class UpdateTaskRequest
    {
        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public bool IsDone { get; set; }
    }
}
