import { MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { RequestUserMiddleware } from './shared/middleware/request-user.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { AuthController } from './auth/auth.controller';
import { CategoryModule } from './category/category.module';
import { ExpenseModule } from './expense/expense.module';
import { IncomeModule } from './income/income.module';
import { JwtStrategy } from './shared/strategy/jwt.strategy';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SharedModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    CategoryModule,
    ExpenseModule,
    IncomeModule,
  ],
  // ],
  controllers: [AppController, AuthController,],
  providers: [
    JwtStrategy,
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionFilter,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
      {
        provide: APP_PIPE,
        useValue: new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
        }),
      },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestUserMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
