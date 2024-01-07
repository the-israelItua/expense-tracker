import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/shared/strategy/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
  ],
  exports: [ AuthService],
})
export class AuthModule {}
