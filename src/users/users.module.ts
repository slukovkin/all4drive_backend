/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { UserStore } from '../stores/user-stores.model';
import { Store } from '../stores/stores.model';
import { StoresModule } from '../stores/stores.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, Store, UserRoles, UserStore]),
    RolesModule,
    StoresModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
