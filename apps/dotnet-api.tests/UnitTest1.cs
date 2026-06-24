using dotnet_api.Services;

namespace dotnet_api.tests;

public class GreetingServiceTests
{
    [Fact]
    public void CreateGreeting_WithName_ReturnsGreetingFromSharedLibrary()
    {
        var service = new GreetingService();

        var message = service.CreateGreeting("Arun");

        Assert.Equal("Hello, Arun!", message);
    }

    [Fact]
    public void CreateGreeting_WithBlankName_UsesDeveloperFallback()
    {
        var service = new GreetingService();

        var message = service.CreateGreeting("  ");

        Assert.Equal("Hello, Developer!", message);
    }
}
