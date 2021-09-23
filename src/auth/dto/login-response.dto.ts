import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class LoginResponse {
    constructor(user: User, accessToken: string, expiresIn: Date, refreshToken: string, refreshTokenExpiresAt: Date) {
        this.user = user;
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiresAt = refreshTokenExpiresAt;
    }

    @Field()
    user: User;

    @Field()
    accessToken: string;

    @Field()
    expiresIn: Date;

    @Field()
    refreshToken: string;

    @Field()
    refreshTokenExpiresAt: Date;
}
