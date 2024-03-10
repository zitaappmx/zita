import { ApiProperty } from '@nestjs/swagger';

export class CreateMerchantDto {
  @ApiProperty()
  name: string;
}
