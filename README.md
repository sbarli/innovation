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
yarn dev:backend

// OR

cd apps/backend && yarn dev
```

### Mongo

**!!Important**: If facing errors starting the backend due to Mongoose not connecting, make sure your IP is allow-listed in MongoDb.