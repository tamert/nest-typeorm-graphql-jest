import {EntityRepository, Repository} from 'typeorm';
import {Recipe} from "./models/recipe.model";
import {NewRecipeInput} from "./dto/new-recipe.input";

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
    createRecipe = async (newRecipeInput: NewRecipeInput) => {
        return await this.save(newRecipeInput);
    };
}