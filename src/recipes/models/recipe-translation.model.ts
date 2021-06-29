import {Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne} from 'typeorm';
import {Recipe} from "./recipe.model";
import {Field, ID, ObjectType} from '@nestjs/graphql';

@Entity()
@ObjectType()
export class RecipeTranslation {
    @Field(type => ID)
    @PrimaryGeneratedColumn() id: number;

    @Field({nullable: false})
    @Column() locale: string;

    @Field({nullable: true})
    @Column() name: string;

    @Field({nullable: true})
    @Column() description: string;

    @Field(type => Recipe)
    @ManyToOne(type => Recipe, recipe => recipe.translations, { onDelete: 'CASCADE' })
    public base: Recipe;
}
