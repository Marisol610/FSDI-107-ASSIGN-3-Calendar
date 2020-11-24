

using Microsoft.AspNetCore.Mvc;
using FullStackCalendar.Models;
using System.Linq;

namespace FullStackCalendar.Controllers

{

public class ApiController : Controller
{
    private DataContext dbContext;

    public ApiController(DataContext db)
    {
        this.dbContext =db;
    }

[HttpPost]
public IActionResult SaveTask([FromBody] Task theTask)
{
      
       dbContext.Tasks.Add(theTask);
       dbContext.SaveChanges(); 
        
        return Json(theTask);
}

[HttpGet]

public IActionResult GetTasks() 
{
    var allTasks = dbContext.Tasks.ToList();
    return Json(allTasks);
    
}
public IActionResult Test()
{
    return Content("Hello FSDI");
}

}

}
//SQL
//"insert into Task(id, title, location, important) VALUE(" +obj.id+ " + "+obj.title +", " +obj.location + "," +obj.important +")";