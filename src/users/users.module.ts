import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {UserStore} from "../store/user-store.model";
import {Store} from "../store/store.model";
import {StoreModule} from "../store/store.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Role, Store, UserRoles, UserStore]),
    RolesModule,
    StoreModule,
  ]
})
export class UsersModule {}
