import { ObjectType } from '@nestjs/graphql';
import { Recipe } from '../entities/recipe.entity';
import { Paginated } from '../../common/dto/paginate-response.dto';

@ObjectType()
export class PaginatedRecipes extends Paginated(Recipe) {}
