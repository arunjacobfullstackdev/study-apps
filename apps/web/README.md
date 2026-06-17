# web

Next.js web app in the Turborepo.

## Scripts

- `pnpm dev` - run the app locally on port 3000
- `pnpm local` - start the web app and API together via Turborepo
- `pnpm build` - create a production build
- `pnpm start` - start the production server
- `pnpm lint` - lint with the shared ESLint config
- `pnpm check-types` - run Next.js and TypeScript checks

## Docker

Build the image from the repository root:

```sh
docker build -f apps/web/Dockerfile -t my-turborepo-web .
```

Run the container:

```sh
docker run --rm -p 3000:3000 my-turborepo-web
```

The app is available at `http://localhost:3000`.

## Notes

- The Docker build uses pnpm and a pruned Turborepo workspace.
- The runtime image uses Next.js standalone output so it does not need the full repository.
