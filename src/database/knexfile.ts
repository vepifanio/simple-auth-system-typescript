import type { Knex } from 'knex'

// Update with your config settings.

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      connectionString: 'postgresql://docker:postgres@localhost:5432/postgres',
      host: 'localhost',
      port: 5432,
      user: 'docker',
      password: 'postgres',
      database: 'postgres',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      extension: 'ts',
    },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },
}