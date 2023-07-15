import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';

@Controller('store')
export class StoresController {
  constructor(private storeService: StoresService) {}

  @Post()
  createStore(@Body() dto: CreateStoreDto) {
    return this.storeService.createStore(dto);
  }

  @Get()
  getAllStores() {
    return this.storeService.getAllStores();
  }

  @Get('/:value')
  getStoreByValue(@Param('value') value: string) {
    return this.storeService.getStoreByValue(value);
  }
}
