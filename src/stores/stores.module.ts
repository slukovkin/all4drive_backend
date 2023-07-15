import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Store } from './stores.model';
import { User } from '../users/users.model';
import { UserStore } from './user-stores.model';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
  imports: [SequelizeModule.forFeature([Store, User, UserStore])],
  exports: [StoresService],
})
export class StoresModule {}
