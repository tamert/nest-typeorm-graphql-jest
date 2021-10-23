import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewRecipeTranslation {
    @Field()
    @MaxLength(30)
    locale: string;

    @Field()
    @MaxLength(255)
    name: string;

    @Field(() => [String])
    ingredients: string[];

    @Field()
    @IsOptional()
    description: string;
}

@InputType()
export class NewRecipeInput {
    @Field(() => [NewRecipeTranslation])
    translations: NewRecipeTranslation[];
}
