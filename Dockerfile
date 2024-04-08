FROM node:iron-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /build
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM nginx:1.25-alpine-slim AS web
EXPOSE 80
COPY --from=build /build/packages/web/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
