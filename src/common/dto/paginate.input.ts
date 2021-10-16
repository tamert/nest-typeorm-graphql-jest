import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class PaginateInput {
    @Field(() => String)
    search = '';

    @Field(() => Int)
    @Min(0)
    page = 0;

    @Field(() => Int)
    @Min(1)
    @Max(100)
    limit = 25;
}
