namespace dotnet_shared;

public static class GreetingBuilder
{
	public static string BuildGreeting(string name)
	{
		var normalizedName = string.IsNullOrWhiteSpace(name) ? "Developer" : name.Trim();
		return $"Hello, {normalizedName}!";
	}
}
