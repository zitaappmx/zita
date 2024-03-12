import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LogInDto {
  @ApiProperty()
  @IsEmail()
  userEmail: string;

  @ApiProperty()
  @MinLength(8)
  password: string;
}
