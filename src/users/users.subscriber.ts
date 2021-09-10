import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { User } from './entities/users.entity';
import { passwordToHash } from '../common/helpers/password.helper';
import { v4 as uuid } from 'uuid';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>) {
        const { password } = event.entity;
        if (password) {
            event.entity.password = await passwordToHash(password);
        }
        event.entity.salt = await uuid();
        event.entity.roles = ['ROLE_USER'];
        console.log(`BEFORE USER INSERTED: `, event.entity);
    }
}
