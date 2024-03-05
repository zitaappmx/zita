import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty()
  @IsEmail()
  userEmail: string;

  @ApiProperty()
  @IsNumberString()
  confirmationCode: string;
}
