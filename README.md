# ToDo List Fullstack Test App

## Stack
- Monorepo with [Turborepo](https://turborepo.dev/)
- **Frontend**: React, Vite, TypeScript, Styled Components
- **Backend**: NodeJS, Express, tRPC, TypeScript
- GitHub Actions for CI/CD

## Ports
-  :3000 - Web
-  :3001 - Server

## Scripts

| command                      | description                                                                                     |
|------------------------------|-------------------------------------------------------------------------------------------------|
| `pnpm start`                 | Runs the production build of the server (`/server`)                                             |
| `pnpm pm2:start`             | Runs the server production build as a background process, using pm2 (`/server`)                 |
| `pnpm pm2:delete`            | Deletes all pm2 processes (`/server`)                                                           |
| `pnpm pm2:logs`              | Shows logs for pm2 (`/server`)                                                                  |
| `pnpm dev`                   | Launches apps and bundles all packages in watch mode                                            |
| `pnpm lint`                  | Performs an eslint check through all workspaces                                                 |
| `pnpm lint:fix`              | Performs an eslint fix through all workspaces                                                   |
| `pnpm ts:check`              | Performs a TypeScript check through all workspaces                                              |
| `pnpm ts:references`         | Syncs TypeScript references in all `tsconfig.json` files + updates `nodemon.json` `watch` array |
| `pnpm stylelint`             | Performs an stylelint check through all workspaces                                              |
| `pnpm check`                 | Performs eslint, TypeScript, and stylelint checks through all workspaces                        |
| `pnpm build`                 | Builds all apps                                                                                 |
| `pnpm build:lib`             | Bundles all packages                                                                            |
| `pnpm postinstall`           | Ensures that local or CI environment is ready after installing packages                         |
