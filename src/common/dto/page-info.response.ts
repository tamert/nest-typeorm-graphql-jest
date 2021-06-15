import {Field, ObjectType} from "@nestjs/graphql";



@ObjectType()
export class PageInfo {
    constructor(next ?: string, previous ?: string ) {
        this.hasNextPage = !(next.length === 0 || !next.trim());
        this.hasPrevPage = !(previous.length === 0 || !previous.trim());
    }

    @Field()
    hasNextPage: boolean

    @Field()
    hasPrevPage: boolean
}