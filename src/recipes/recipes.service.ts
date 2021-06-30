import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {NewRecipeInput} from './dto/new-recipe.input';
import {Recipe} from './models/recipe.model';
import {RecipeRepository} from "./recipe.repository";
import {Connection} from "typeorm/index";
import {DeleteRecipeResponse} from "./dto/delete-response.dto";
import {
    paginate,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import {IPaginated, PageInfo} from "../common/dto/paginate-response.dto";
@Injectable()
export class RecipesService {

    private recipeRepository: RecipeRepository;

    constructor(
        private readonly connection: Connection
    ) {
        this.recipeRepository = this.connection.getCustomRepository(RecipeRepository);
    }

    async create(data: NewRecipeInput): Promise<Recipe> {
        console.log(data);
        return await this.recipeRepository.createRecipe(data);
    }

    async findOneById(id: string): Promise<Recipe> {
        return await this.recipeRepository.findOne(id);
    }

    async findAll(recipesArgs: { skip: 0, take: 10 }): Promise<Recipe[]> {
        return await this.recipeRepository.find(recipesArgs);
    }

    async paginate(options: IPaginationOptions): Promise<IPaginated<Recipe>> {
        const queryBuilder = this.recipeRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.id', 'DESC'); // Or whatever you need to do
        const {items, links, meta} = await paginate<Recipe>(queryBuilder, options);
        return {
            currentPage:  meta.currentPage,
            totalCount:  meta.totalItems,
            totalPages: meta.totalPages,
            nodes: items,
            pageInfo: new PageInfo(
                links.next,
                links.previous
            )
        };
    }

    async remove(id: string): Promise<DeleteRecipeResponse> {

        try {
            const relatedRecipe = await this.recipeRepository.findOneOrFail(id)
            await this.recipeRepository.softDelete(id)
            return new DeleteRecipeResponse(relatedRecipe, 'DELETED', 200)
        } catch (e) {
            if (e.status === 401) {
                throw new UnauthorizedException(e.message)
            } else if (e.status === 404) {
                throw new NotFoundException(e.message)
            } else {
                throw new BadRequestException(e.message)
            }
        }
    }
}
