import { Field, ObjectType } from '@nestjs/graphql'
import {Recipe} from "../models/recipe.model";


@ObjectType()
export class PageInfo {
    constructor(next ?: string, previous ?: string ) {
        this.hasNextPage = (!next || next.length === 0 );
        this.hasPrevPage = (!previous || previous.length === 0 );
    }

    @Field()
    hasNextPage: boolean

    @Field()
    hasPrevPage: boolean
}

@ObjectType()
export class PaginateRecipeResponse {
    constructor(currentPage: Number, totalCount: Number, totalPages: Number, pageInfo: PageInfo, items?: Recipe[]) {
        this.totalCount = totalCount;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.pageInfo = pageInfo;
        this.items = items;
    }

    @Field()
    currentPage: Number

    @Field()
    totalCount: Number

    @Field()
    totalPages: Number

    @Field()
    pageInfo: PageInfo

    @Field((type) => [Recipe], {nullable: true})
    items: Recipe[];
}
