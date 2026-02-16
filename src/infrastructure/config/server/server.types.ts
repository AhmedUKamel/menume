export interface IServerConfig {
  readonly port: number;
  readonly host: string;
}

export interface IServerEnv {
  readonly SERVER_PORT: number;
  readonly SERVER_HOST: string;
}
