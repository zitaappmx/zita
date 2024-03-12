import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';

export enum AppGroups {
  superAdmin = 'Zita-SuperAdminGroup',
  admin = 'Zita-AdminGroup',
  manager = 'Zita-ManagerGroup',
  employee = 'Zita-EmployeeGroup',
  client = 'Zita-ClientGroup',
}

export class AddUsertoGroupDto {
  @ApiProperty()
  @IsEmail()
  userEmail: string;

  @ApiProperty()
  @IsEnum(AppGroups)
  groupName: string;
}
