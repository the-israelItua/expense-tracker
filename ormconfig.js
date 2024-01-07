var dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
      migrationsDir: 'migrations',
    },
  };
  
  switch (process.env.NODE_ENV) {
    case 'development':
      Object.assign(dbConfig, {
        type: 'postgres',
        database: 'expense-tracker',
        entities: ['**/*.entity.js'],
      });
      break;
    case 'test':
      Object.assign(dbConfig, {
        type: 'postgres',
        database: 'expense-tracker',
        entities: ['**/*.entity.ts'],
      });
      break;
    case 'production':
      break;
    default:
      throw new Error('unknown environment');
  }
  
  module.exports = dbConfig;
  