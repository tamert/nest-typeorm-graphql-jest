import {EntityRepository, Repository} from 'typeorm';
import {Recipe} from "./entities/recipe.entity";
import {NewRecipeInput} from "./dto/new-recipe.input";
import {User} from "../users/entities/users.entity";

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
    createRecipe = async (newRecipeInput: NewRecipeInput, user: User) => {
        const data = JSON.parse(JSON.stringify(newRecipeInput));
        data.user = user;
        return await this.save(data);
    };
}
