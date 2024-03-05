import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendConfirmationCodeDto {
  @ApiProperty()
  @IsEmail()
  userEmail: string;
}
