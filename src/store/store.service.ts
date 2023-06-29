import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Store} from "./store.model";
import {CreateStoreDto} from "./dto/create-store.dto";

@Injectable()
export class StoreService {
    constructor(@InjectModel(Store) private storeRepository: typeof Store) {}

    async createStore(dto: CreateStoreDto) {
        const store = await this.storeRepository.create(dto)
        return store
    }

    async getAllStores() {
        const stores = await this.storeRepository.findAll()
        return stores
    }

    async getStoreByValue(value: string) {
        const store = await this.storeRepository.findOne({where: {value}})
        return store
    }
}
