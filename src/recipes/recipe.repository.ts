import {EntityRepository, Repository} from 'typeorm';
import {Recipe} from "./entities/recipe.entity";
import {NewRecipeInput} from "./dto/new-recipe.input";

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
    createRecipe = async (newRecipeInput: NewRecipeInput) => {
        return await this.save(JSON.parse(JSON.stringify(newRecipeInput)));
    };
}
