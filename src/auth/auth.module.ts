import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { RequestContextModule } from 'nestjs-request-context';
import { UserModule } from 'src/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/shared/interceptors/response.interceptor';
import { SharedModule } from 'src/shared/shared.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/shared/strategy/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({ secret: "mySecret" }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
