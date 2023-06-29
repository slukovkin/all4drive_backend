import { Module } from '@nestjs/common';
import {StoreController} from "./store.controller";
import {StoreService} from "./store.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Store} from "./store.model";

@Module({
    controllers: [StoreController],
    providers: [StoreService],
    imports: [SequelizeModule.forFeature([Store])]
})
export class StoreModule {}
