import { Controller, Get, Request } from '@nestjs/common';
import { SecureEndpoint } from 'src/shared/decorators/securedendpoint.decorators';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
@SecureEndpoint()
@Serialize(UserDto)
export class UserController {
    constructor(
        private userService: UserService,
      ) {
  
      }
    
      @Get()
      fetchUser(@Request() req: any,) {
        return this.userService.findOne({ email: req.user.email , phoneNumber: req.user.phoneNumber});
      }
    
}
