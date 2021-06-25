import {NotFoundException, UseGuards} from '@nestjs/common';
import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express';
import {NewUserInput} from './dto/new-user.input';
import {User} from './models/users.model';
import {UsersService} from './users.service';
import {DeleteUserResponse} from "./dto/delete-response.dto";
import {PaginateUserResponse} from "./dto/paginate-response.dto";
import {PageInfo} from "../common/dto/page-info.response";
import {PaginateInput} from "../common/dto/paginate.input";
import {JwtAuthGuard, Scopes} from "../auth/guards/jwt-auth.guard";
import {CurrentUser} from "../auth/decorators/current-user.decorator";

const pubSub = new PubSub();


@Resolver(of => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {
    }

    @Query(returns => User)
    async user(@Args('id') id: string): Promise<User> {
        const user = await this.usersService.findOneById(id);
        if (!user) {
            throw new NotFoundException(id);
        }
        await pubSub.publish('user', {user: user});
        return user;
    }

    @Query(returns => User)
    @UseGuards(JwtAuthGuard)
    @Scopes('required')
    async currentUser(@CurrentUser() user: User): Promise<User> {
        await pubSub.publish('user', {user: user});
        return user;
    }

    @Query(returns => PaginateUserResponse)
    async users(@Args() options: PaginateInput): Promise<PaginateUserResponse> {
        const {items, links, meta} = await this.usersService.paginate({
            limit: options.limit,
            page: options.page,
            route: "/"
        });
        return new PaginateUserResponse(
            meta.currentPage,
            meta.totalItems,
            meta.totalPages
            , new PageInfo(
                links.next,
                links.previous
            ), items
        );

    }

    @Mutation(returns => User)
    async addUser(
        @Args('newUserData') newUserData: NewUserInput,
    ): Promise<User> {
        const user = await this.usersService.create(newUserData);
        await pubSub.publish('userAdded', {userAdded: user});
        return user;
    }

    @Mutation(returns => DeleteUserResponse)
    async removeUser(@Args('id') id: string): Promise<DeleteUserResponse> {
        return await this.usersService.remove(id);
    }

    @Subscription(returns => User)
    userAdded() {
        return pubSub.asyncIterator('userAdded');
    }
}
