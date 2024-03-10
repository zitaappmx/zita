import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { AppGroups } from '../../auth/dto/addUsertoGroup.dto';
import { Merchant } from 'src/merchants/entities/merchant.entity';

export class CreateEmployeeDto {
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
  merchant: Merchant;

  @ApiProperty()
  @IsEnum(AppGroups)
  group: AppGroups;
}
