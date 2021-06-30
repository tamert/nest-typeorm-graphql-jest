import {EntityRepository, Repository} from 'typeorm';
import {Recipe} from "./models/recipe.model";
import {NewRecipeInput} from "./dto/new-recipe.input";

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {

    createRecipe = async (newRecipeInput: NewRecipeInput) => {
        /**
         * todo bakılacak
         *
         * [Object: null prototype] {
  description: 'limonata nasıl yapılır gelin beraber inceleyelim.',
  ingredients: [ 'limon', 'şeker', 'su' ],
  title: 'Limonata',
  translations: [
    [Object: null prototype] {
      description: 'teasdsadadasdadasdast',
      locale: 'en',
      name: 'asdasdasda'
    },
    [Object: null prototype] {
      description: 'sadada',
      locale: 'tr',
      name: 'testa'
    }
  ]
}
         geçici çözüm -> JSON.parse(JSON.stringify())
         */
        return await this.save(JSON.parse(JSON.stringify(newRecipeInput)));
    };
}
