



import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  imports: [
    JwtModule.register({ secret: "mySecret" }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    JwtStrategy,
  ],
  exports: [JwtStrategy, UserService],
})
export class UserModule {}

