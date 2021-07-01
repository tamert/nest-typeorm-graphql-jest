import {Directive, Field, Extensions, ID, ObjectType} from '@nestjs/graphql';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, OneToMany} from 'typeorm';
import {fieldPermissionMiddleware} from "../../users/permission/middlewares/fieldPermission.middleware";
import {RecipeTranslation} from "./recipe-translation.model";
import {CurrentLocaleMiddleware} from "../../translatable/middlewares/current-locale.middleware";

@Entity()
@ObjectType("Recipe")
export class Recipe {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Field()
    @Directive('@upper')
    @Column({length: 255})
    title: string;

    @Field({nullable: true})
    @Column({length: 255})
    description?: string;

    @Field({middleware: [fieldPermissionMiddleware]})
    @Extensions({role: ["ROLE_USER", "ROLE_ADMIN"]})
    @CreateDateColumn()
    creationDate: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Field(type => [String])
    @Column("simple-json")
    ingredients: string[];

    @Field(type => [RecipeTranslation], {nullable: true})
    @OneToMany(type => RecipeTranslation, translation => translation.base, {cascade: true, eager: true})
    translations!: RecipeTranslation[];

    @Field(type => RecipeTranslation, {middleware: [CurrentLocaleMiddleware], nullable: true})
    translate?: RecipeTranslation;

}
