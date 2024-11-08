using api.BodyModels;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController: ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public UsersController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        //[HttpGet]
        //public IActionResult GetUser([FromBody] LoginBody body)
        //{
        //    var
        //}


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginBody body)
        {
            //var user = _dbContext.Users.FirstOrDefault(u => u.UserName == body.UserName && u.Password == body.Password);

            try
            {
                User? user = _dbContext.Users.FirstOrDefault(u => u.UserName == body.UserName && u.Password == body.Password); ;
                
                if (user != null)
                {
                    user.Password = "";
                    return Ok(user);
                }
                else
                {
                    return NotFound("Username or Password is incorrect.");
                }
             
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving user: " + ex.Message);

            }

        }

    }
}
