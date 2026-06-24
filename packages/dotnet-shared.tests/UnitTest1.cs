namespace dotnet_shared.tests;

public class GreetingBuilderTests
{
    [Fact]
    public void BuildGreeting_ReturnsExpectedValue()
    {
        var message = GreetingBuilder.BuildGreeting("Copilot");

        Assert.Equal("Hello, Copilot!", message);
    }

    [Fact]
    public void BuildGreeting_UsesFallbackWhenInputMissing()
    {
        var message = GreetingBuilder.BuildGreeting(string.Empty);

        Assert.Equal("Hello, Developer!", message);
    }
}
