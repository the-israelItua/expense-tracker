import { Controller, Get } from '@nestjs/common';
import { SecureEndpoint } from 'src/shared/decorators/securedendpoint.decorators';
import { UserService } from './user.service';

@Controller('users')
@SecureEndpoint()
export class UserController {
    constructor(
        private userService: UserService,
      ) {
  
      }
    
      @Get()
      fetchUsers() {
        return this.userService.find();
      }
    
}
