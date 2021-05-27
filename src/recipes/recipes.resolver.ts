import {NotFoundException} from '@nestjs/common';
import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express';
import {NewRecipeInput} from './dto/new-recipe.input';
import {Recipe} from './models/recipe.model';
import {RecipesService} from './recipes.service';
import {DeleteRecipeResponse} from "./dto/delete-response.dto";
import {PageInfo, PaginateRecipeResponse} from "./dto/paginate-response.dto";
import {PaginateInput} from "../common/dto/paginate.input";

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

    @Query(returns => PaginateRecipeResponse)
    async recipes(@Args() options: PaginateInput): Promise<PaginateRecipeResponse> {
        const {items, links, meta} = await this.recipesService.paginate({
            limit: options.limit,
            page: options.page,
            route: "/"
        });
        return new PaginateRecipeResponse(
            meta.currentPage,
            meta.totalItems,
            meta.totalPages
            , new PageInfo(
                links.next,
                links.previous
            ), items
        );

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
