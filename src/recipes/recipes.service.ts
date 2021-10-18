import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { Recipe } from './entities/recipe.entity';
import { RecipeRepository } from './recipe.repository';
import { Connection } from 'typeorm/index';
import { DeleteRecipeResponse } from './dto/delete-response.dto';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IPaginated, PageInfo } from '../common/dto/paginate-response.dto';
import { User } from '../users/entities/user.entity';
import { PaginateInput } from '../common/dto/paginate.input';
import { DeleteUserResponse } from '../users/dto/delete-response.dto';
@Injectable()
export class RecipesService {
    private readonly repository: RecipeRepository;

    constructor(private readonly connection: Connection) {
        this.repository = this.connection.getCustomRepository(RecipeRepository);
    }

    async create(data: NewRecipeInput, user: User): Promise<Recipe> {
        return await this.repository.createRecipe(data, user);
    }

    async findOneById(id: string): Promise<Recipe> {
        return await this.repository.findOne(id);
    }

    async paginate(options: PaginateInput): Promise<IPaginated<Recipe>> {
        const queryBuilder = this.repository.paginate(options);
        const { items, links, meta } = await paginate<Recipe>(queryBuilder, {
            limit: options.limit,
            page: options.page,
            route: '/',
        } as IPaginationOptions);
        return {
            currentPage: meta.currentPage,
            totalCount: meta.totalItems,
            totalPages: meta.totalPages,
            nodes: items,
            pageInfo: new PageInfo(links.next, links.previous),
        };
    }

    async remove(id: string): Promise<DeleteRecipeResponse> {
        const relatedRecipe = await this.repository.findOneOrFail(id);
        if (!(relatedRecipe instanceof Recipe)) {
            throw new NotFoundException('user not found!');
        }
        try {
            await this.repository.delete(id);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
        return new DeleteRecipeResponse(relatedRecipe);
    }
}
