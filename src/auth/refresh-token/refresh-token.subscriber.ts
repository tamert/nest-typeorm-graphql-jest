import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import {RefreshToken} from "./models/refresh-token.model";
import {ConfigService} from "@nestjs/config";


@EventSubscriber()
export class RefreshTokenSubscriber implements EntitySubscriberInterface<RefreshToken> {
    constructor(connection: Connection, protected configService: ConfigService) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return RefreshToken;
    }

    generateToken(length: number = 64) {
        let text = '';
        const possible = '0123456789QAZWSXEDCRFVTGBYHNUJMIKOLPqazwsxedcrfvtgbyhnujmikolp';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };

    expiresAt(): Date {
        return new Date(new Date().getTime() + (parseInt(this.configService.get('REFRESH_TOKEN_EXPIRES_IN')) * 1000 ));
    }

    async beforeInsert(event: InsertEvent<RefreshToken>) {
        event.entity.refreshToken = this.generateToken();
        event.entity.refreshTokenExpiresAt = this.expiresAt();
    }

    async beforeUpdate(event: InsertEvent<RefreshToken>) {
        event.entity.refreshToken = this.generateToken();
        event.entity.refreshTokenExpiresAt = this.expiresAt();
    }


}
