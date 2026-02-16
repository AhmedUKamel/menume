export interface IPostgresConfig {
  readonly url: string;
}

export interface IPostgresEnv {
  readonly POSTGRES_URL: string;
}
