using api.Data;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController: ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public TasksController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{userId}")]
        public IActionResult GetTasks(int userId)
        {
            try
            {
                List<Models.Task> tasks = new List<Models.Task>();
                tasks = _dbContext.Tasks.Where(t => t.UserId == userId).ToList();

                //Can return tasks no matter what since an empty array is fine 
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving tasks: " + ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] Models.Task task) 
        {
            try
            {
                Models.Task newTask = new Models.Task
                {
                    UserId = task.UserId,
                    Name = task.Name,
                    Description = task.Description,
                    DateAdded = DateTime.Now,
                    Priority = task.Priority,
                    Completed = task.Completed,
                    BackLogged = task.BackLogged,

                };

                _dbContext.Tasks.Add(newTask);
                _dbContext.SaveChanges();
                return Ok(newTask);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while creating task: " + ex.Message);

            }
        }

        //[HttpPut]
        //public IActionResult UpdateTask([FromBody] Models.Task task)
        //{

        //}

        [HttpDelete("{taskId}")]
        public IActionResult DeleteTask(int taskId)
        {
            try
            {
                Models.Task taskToDelete = _dbContext.Tasks.First(t => t.Id == taskId);
                _dbContext.Tasks.Remove(taskToDelete);
                _dbContext.SaveChanges();
                return Ok("Succesfully Deleted");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while deleting task: " + ex.Message);
            }

        }
    }
}
