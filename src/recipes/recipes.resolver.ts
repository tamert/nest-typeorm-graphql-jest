import { NotFoundException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, Directive, ObjectType } from '@nestjs/graphql';

import { NewRecipeInput } from './dto/new-recipe.input';
import { Recipe } from './entities/recipe.entity';
import { RecipesService } from './recipes.service';
import { DeleteRecipeResponse } from './dto/delete-response.dto';
import { PaginatedRecipes } from './dto/paginate-response.dto';
import { PaginateInput } from '../common/dto/paginate.input';
import { JwtAuthGuard, Scopes } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/users.entity';
import { UseInterceptors } from '@nestjs/common';
import { SentryInterceptor } from '../common/helpers/sentry';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@UseInterceptors(SentryInterceptor)
@Resolver((of) => Recipe)
export class RecipesResolver {
    constructor(private readonly recipesService: RecipesService) {}

    @Directive('@upper')
    @Query(() => Recipe)
    @UseGuards(JwtAuthGuard)
    //@Scopes('required')
    async recipe(@Args('id') id: string): Promise<Recipe> {
        const recipe = await this.recipesService.findOneById(id);
        if (!recipe) {
            throw new NotFoundException(id);
        }
        await pubSub.publish('recipe', { recipe: recipe });
        return recipe;
    }

    @Query(() => PaginatedRecipes)
    @UseGuards(JwtAuthGuard)
    //@Scopes('required')
    async recipes(@Args() options: PaginateInput): Promise<PaginatedRecipes> {
        return await this.recipesService.paginate({
            limit: options.limit,
            page: options.page,
            route: '/',
        });
    }

    @Mutation(() => Recipe)
    @UseGuards(JwtAuthGuard)
    @Scopes('required')
    async addRecipe(@CurrentUser() user: User, @Args('newRecipeData') newRecipeData: NewRecipeInput): Promise<Recipe> {
        const recipe = await this.recipesService.create(newRecipeData, user);
        await pubSub.publish('recipeAdded', { recipeAdded: recipe });
        return recipe;
    }

    @UseGuards(JwtAuthGuard)
    //@Scopes('required')
    @Mutation(() => DeleteRecipeResponse)
    async removeRecipe(@Args('id') id: string): Promise<DeleteRecipeResponse> {
        return await this.recipesService.remove(id);
    }

    @Directive('@upper')
    @Query(() => String)
    async hello() {
        return 'hello';
    }

    @Query(() => String)
    async test() {
        throw new InternalServerErrorException();
        return 'test';
    }

    @Subscription(() => Recipe)
    recipeAdded() {
        return pubSub.asyncIterator('recipeAdded');
    }
}
