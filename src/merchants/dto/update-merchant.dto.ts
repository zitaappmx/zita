import { PartialType } from '@nestjs/swagger';
import { CreateMerchantDto } from './createMerchant.dto';

export class UpdateMerchantDto extends PartialType(CreateMerchantDto) {}
