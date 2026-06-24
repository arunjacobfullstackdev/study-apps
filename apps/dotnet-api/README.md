# dotnet-api

Controller-based ASP.NET Core API app in the Turborepo.

## Endpoints

- `GET /greeting/{name}`: returns a greeting string from the shared `dotnet-shared` package.

## Scripts

- `pnpm --filter dotnet-api dev`: run with hot reload on port `5050`
- `pnpm --filter dotnet-api build`: build the API project
- `pnpm --filter dotnet-api test`: run API-focused tests

## Local dotnet CLI

From repo root:

```sh
dotnet restore dotnet.sln
dotnet build dotnet.sln
dotnet test dotnet.sln
dotnet run --project apps/dotnet-api/dotnet-api.csproj --urls http://localhost:5050
```

## Docker

From repo root:

```sh
pnpm docker:dotnet-api:up
pnpm docker:dotnet-api:down
```
