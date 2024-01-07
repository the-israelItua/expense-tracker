import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password@1A',
    database: 'expense-tracker',

      name: 'default',
    //   type: process.env.TYPEORM_DB_TYPE as any,
    //   host: process.env.TYPEORM_HOST,
    //   port: Number(process.env.TYPEORM_PORT),
    //   username: process.env.TYPEORM_USERNAME,
    //   password: process.env.TYPEORM_PASSWORD,
    //   database: process.env.TYPEORM_DATABASE_NAME,
      logging: true,
      // ssl:
      //   process.env.ENVIRONMENT === 'development'
      //     ? false
      //     : {
      //         rejectUnauthorized: false,
      //       },
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/db/migrations/*'],
      synchronize: true,
      dropSchema: false,
      // extra: {
      //   connectionLimit: 1,
      // },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class SharedModule {}