using dotnet_shared;

namespace dotnet_api.Services;

public class GreetingService
{
    public string CreateGreeting(string? name)
    {
        return GreetingBuilder.BuildGreeting(name ?? string.Empty);
    }
}