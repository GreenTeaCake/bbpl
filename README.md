# BBPL Monorepo

## No-brainer start

```shell
$ docker compose up --build
# web is at http://localhost:5173/posts
```

## Full Startup Flow

### Pre-requisites

- [Node 20 'Iron' (LTS)](https://nodejs.org/en/download) is installed
- [pnpm](https://pnpm.io/) package manager is installed

> There is `.nvmrc` so you can go like this:
>
> ```shell
> # in workspace root
> $ nvm use
> $ npm i -g pnpm
> ```

### Build and Check Code

```shell
# go to workspace root
$ cd <workspace_root>
# install dependencies
$ pnpm install
# build packages
$ pnpm run -r build
# (optional) lint code
$ pnpm lint
# (optional) format code
$ pnpm format
# (optional) run tests
$ pnpm run -r test
# start development environment
$ pnpm run -r start
# web is at http://localhost:5173/posts
```
