import {EntityRepository, Repository} from 'typeorm';
import {User} from "./entities/users.entity";
import {NewUserInput} from "./dto/new-user.input";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    createUser = async (input: NewUserInput) => {
        return await this.save(input);
    };
}
