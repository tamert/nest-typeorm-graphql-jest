import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import {User} from "./models/users.model";
import {passwordToHash} from "../common/helpers/password.helper";



@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

     async beforeInsert(event: InsertEvent<User>) {
        let {password} = event.entity
        if (password) {
            event.entity.password = await passwordToHash(password);
        }
        console.log(`BEFORE USER INSERTED: `, event.entity);
    }
}
