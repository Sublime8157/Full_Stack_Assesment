using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

using TaskManager.Models;
using TaskManager.Data;
using TaskManager.API.DTOs;
namespace TaskManager.API
{
    [Route("tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if(task == null)
                return NotFound();

            var response = new TaskResponse
            {
                Id = task.Id,
                Title = task.Title,
                IsDone = task.IsDone,
                UserId = task.UserId
            };

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTaskRequest req)
        {
            var task = new TaskItem
            {
                Title = req.Title,
                IsDone = req.IsDone,
                UserId = req.UserId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            var response = new TaskResponse
            {
                Id = task.Id,
                Title = task.Title,
                IsDone = task.IsDone,
                UserId = task.UserId
            };

            return CreatedAtAction(nameof(GetById), new { id = task.Id }, response);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTaskRequest req)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            task.Title = req.Title;
            task.IsDone = req.IsDone;

            await _context.SaveChangesAsync();

            var response = new TaskResponse
            {
                Id = task.Id,
                Title = task.Title,
                IsDone = task.IsDone,
                UserId = task.UserId
            };

            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
