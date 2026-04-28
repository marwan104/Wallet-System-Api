import { ConfigurationType } from './configuration.interface';

export default (): ConfigurationType => ({
  DB_URI: process.env.DATABASE_BASE_URI,
  PORT: Number(process.env.PORT),
  APP_NAME: process.env.APP_NAME,
});
