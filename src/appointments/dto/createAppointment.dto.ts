import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { Merchant } from 'src/merchants/entities/merchant.entity';
import { Service } from 'src/services/entities/service.entity';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsDateString()
  dateTime: Date;

  @ApiProperty()
  services: Service[];

  @ApiProperty()
  merchant: Merchant;
}
