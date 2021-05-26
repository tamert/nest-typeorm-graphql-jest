import {Paginated} from "../../common/managers/pagination.manager";
import { ObjectType } from '@nestjs/graphql';
import {Recipe} from "../models/recipe.model";

@ObjectType()
export class PaginatedRecipe extends Paginated(Recipe) {
}
