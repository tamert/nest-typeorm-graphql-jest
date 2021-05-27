import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {NewRecipeInput} from './dto/new-recipe.input';
import {RecipesArgs} from './dto/recipes.args';
import {Recipe} from './models/recipe.model';
import {RecipeRepository} from "./recipe.repository";
import {Connection} from "typeorm/index";
import {DeleteRecipeResponse} from "./dto/delete-response.dto";

@Injectable()
export class RecipesService {

    private recipeRepository: RecipeRepository;

    constructor(
        private readonly connection: Connection
    ) {
        this.recipeRepository = this.connection.getCustomRepository(RecipeRepository);
    }

    async create(data: NewRecipeInput): Promise<Recipe> {
        return await this.recipeRepository.createRecipe(data);
    }

    async findOneById(id: string): Promise<Recipe> {
        return await this.recipeRepository.findOne(id);
    }

    async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
        return await this.recipeRepository.find(recipesArgs);
    }

    async remove(id: string): Promise<DeleteRecipeResponse> {

        try {
            const relatedRecipe = await this.recipeRepository.findOneOrFail(id)
            await this.recipeRepository.delete(id)
            return new DeleteRecipeResponse(relatedRecipe, 'DELETED', 200)
        } catch (e) {
            switch (e.status) {
                case 401:
                    throw new UnauthorizedException(e.message)
                    break

                case 404:
                    throw new NotFoundException(e.message)

                default:
                    throw new BadRequestException(e.message)
                    break
            }
        }
    }
}
