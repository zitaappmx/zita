import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';

export enum AppGroups {
  admin = 'Zita-AdminGroup',
  manager = 'Zita-ManagerGroup',
  cashier = 'Zita-EmployeeGroup',
}

export class AddUsertoGroupDto {
  @ApiProperty()
  @IsEmail()
  userEmail: string;

  @ApiProperty()
  @IsEnum(AppGroups)
  groupName: string;
}
