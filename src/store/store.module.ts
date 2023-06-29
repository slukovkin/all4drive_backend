import { Module } from '@nestjs/common';
import {StoreController} from "./store.controller";
import {StoreService} from "./store.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Store} from "./store.model";
import {User} from "../users/users.model";
import {UserStore} from "./user-store.model";

@Module({
    controllers: [StoreController],
    providers: [StoreService],
    imports: [SequelizeModule.forFeature([Store, User, UserStore])],
    exports: [StoreService]
})
export class StoreModule {}
