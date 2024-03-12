import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, MinLength } from 'class-validator';

export class ConfirmPasswordDto {
  @ApiProperty()
  @IsEmail()
  userEmail: string;

  @ApiProperty()
  @IsNumberString()
  confirmationCode: string;

  @ApiProperty()
  @MinLength(8)
  password: string;
}
