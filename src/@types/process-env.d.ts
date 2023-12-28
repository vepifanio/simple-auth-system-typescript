namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined
    JWT_SECRET: string
    POSTGRES_HOST: string
    POSTGRES_USER: string
    POSTGRES_PASSWORD: string
    POSTGRES_DB: string
  }
}
