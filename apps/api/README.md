# api

Node.js + TypeScript API app in the Turborepo.

## Scripts

- `pnpm dev` - run in watch mode with `tsx`
- `pnpm build` - compile TypeScript to `dist`
- `pnpm start` - run compiled output
- `pnpm lint` - lint with shared ESLint config
- `pnpm check-types` - run TypeScript type checks

## Environment variables

Create an `.env` file in this folder:

```env
PORT=4000
```

The app reads `PORT` automatically at startup.

## Docker

Build the image from the repository root:

```sh
docker build -f apps/api/Dockerfile -t my-turborepo-api .
```

Run the container:

```sh
docker run --rm -p 4000:4000 my-turborepo-api
```

Override the port if needed:

```sh
docker run --rm -e PORT=4010 -p 4010:4010 my-turborepo-api
```
