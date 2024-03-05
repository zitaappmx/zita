import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): { hello: string } {
    const hello = {
      hello: 'world',
    };
    return hello;
  }
}
