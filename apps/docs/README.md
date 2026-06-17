# docs

Next.js documentation app in the Turborepo.

## Scripts

- `pnpm dev` - run the app locally on port 3001
- `pnpm build` - create a production build
- `pnpm start` - start the production server
- `pnpm lint` - lint with the shared ESLint config
- `pnpm check-types` - run Next.js and TypeScript checks

## Docker

Build the image from the repository root:

```sh
docker build -f apps/docs/Dockerfile -t my-turborepo-docs .
```

Run the container:

```sh
docker run --rm -p 3001:3001 my-turborepo-docs
```

The app is available at `http://localhost:3001`.

## Notes

- The Docker build uses pnpm and a pruned Turborepo workspace.
- The runtime image uses Next.js standalone output so it does not need the full repository.
