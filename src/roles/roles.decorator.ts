/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export const ROLEY_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLEY_KEY, roles);
