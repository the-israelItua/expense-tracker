/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
// import { RequestContext } from 'nestjs-request-context';

@Injectable({ scope: Scope.REQUEST })
export class RequestUserMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  // eslint-disable-next-line @typescript-eslint/ban-types
  async use(req: Request, res: Response, next: Function) {
    if (this.jwtService) {
      if (req?.headers['authorization']) {
        const authorization = req.headers['authorization']?.substr(7); // Get bearer token

        if (authorization) {
          try {
            const userData = this.jwtService?.verify(authorization, {
              secret: process.env.JWT_SECRET,
            });
            // TODO: Implement caching here in the future
            const user = await this.userService.findOne({email: userData?.email});
            // console.log(user);
            req['loggedInUser'] = user;
          } catch (error) {
            // req['user'] = null;
          }
        }
      }
      next();
    } else {
      next();
    }
  }
}
