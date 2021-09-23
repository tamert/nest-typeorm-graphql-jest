import { ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { Paginated } from '../../common/dto/paginate-response.dto';

@ObjectType()
export class PaginatedUser extends Paginated(User) {}
