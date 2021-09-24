import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsArray } from 'class-validator';

@InputType()
export class NewRoleInput {
    @Field()
    @MaxLength(255)
    code: string;

    @Field()
    @MaxLength(255)
    description: string;

    @Field()
    @IsArray()
    permissions: string[];
}
