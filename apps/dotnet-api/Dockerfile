FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY apps/dotnet-api/dotnet-api.csproj apps/dotnet-api/
COPY packages/dotnet-shared/dotnet-shared.csproj packages/dotnet-shared/
RUN dotnet restore apps/dotnet-api/dotnet-api.csproj

COPY apps/dotnet-api/. apps/dotnet-api/
COPY packages/dotnet-shared/. packages/dotnet-shared/
RUN dotnet publish apps/dotnet-api/dotnet-api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:5050
EXPOSE 5050

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "dotnet-api.dll"]
