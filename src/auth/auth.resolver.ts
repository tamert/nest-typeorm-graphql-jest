import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { LoginResponse } from './dto/login-response.dto';
import { unauthorized, refreshTokenExpiredSignature } from '../common/errors';

@Resolver((of) => User)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query((returns) => LoginResponse)
    async login(@Args('email') email: string, @Args('password') password: string): Promise<LoginResponse> {
        const user = await this.authService.validateUser(email, password);
        if (!(user instanceof User)) {
            unauthorized({ raise: true });
        }
        const refresh = await this.authService.createRefreshToken(user);
        return await this.authService.token(user, refresh);
    }

    @Query((returns) => LoginResponse)
    async refreshToken(@Args('token') token: string): Promise<LoginResponse> {
        const refreshToken = await this.authService.validateRefreshToken(token);
        if (!refreshToken) {
            refreshTokenExpiredSignature({ raise: true });
        }
        const update = await this.authService.updateRefreshToken(refreshToken);
        const user = await this.authService.getUser(update.user);
        return await this.authService.token(user, update);
    }
}
