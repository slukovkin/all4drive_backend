import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {StoreService} from "./store.service";
import {CreateStoreDto} from "./dto/create-store.dto";

@Controller('store')
export class StoreController {
    constructor(private storeService: StoreService) {}

    @Post()
    createStore(@Body() dto: CreateStoreDto) {
        return this.storeService.createStore(dto)
    }

    @Get()
    getAllStores() {
        return this.storeService.getAllStores()
    }

    @Get('/:value')
    getStoreByValue(@Param('value') value: string) {
        return this.storeService.getStoreByValue(value)
    }
}
