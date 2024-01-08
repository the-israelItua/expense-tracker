
import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
  import { randomBytes, scrypt as _scrypt } from 'crypto';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LoginUserDto } from 'src/user/dtos/login-user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { promisify } from 'util';

  
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
      ) {}
    
  async validateDefaultUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ email });
    // if (user && (await user.comparePassword(password))) {
    //   return user;
    // }
    return null;
  }

  generateUserAccessToken(user: User) {
    return this.jwtService.sign(instanceToPlain(user), { expiresIn: '2d', secret: process.env.JWT_SECRET  });
  }

    async signup(body: CreateUserDto) {
        const user = await this.userService.findOne({email: body.email, phoneNumber: body.phoneNumber});
        if (user) {
          throw new BadRequestException('This user already exists');
        }
    
        const salt = randomBytes(8).toString('hex');
    
        const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    
        const hashedPassword = salt + '.' + hash.toString('hex');
    
        const newUser = await this.userService.create({
         ...body,
          password: hashedPassword,
        });

       return {
            access_token: this.generateUserAccessToken(newUser),
          };
      }

      async signin(body: LoginUserDto) {
        const user = await this.userService.findOne({email: body.email});
        if (!user) {
          throw new BadRequestException('User does not exist');
        }
    
        const [salt, storedHash] = user.password.split('.');
    
        const hash = (await scrypt(body.password, salt, 32)) as Buffer;

        if (storedHash === hash.toString('hex')) {
          return {
            access_token: this.generateUserAccessToken(user),
          };
        }
    
        throw new BadRequestException('Incorrect credentials.');
      }
}
