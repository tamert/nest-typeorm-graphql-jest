import {NotFoundException, UseGuards} from '@nestjs/common';
import {Args, Mutation, Query, Resolver, Subscription, Directive, ObjectType} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express';
import {NewRecipeInput} from './dto/new-recipe.input';
import {Recipe} from './models/recipe.model';
import {RecipesService} from './recipes.service';
import {DeleteRecipeResponse} from "./dto/delete-response.dto";
import {PaginatedRecipes} from "./dto/paginate-response.dto";
import {PaginateInput} from "../common/dto/paginate.input";
import {JwtAuthGuard, Scopes} from "../auth/guards/jwt-auth.guard";

const pubSub = new PubSub();


@Resolver(of => Recipe)
export class RecipesResolver {
    constructor(private readonly recipesService: RecipesService) {
    }

    @Directive('@deprecated(reason: "This query will be removed in the next version")')
    @Query(() => Recipe)
    @UseGuards(JwtAuthGuard)
    @Directive('@deprecated(reason: "This query will be removed in the next version")')
    //@Scopes('required')
    async recipe(@Args('id') id: string): Promise<Recipe> {

        const recipe = await this.recipesService.findOneById(id);
        if (!recipe) {
            throw new NotFoundException(id);
        }
        await pubSub.publish('recipe', {recipe: recipe});
        return recipe;
    }

    @Query(() => PaginatedRecipes)
    @UseGuards(JwtAuthGuard)
    //@Scopes('required')
    async recipes(@Args() options: PaginateInput): Promise<PaginatedRecipes> {
        return await this.recipesService.paginate({
            limit: options.limit,
            page: options.page,
            route: "/"
        });
    }

    @Mutation(() => Recipe)
    @UseGuards(JwtAuthGuard)
    //@Scopes('required')
    async addRecipe(
        @Args('newRecipeData') newRecipeData: NewRecipeInput,
    ): Promise<Recipe> {
        const recipe = await this.recipesService.create(newRecipeData);
        await pubSub.publish('recipeAdded', {recipeAdded: recipe});
        return recipe;
    }

    @UseGuards(JwtAuthGuard)
    //@Scopes('required')
    @Mutation(() => DeleteRecipeResponse)
    async removeRecipe(@Args('id') id: string): Promise<DeleteRecipeResponse> {
        return await this.recipesService.remove(id);
    }

    @Query(() => String)
    async hello() {
        return 'hello';
    }

    @Subscription(() => Recipe)
    recipeAdded() {
        return pubSub.asyncIterator('recipeAdded');
    }
}
