import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Session,
    UseGuards,
  } from '@nestjs/common';
import { SecureEndpoint } from 'src/shared/decorators/securedendpoint.decorators';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

  
  @Controller('auth')
  export class AuthController {
    constructor(
      private userService: UserService,
      private authService: AuthService,
    ) {

    }
  
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
      return this.authService.signup(body);
    }
  
    @Post('/signin')
    loginUser(@Body() body: Partial<CreateUserDto>) {
      return this.authService.signin(body);
    }
   
  }
  