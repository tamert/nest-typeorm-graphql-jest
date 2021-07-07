import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import {Permission} from "./entities/permission.entity";
import {ConfigService} from "@nestjs/config";


@EventSubscriber()
export class PermissionSubscriber implements EntitySubscriberInterface<Permission> {
    constructor(connection: Connection, protected configService: ConfigService) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Permission;
    }


    async beforeInsert(event: InsertEvent<Permission>) {

    }

    async beforeUpdate(event: InsertEvent<Permission>) {
    }

}
