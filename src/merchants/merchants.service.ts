import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateMerchantDto } from './dto/createMerchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchant } from './entities/merchant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MerchantsService {
  private readonly logger = new Logger(MerchantsService.name);

  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
  ) {}

  async create(user, createMerchantDto: CreateMerchantDto) {
    console.log(user);
    try {
      return await this.merchantRepository.save(createMerchantDto);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
  async findAll() {
    try {
      return await this.merchantRepository.find();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
  async findOne(merchantId: string) {
    try {
      return await this.merchantRepository.findOneBy({ id: merchantId });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findMerchantAppointments(id: string) {
    try {
      return await this.merchantRepository.find({
        where: { id },
        relations: { appointments: true },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findMerchantEmployees(id: string) {
    try {
      return await this.merchantRepository.find({
        where: { id },
        select: {
          employees: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
        relations: { employees: true },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findMerchantServices(id: string) {
    try {
      return await this.merchantRepository.find({
        where: { id },
        select: {
          services: {
            id: true,
            name: true,
            description: true,
            price: true,
            duration: true,
          },
        },
        relations: { services: true },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(merchantId: string, updateMerchantDto: UpdateMerchantDto) {
    try {
      return await this.merchantRepository.update(
        merchantId,
        updateMerchantDto,
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
  remove(merchantId: string) {
    try {
      return this.merchantRepository.delete(merchantId);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
