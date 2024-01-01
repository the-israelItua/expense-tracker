



import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { RequestContextModule } from 'nestjs-request-context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/shared/interceptors/response.interceptor';
import { SharedModule } from 'src/shared/shared.module';
import { LocalStrategy } from 'src/shared/strategy/local.strategy';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  imports: [
    RequestContextModule,
    UserModule,
    SharedModule,
    PassportModule,
    JwtModule.register({ secret: "mySecret" }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    UserService,
    // LocalStrategy,
    JwtStrategy,
  ],
  exports: [JwtStrategy, UserService],
})
export class UserModule {}

