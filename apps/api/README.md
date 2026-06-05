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
