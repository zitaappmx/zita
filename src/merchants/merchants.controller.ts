import {
  Controller,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
  // UseGuards,
  // Request,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
// import { CreateMerchantDto } from './dto/create-merchant.dto';
// import { UpdateMerchantDto } from './dto/update-merchant.dto';
// import { AuthGuard } from '@nestjs/passport';

@Controller('merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // create(@Body() createMerchantDto: CreateMerchantDto, @Request() req) {
  //   return this.merchantsService.create(req.user, createMerchantDto);
  // }

  // @Get()
  // findAll() {
  //   return this.merchantsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.merchantsService.findOne(id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMerchantDto: UpdateMerchantDto,
  // ) {
  //   return this.merchantsService.update(id, updateMerchantDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.merchantsService.remove(id);
  // }
}
