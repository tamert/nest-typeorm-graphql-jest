import {ObjectType} from "@nestjs/graphql";
import {Recipe} from "../models/recipe.model";
import {Paginated} from "../../common/dto/paginate-response.dto";

@ObjectType()
export class PaginatedRecipes extends Paginated(Recipe) {}
