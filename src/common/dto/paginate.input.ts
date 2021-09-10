import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class PaginateInput {
    @Field((type) => String)
    search = '';

    @Field((type) => Int)
    @Min(0)
    page = 0;

    @Field((type) => Int)
    @Min(1)
    @Max(100)
    limit = 25;
}
