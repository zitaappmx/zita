import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateClientDto } from './dto/createClient.dto';
import { UpdateClientDto } from './dto/updateClient.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      return await this.clientRepository.save(createClientDto);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.clientRepository.find();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.clientRepository.findOneBy({ id });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findClientAppointments(id: string) {
    try {
      return await this.clientRepository.find({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          appointments: {
            id: true,
            dateTime: true,
            employee: {
              id: true,
              firstName: true,
            },
          },
        },
        where: { id },
        relations: { appointments: { employee: true, merchant: true } },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findClientAppoitmentsbyMerchant(clientId: string, merchantId: string) {
    try {
      return await this.clientRepository.find({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          appointments: {
            id: true,
            dateTime: true,
            employee: {
              id: true,
              firstName: true,
            },
          },
        },
        where: { id: clientId, appointments: { merchant: { id: merchantId } } },
        relations: { appointments: { employee: true, merchant: true } },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      return await this.clientRepository.update(id, updateClientDto);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.clientRepository.delete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
