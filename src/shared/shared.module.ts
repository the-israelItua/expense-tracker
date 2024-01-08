import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

console.log(process.env.DATABASE_NAME, "gsfdf")
@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        name: 'default',
        logging: true,
        ssl:
          process.env.ENVIRONMENT === 'development'
            ? false
            : {
                rejectUnauthorized: false,
              },
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/db/migrations/*'],
      synchronize: process.env.ENVIRONMENT === 'development',
      dropSchema: false,
      extra: {
        connectionLimit: 1,
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class SharedModule {}