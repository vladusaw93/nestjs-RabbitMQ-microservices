import { Controller, Get} from '@nestjs/common';

@Controller('user')
export class UserController {

  constructor() {
  }

  @Get('info')
  async info() {
    return 'id';
  }

}

