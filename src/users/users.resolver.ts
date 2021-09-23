import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewUserInput } from './dto/new-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { DeleteUserResponse } from './dto/delete-response.dto';
import { PaginatedUser } from './dto/paginate-response.dto';
import { PaginateInput } from '../common/dto/paginate.input';
import { JwtAuthGuard, Public } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

const pubSub = new PubSub();

@UseGuards(JwtAuthGuard)
@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => User)
    async user(@Args('id') id: string): Promise<User> {
        const user = await this.usersService.findOneById(id);
        if (!user) {
            throw new NotFoundException(id);
        }
        await pubSub.publish('user', { user: user });
        return user;
    }

    @Query(() => User)
    async currentUser(@CurrentUser() user: User): Promise<User> {
        await pubSub.publish('user', { user: user });
        return user;
    }

    @Query(() => PaginatedUser)
    @Public()
    async users(@Args() options: PaginateInput): Promise<PaginatedUser> {
        return await this.usersService.paginate({
            limit: options.limit,
            page: options.page,
            route: '/',
        });
    }

    @Mutation(() => User)
    async addUser(@Args('newUserData') newUserData: NewUserInput): Promise<User> {
        const user = await this.usersService.create(newUserData);
        await pubSub.publish('userAdded', { userAdded: user });
        return user;
    }

    @Mutation(() => DeleteUserResponse)
    async removeUser(@Args('id') id: string): Promise<DeleteUserResponse> {
        return await this.usersService.remove(id);
    }

    @Subscription(() => User)
    userAdded() {
        return pubSub.asyncIterator('userAdded');
    }
}
