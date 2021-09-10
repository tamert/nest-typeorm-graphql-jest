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

    @Field()
    @IsOptional()
    description: string;
}

@InputType()
export class NewRecipeInput {
    @Field()
    @MaxLength(30)
    title: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(30, 255)
    description?: string;

    @Field((type) => [String])
    ingredients: string[];

    @Field((type) => [NewRecipeTranslation])
    translations: NewRecipeTranslation[];
}
