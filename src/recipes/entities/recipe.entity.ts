import { Directive, Field, Extensions, ID, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { fieldPermissionMiddleware } from '../../users/permission/middlewares/fieldPermission.middleware';
import { RecipeTranslation } from './recipe-translation.entity';
import { CurrentLocaleMiddleware } from '../../translatable/middlewares/current-locale.middleware';
import { User } from '../../users/entities/user.entity';

@Entity()
@ObjectType('recipe')
export class Recipe {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Field()
    @Directive('@upper')
    @Column({ length: 255 })
    title: string;

    @Field({ nullable: true })
    @Column({ length: 255 })
    description?: string;

    @Field({ middleware: [fieldPermissionMiddleware] })
    @Extensions({ role: ['ROLE_USER', 'ROLE_ADMIN'] })
    @CreateDateColumn()
    creationDate: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Field(() => [String])
    @Column('simple-json')
    ingredients: string[];

    @Field(() => User)
    @ManyToOne(() => User, (recipe) => recipe.recipes, { onDelete: 'CASCADE' })
    public user: User;

    @Field(() => [RecipeTranslation], { nullable: true })
    @OneToMany(() => RecipeTranslation, (translation) => translation.base, { cascade: true, eager: true })
    translations!: RecipeTranslation[];

    @Field(() => RecipeTranslation, { middleware: [CurrentLocaleMiddleware], nullable: true })
    translate?: RecipeTranslation;
}
