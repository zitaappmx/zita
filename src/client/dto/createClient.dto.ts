import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { AppGroups } from '../../auth/dto/addUsertoGroup.dto';

export class CreateClientDto {
  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsUUID()
  proxyUserId: string;

  @ApiProperty()
  @IsEnum(AppGroups)
  group: AppGroups;
}
