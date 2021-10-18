import { EntityRepository, Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { NewRecipeInput } from './dto/new-recipe.input';
import { User } from '../users/entities/user.entity';
import { PaginateInput } from '../common/dto/paginate.input';
import { SelectQueryBuilder } from 'typeorm/index';

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
    createRecipe = async (newRecipeInput: NewRecipeInput, user: User) => {
        const data = JSON.parse(JSON.stringify(newRecipeInput));
        data.user = user;
        return await this.save(data);
    };
    paginate = (options: PaginateInput): SelectQueryBuilder<Recipe> => {
        const queryBuilder = this.createQueryBuilder('entity');
        queryBuilder.orderBy('entity.id', 'DESC').leftJoinAndSelect('entity.translations', 'translations');
        if (options.search) {
            queryBuilder
                .andWhere(
                    'translations.name LIKE :filter OR translations.description LIKE :filter OR entity.id LIKE :filter',
                )
                .setParameters({ filter: '%' + options.search + '%' });
        }
        return queryBuilder;
    };
}
