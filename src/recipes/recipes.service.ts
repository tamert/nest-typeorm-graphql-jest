import {Injectable} from '@nestjs/common';
import {NewRecipeInput} from './dto/new-recipe.input';
import {RecipesArgs} from './dto/recipes.args';
import {Recipe} from './models/recipe.model';
import {RecipeRepository} from "./recipe.repository";
import {Connection} from "typeorm/index";

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

    async remove(id: string): Promise<boolean> {
        await this.recipeRepository.delete(id);
        return true;
    }
}
