using FullStack.API.Data;
using FullStack.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Controllers
{

    [ApiController]
    [Route("/api/[controller]")]
    public class CoursesController : Controller
    {
        private readonly FullStackDbContext _fullStackDbContext;

        public CoursesController(FullStackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _fullStackDbContext.Courses.ToListAsync();
            return Ok(courses);
        }

        [HttpPost]
        public async Task<IActionResult> AddCourse([FromBody]Course courseRequest)
        {

            courseRequest.ID = Guid.NewGuid();
            await _fullStackDbContext.Courses.AddAsync(courseRequest);
            await _fullStackDbContext.SaveChangesAsync();

            return Ok(courseRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetCourse([FromRoute]Guid id)
        {

           var course = await _fullStackDbContext.Courses.FirstOrDefaultAsync(c => c.ID == id);

            if(course == null)
            {

                return NotFound();

            }
            return Ok(course);
        }



        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> updateCourse([FromRoute] Guid id, Course updateCourseRequest)
        {
           var course = await _fullStackDbContext.Courses.FindAsync(id);
            
            if (course == null)
            {
                return NotFound();
            }

            course.Name = updateCourseRequest.Name;
            course.Description = updateCourseRequest.Description;
            course.Duration = updateCourseRequest.Duration;

           await _fullStackDbContext.SaveChangesAsync(); 
            
            return Ok(course);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteCourse([FromRoute] Guid id)
        {

            var course = await _fullStackDbContext.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

             _fullStackDbContext.Courses.Remove(course);
            await _fullStackDbContext.SaveChangesAsync();

            return Ok(course);

        }

    }
}
