import {UnauthorizedException} from '@nestjs/common';
import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express';
import {AuthService} from "./auth.service";
import {User} from "../users/models/users.model";
import {LoginResponse} from "./dto/login-response.dto";

const pubSub = new PubSub();


@Resolver(of => User)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {
    }

    @Query(returns => LoginResponse)
    async login(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<LoginResponse> {

        const user = await this.authService.validateUser(email, password);
        if (!(user instanceof User)) {
            throw new UnauthorizedException();
        }
        const tokens = await this.authService.token(user);
        return new LoginResponse(user,tokens.accessToken,"");

    }

}
