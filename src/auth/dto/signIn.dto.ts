import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  userEmail: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsMobilePhone('es-MX')
  phoneNumber: string;
}
