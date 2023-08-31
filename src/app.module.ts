import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { StoresModule } from './stores/stores.module';
import { Store } from './stores/stores.model';
import { UserStore } from './stores/user-stores.model';
import { ProductController } from './product/products.controller';
import { ProductModule } from './product/products.module';
import { Product } from './product/products.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      models: [User, Role, UserRoles, Store, UserStore, Product],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    StoresModule,
    ProductModule,
  ],
  controllers: [ProductController],
})
export class AppModule {}
