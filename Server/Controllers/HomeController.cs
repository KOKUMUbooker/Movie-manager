using Microsoft.AspNetCore.Mvc;

namespace MovieManager.Controllers;

[ApiController]
public class HomeController : ControllerBase
{
    [HttpGet("/")]
    public IActionResult Home()
    {
        return Ok("Hello from movie manager server");
    }
}