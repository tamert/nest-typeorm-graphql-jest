import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { RefreshToken } from './entitites/refresh-token.entity';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@EventSubscriber()
export class RefreshTokenSubscriber implements EntitySubscriberInterface<RefreshToken> {
    constructor(connection: Connection, protected configService: ConfigService) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return RefreshToken;
    }

    expiresAt(): Date {
        return new Date(new Date().getTime() + parseInt(this.configService.get('REFRESH_TOKEN_EXPIRES_IN')) * 1000);
    }

    async beforeInsert(event: InsertEvent<RefreshToken>) {
        event.entity.refreshToken = await uuid();
        event.entity.refreshTokenExpiresAt = this.expiresAt();
    }
}
