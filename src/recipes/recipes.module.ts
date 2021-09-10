import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { RecipeRepository } from './recipe.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { UsersService } from '../users/users.service';
import { RecipeTranslation } from './entities/recipe-translation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe, RecipeTranslation])],
    providers: [RecipesResolver, UsersService, RecipesService, RecipeRepository, DateScalar],
})
export class RecipesModule {}
