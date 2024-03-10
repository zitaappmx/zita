import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/createMerchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { CognitoUser } from '@nestjs-cognito/auth';

@Controller('merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  // @Authorization({
  //   allowedGroups: [AppGroups.admin],
  // })
  @Post()
  create(@Body() createMerchantDto: CreateMerchantDto, @CognitoUser() user) {
    return this.merchantsService.create(user, createMerchantDto);
  }

  // @Authorization({
  //   allowedGroups: [AppGroups.superAdmin],
  // })
  @Get()
  findAll() {
    return this.merchantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantsService.findOne(id);
  }

  @Get(':id/appointments')
  findMerchantAppointments(@Param('id') id: string) {
    return this.merchantsService.findMerchantAppointments(id);
  }

  @Get(':id/employees')
  findMerchantEmployees(@Param('id') id: string) {
    return this.merchantsService.findMerchantEmployees(id);
  }

  @Get(':id/services')
  findMerchantServices(@Param('id') id: string) {
    return this.merchantsService.findMerchantServices(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantsService.update(id, updateMerchantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantsService.remove(id);
  }
}
