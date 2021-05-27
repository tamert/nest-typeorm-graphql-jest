import {NotFoundException} from '@nestjs/common';
import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express';
import {NewRecipeInput} from './dto/new-recipe.input';
import {RecipesArgs} from './dto/recipes.args';
import {PaginatedRecipe} from './dto/recipes.object';
import {Recipe} from './models/recipe.model';
import {RecipesService} from './recipes.service';
import {DeleteRecipeResponse} from "./dto/delete-response.dto";

const pubSub = new PubSub();


@Resolver(of => Recipe)
export class RecipesResolver {
    constructor(private readonly recipesService: RecipesService) {
    }

    @Query(returns => Recipe)
    async recipe(@Args('id') id: string): Promise<Recipe> {
        const recipe = await this.recipesService.findOneById(id);
        if (!recipe) {
            throw new NotFoundException(id);
        }
        await pubSub.publish('recipe', {recipe: recipe});
        return recipe;
    }

    @Query(returns => [Recipe])
    async recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
        return await this.recipesService.findAll(recipesArgs);
    }

    @Mutation(returns => Recipe)
    async addRecipe(
        @Args('newRecipeData') newRecipeData: NewRecipeInput,
    ): Promise<Recipe> {
        const recipe = await this.recipesService.create(newRecipeData);
        await pubSub.publish('recipeAdded', {recipeAdded: recipe});
        return recipe;
    }

    @Mutation(returns => DeleteRecipeResponse)
    async removeRecipe(@Args('id') id: string): Promise<DeleteRecipeResponse> {
        return await this.recipesService.remove(id);
    }

    @Query(() => String)
    async hello() {
        return 'hello';
    }

    @Subscription(returns => Recipe)
    recipeAdded() {
        return pubSub.asyncIterator('recipeAdded');
    }
}
