import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetUserInfo {
  @ApiProperty()
  @IsString()
  bearerToken: string;
}
