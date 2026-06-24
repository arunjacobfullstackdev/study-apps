using dotnet_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_api.Controllers;

[ApiController]
[Route("greeting")]
public class GreetingController : ControllerBase
{
    private readonly GreetingService _greetingService;

    public GreetingController(GreetingService greetingService)
    {
        _greetingService = greetingService;
    }

    [HttpGet("{name}")]
    public ActionResult<object> GetGreeting(string name)
    {
        return Ok(new { message = _greetingService.CreateGreeting(name) });
    }
}