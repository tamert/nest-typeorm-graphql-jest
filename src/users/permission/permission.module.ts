import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { PermissionSubscriber } from './permission.subscriber';
import { ConfigService } from '@nestjs/config';
import { PermissionRepository } from './permission.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Permission, PermissionRepository])],
    providers: [PermissionService, ConfigService, PermissionSubscriber],
    exports: [PermissionService],
})
export class PermissionModule {}
