import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(phone: string, password: string): Promise<Partial<User>> {
    try {
      const user = await this.authService.validateDefaultUser(phone, password);
      if (!user) {
        throw new UnauthorizedException('Email or password is incorrect');
      }
      Object.assign(user, {
        token: this.authService.generateUserAccessToken(user),
      });
      return user;
    } catch (e) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
  }
}
