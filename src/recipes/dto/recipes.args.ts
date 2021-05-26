import { ArgsType } from '@nestjs/graphql';
import {PaginatedArgs} from "../../common/managers/pagination.manager";

@ArgsType()
export class RecipesArgs extends  PaginatedArgs {
}
