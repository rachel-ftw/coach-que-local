const defaultConfig = env => {
  const connectionString = (
    process.env.DATABASE_URL ||
    `postgres://${process.env.USER}@localhost:5432/coach-que-${env}`
  )

  return {
    client: 'postgresql',
    connection: connectionString,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/../io/database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: __dirname + `/../io/database/seeds/${env}`
    }
  }
}

module.exports = {
  test: defaultConfig('test'),
  development: defaultConfig('development'),
  production: defaultConfig('production'),
}
