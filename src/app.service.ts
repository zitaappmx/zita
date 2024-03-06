import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(user): { hello: string } {
    const hello = {
      hello: user,
    };
    return hello;
  }
}
