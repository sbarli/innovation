import { registerAs } from '@nestjs/config';

const appConfig = registerAs('app', () => ({}));

const mongoConfig = registerAs('mongo', () => ({
  uri: process.env['MONGO_URL'],
}));

export { appConfig, mongoConfig };
