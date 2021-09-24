import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class DeleteUserResponse {
    constructor(recipe: User, status: string, code: number) {
        this.data = recipe;
        this.status = status;
        this.code = code;
    }

    @Field()
    data: User;

    @Field()
    status: string;

    @Field()
    code: number;
}
