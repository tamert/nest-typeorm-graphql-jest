import {Field, ObjectType, Int, ArgsType, ID} from '@nestjs/graphql';
import {Type} from '@nestjs/common';
import {Max, Min} from "class-validator";

export function Paginated<T>(classRef: Type<T>): any {
    @ObjectType(`${classRef.name}Edge`)
    abstract class EdgeType {
        @Field((type) => String)
        cursor: string;

        @Field((type) => classRef)
        node: T;
    }

    @ObjectType({isAbstract: true})
    abstract class PaginatedType {
        @Field((type) => [EdgeType], {nullable: true})
        edges: EdgeType[];

        @Field((type) => [classRef], {nullable: true})
        nodes: T[];

        @Field((type) => Int)
        totalCount: number;

        @Field()
        hasNextPage: boolean;
    }

    return PaginatedType;
}


@ArgsType()
export class PaginatedArgs {
    @Field(type => Int)
    @Min(0)
    skip = 0;

    @Field(type => Int)
    @Min(1)
    @Max(50)
    take = 25;

    @Field(type => String)
    search = "";

}