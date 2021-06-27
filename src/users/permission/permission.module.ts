import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {PermissionService} from './permission.service';
import {Permission} from "./models/permission.model";
import {PermissionSubscriber} from "./permission.subscriber";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    providers: [PermissionService, ConfigService, PermissionSubscriber],
    exports: [PermissionService],
})
export class PermissionModule {
}
