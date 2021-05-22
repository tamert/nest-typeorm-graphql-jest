import {Module} from '@nestjs/common';
import {DateScalar} from '../common/scalars/date.scalar';
import {RecipesResolver} from './recipes.resolver';
import {RecipesService} from './recipes.service';
import {RecipeRepository} from "./recipe.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Recipe} from "./models/recipe.model";

@Module({
    imports: [TypeOrmModule.forFeature([Recipe])],
    providers: [RecipesResolver, RecipesService, RecipeRepository, DateScalar],
})
export class RecipesModule {}
