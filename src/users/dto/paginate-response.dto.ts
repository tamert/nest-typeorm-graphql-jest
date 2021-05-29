import { Field, ObjectType } from '@nestjs/graphql'
import {User} from "../models/users.model";
import {PageInfo} from "../../common/dto/page-info.response";


@ObjectType()
export class PaginateUserResponse {
    constructor(currentPage: Number, totalCount: Number, totalPages: Number, pageInfo: PageInfo, items?: User[]) {
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

    @Field((type) => [User], {nullable: true})
    items: User[];
}
