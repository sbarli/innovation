# Innovation Card Game

## Get Started

### Repo Setup

1. Install deps (from root dir)

```bash
yarn install
```

2. Install husky (if not already installed)

```bash
npx husky install
```

### Local

**Run the backend app**
```bash
# REOMMENDED
yarn dev:backend

# OR

# NOT RECOMMENDED
cd apps/backend && yarn dev

# OR

# NOT RECOMMENDED
yarn workspace @inno/backend dev
```

**Run the native app**
```bash
# REOMMENDED
yarn dev:native

# OR

# NOT RECOMMENDED
cd apps/native && yarn dev

# OR

# NOT RECOMMENDED
yarn workspace @inno/native dev
```

### Mongo

**!!Important**: If facing errors starting the backend due to Mongoose not connecting, make sure your IP is allow-listed in MongoDb.

## Codegen

1. Add client-side gql definitions to `packages/gql/src`
2. When you're ready to update the generated types, run `yarn codegen` from root
  1. Generated updates should be applied to `packages/gql/generated/graphql.tsx`
  2. @inno/gql package will be rebuilt to ensure latest updates are available to consumers

## Tools

- Turborepo
- NestJs (backend app)
- Expo (native app)
- NextJs & React Native Web (web app)
- GraphQL
- Codegen
- Eslint
- Typescript
- Doppler (secret mgmt)