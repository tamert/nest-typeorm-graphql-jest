import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min, Length, IsOptional } from 'class-validator';

@ArgsType()
export class PaginateInput {
    @Field(() => String, {
        nullable: true,
        description: 'Search by entity fields',
    })
    @Length(2)
    @IsOptional()
    search?: string = null;

    @Field(() => Int)
    @Min(1)
    @IsOptional()
    page = 1;

    @Field(() => Int)
    @Min(1)
    @Max(100)
    limit = 25;
}
