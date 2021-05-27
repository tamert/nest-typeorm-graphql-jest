import { Field, ObjectType } from '@nestjs/graphql'
import {Recipe} from "../models/recipe.model";


@ObjectType()
export class Meta {
    constructor(totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number ) {
        this.totalItems = totalItems;
        this.itemsPerPage = itemsPerPage;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    @Field()
    totalItems: number

    @Field()
    itemsPerPage: number

    @Field()
    totalPages: number

    @Field()
    currentPage: number
}

@ObjectType()
export class Links {
    constructor(first: string, last: string, next: string, previous: string ) {
        this.first = first;
        this.last = last;
        this.next = next;
        this.previous = previous;
    }

    @Field()
    first: string

    @Field()
    last: string

    @Field()
    next: string

    @Field()
    previous: string
}

@ObjectType()
export class PaginateRecipeResponse {
    constructor(meta: Meta, links: Links, items?: Recipe[]) {
        this.items = items;
        this.meta = meta;
        this.links = links;
    }

    @Field((type) => [Recipe], {nullable: true})
    items: Recipe[];

    @Field()
    meta: Meta

    @Field()
    links: Links
}
