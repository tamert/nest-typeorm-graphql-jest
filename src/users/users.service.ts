import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { DeleteUserResponse } from './dto/delete-response.dto';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IPaginated, PageInfo } from '../common/dto/paginate-response.dto';
import { Connection } from 'typeorm/index';
import { PaginateInput } from '../common/dto/paginate.input';

@Injectable()
export class UsersService {
    private repository: UserRepository;

    constructor(private readonly connection: Connection) {
        this.repository = this.connection.getCustomRepository(UserRepository);
    }

    async create(data: NewUserInput): Promise<User> {
        return await this.repository.createUser(data);
    }

    async findOneById(id: string): Promise<User> {
        return await this.repository.findOne(id);
    }

    async findOne(data: any): Promise<User> {
        return await this.repository.findOne(data);
    }

    async paginate(options: PaginateInput): Promise<IPaginated<User>> {
        const queryBuilder = this.repository.paginate(options);
        const { items, links, meta } = await paginate<User>(queryBuilder, {
            limit: options.limit,
            page: options.page,
            route: '/',
        } as IPaginationOptions);
        return {
            currentPage: meta.currentPage,
            totalCount: meta.totalItems,
            totalPages: meta.totalPages,
            nodes: items,
            pageInfo: new PageInfo(links.next, links.previous),
        };
    }

    async remove(id: string): Promise<DeleteUserResponse> {
        const relatedUser = await this.repository.findOneOrFail(id);
        if (!(relatedUser instanceof User)) {
            throw new NotFoundException('user not found!');
        }
        try {
            await this.repository.delete(id);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
        return new DeleteUserResponse(relatedUser);
    }
}
