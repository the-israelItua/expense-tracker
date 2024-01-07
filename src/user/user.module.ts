import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}

