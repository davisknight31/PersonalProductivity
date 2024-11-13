using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {

        private readonly MyDbContext _dbContext;

        public NotesController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        [HttpGet("{userId}")]
        public IActionResult GetNotes(int userId)
        {
           try
            {
                List<Note> userNotes = _dbContext.Notes.Where(n => n.UserId == userId).ToList();

                return Ok(userNotes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving notes: " + ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateNote([FromBody] Note note)
        {
            try
            {
                Note newNote = new Note
                {
                    UserId = note.UserId,
                    Name = note.Name,
                    DateAdded = DateTime.Now,
                    Content = note.Content
                };
                _dbContext.Notes.Add(newNote);
                _dbContext.SaveChanges();

                return Ok(newNote);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while creating note: " + ex.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateNote([FromBody] Note note)
        {
            try
            {
                Note noteToUpdate = _dbContext.Notes.First(n => n.Id == note.Id);
                
                noteToUpdate.Name = note.Name;
                noteToUpdate.Content = note.Content;
                _dbContext.SaveChanges();

                return Ok(noteToUpdate);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while creating note: " + ex.Message);
            }
        }
    }
}
