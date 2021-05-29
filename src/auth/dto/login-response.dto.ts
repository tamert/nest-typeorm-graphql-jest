import { Field, ObjectType } from '@nestjs/graphql'
import {User} from "../../users/models/users.model";


@ObjectType()
export class LoginResponse {
    constructor(user: User, accessToken: string, refreshToken: string) {
        this.user = user
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }

    @Field()
    user: User

    @Field()
    accessToken: string

    @Field()
    refreshToken: string
}