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
import { ApiBody } from '@nestjs/swagger';
import { SecureEndpoint } from 'src/shared/decorators/securedendpoint.decorators';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LoginUserDto } from 'src/user/dtos/login-user.dto';
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
    @ApiBody({ type: CreateUserDto })
    createUser(@Body() body: CreateUserDto) {
      return this.authService.signup(body);
    }
  
    @Post('/signin')
    @ApiBody({ type: LoginUserDto })
    loginUser(@Body() body: LoginUserDto) {
      return this.authService.signin(body);
    }
   
  }
  