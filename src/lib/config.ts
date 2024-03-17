import env from 'dotenv';

class Config {
  _config: Record<string, any>;
  constructor() {
    env.config();
    this._config = {
      port: process.env.PORT || 4000,
      dbUsername: process.env.DB_USERNAME || 'demo',
      dbPassword: process.env.DB_PASSWORD || 123456,
      dbHost: process.env.DB_HOST || 'localhost',
      dbPort: process.env.DB_PORT || 5432,
      dbName: process.env.DB_NAME,
      saltRounds: process.env.SALT_ROUNDS || 10,
      privateKey: process.env.PRIVATE_KEY || 'someday123%',
      accessTokenTtl: process.env.ACCESS_TOKEN_TTL || '30d',
      enviornment: 'DEVELOPMENT',
    };
  }

  get(key: string): any {
    const val: any = this._config[key] ?? null;

    if (!val) {
      throw new Error(`Config for key [${key}] not found`);
    }

    return val;
  }
  set(key: string, val: any): void {
    this._config[key] = val;
  }
}

const config = new Config();

export default config;
