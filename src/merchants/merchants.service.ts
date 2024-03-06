import { Injectable } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchant } from './entities/merchant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
  ) {}
  create(user, createMerchantDto: CreateMerchantDto) {
    console.log(user);
    return this.merchantRepository.save(createMerchantDto);
  }
  findAll() {
    return this.merchantRepository.find();
  }
  findOne(merchantId: string) {
    return this.merchantRepository.findOneBy({ id: merchantId });
  }
  update(merchantId: string, updateMerchantDto: UpdateMerchantDto) {
    return this.merchantRepository.update(merchantId, updateMerchantDto);
  }
  remove(merchantId: string) {
    return this.merchantRepository.delete(merchantId);
  }
}
