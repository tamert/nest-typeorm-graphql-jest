import { Field, ObjectType } from '@nestjs/graphql'
import {Recipe} from "../models/recipe.model";
import {PageInfo} from "../../common/dto/page-info.response";

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
