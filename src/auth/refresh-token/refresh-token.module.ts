import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefreshTokenService } from './refresh-token.service';
import {RefreshToken} from "./models/refresh-token.model";
import {RefreshTokenSubscriber} from "./refresh-token.subscriber";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([RefreshToken])],
    providers: [RefreshTokenService, ConfigService, RefreshTokenSubscriber],
    exports: [RefreshTokenService],
})
export class RefreshTokenModule {}