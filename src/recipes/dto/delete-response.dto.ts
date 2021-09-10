import { Field, ObjectType } from '@nestjs/graphql';
import { Recipe } from '../entities/recipe.entity';

@ObjectType()
export class DeleteRecipeResponse {
    constructor(recipe: Recipe, status: string, code: number) {
        this.data = recipe;
        this.status = status;
        this.code = code;
    }

    @Field()
    data: Recipe;

    @Field()
    status: string;

    @Field()
    code: number;
}
