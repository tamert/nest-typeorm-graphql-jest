import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { Recipe } from './entities/recipe.entity';
import { RecipeRepository } from './recipe.repository';
import { Connection } from 'typeorm/index';
import { DeleteRecipeResponse } from './dto/delete-response.dto';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IPaginated, PageInfo } from '../common/dto/paginate-response.dto';
import { User } from '../users/entities/users.entity';
@Injectable()
export class RecipesService {
    private recipeRepository: RecipeRepository;

    constructor(private readonly connection: Connection) {
        this.recipeRepository = this.connection.getCustomRepository(RecipeRepository);
    }

    async create(data: NewRecipeInput, user: User): Promise<Recipe> {
        return await this.recipeRepository.createRecipe(data, user);
    }

    async findOneById(id: string): Promise<Recipe> {
        return await this.recipeRepository.findOne(id);
    }

    async findAll(recipesArgs: { skip: 0; take: 10 }): Promise<Recipe[]> {
        return await this.recipeRepository.find(recipesArgs);
    }

    async paginate(options: IPaginationOptions): Promise<IPaginated<Recipe>> {
        const { items, links, meta } = await paginate<Recipe>(this.recipeRepository, options, {
            relations: ['translations'],
            order: {
                id: 'DESC',
            },
        });
        return {
            currentPage: meta.currentPage,
            totalCount: meta.totalItems,
            totalPages: meta.totalPages,
            nodes: items,
            pageInfo: new PageInfo(links.next, links.previous),
        };
    }

    async remove(id: string): Promise<DeleteRecipeResponse> {
        try {
            const relatedRecipe = await this.recipeRepository.findOneOrFail(id);
            await this.recipeRepository.softDelete(id);
            return new DeleteRecipeResponse(relatedRecipe, 'DELETED', 200);
        } catch (e) {
            if (e.status === 401) {
                throw new UnauthorizedException(e.message);
            } else if (e.status === 404) {
                throw new NotFoundException(e.message);
            } else {
                throw new BadRequestException(e.message);
            }
        }
    }
}
