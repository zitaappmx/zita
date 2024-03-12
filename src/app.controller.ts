import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Authorization, CognitoUser } from '@nestjs-cognito/auth';
import { AppGroups } from './auth/dto/addUsertoGroup.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Authorization({
    allowedGroups: [AppGroups.admin],
  })
  getHello(@CognitoUser() user): { hello: string } {
    return this.appService.getHello(user);
  }
}
