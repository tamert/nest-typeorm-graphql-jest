import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { NewUserInput } from './dto/new-user.input';
import { SelectQueryBuilder } from 'typeorm/index';
import { PaginateInput } from '../common/dto/paginate.input';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    createUser = async (input: NewUserInput) => {
        return await this.save(input);
    };
    paginate = (options: PaginateInput): SelectQueryBuilder<User> => {
        const queryBuilder = this.createQueryBuilder('entity');
        queryBuilder.orderBy('entity.id', 'DESC');
        if (options.search) {
            queryBuilder
                .andWhere(
                    'entity.email LIKE :filter OR entity.firstName LIKE :filter OR entity.lastName LIKE :filter OR entity.id LIKE :filter',
                )
                .setParameters({ filter: '%' + options.search + '%' });
        }
        return queryBuilder;
    };
}
