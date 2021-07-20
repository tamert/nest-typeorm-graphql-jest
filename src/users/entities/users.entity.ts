import {Field, ID, ObjectType, HideField} from '@nestjs/graphql';
import {IsBoolean, IsEmail, IsEmpty, IsString, MinLength} from 'class-validator';
import {RefreshToken} from "../../auth/refresh-token/entitites/refresh-token.entity";
import {
    Column,
    Entity,
    Index,
    OneToMany,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {RecipeTranslation} from "../../recipes/entities/recipe-translation.entity";
import {Recipe} from "../../recipes/entities/recipe.entity";

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column({length: 100})
    @Field()
    public firstName: string;

    @Column({length: 100})
    @Field()
    public lastName: string;

    @Field(type => [String])
    @Column("simple-json",  { default: () => null })
    roles: string[];

    @Field()
    @Column()
    @Index({unique: true})
    @IsEmail()
    public email: string;

    @HideField()
    @Column('boolean', {default: () => 'false'})
    @IsBoolean()
    public isSuperUser: boolean;

    @HideField()
    @Column()
    @IsEmpty()
    public password: string;

    @HideField()
    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {onDelete: 'CASCADE'})
    public refreshTokens: RefreshToken[];

    @HideField()
    @Column({ nullable: true })
    salt: string;

    @Field(type => [Recipe], {nullable: true})
    @OneToMany(type => Recipe, recipe => recipe.user, {cascade: true, eager: true})
    recipes!: Recipe[];

    public jwtPayload() {
        return {
            salt: this.salt
        };
    }

    @Field()
    @CreateDateColumn()
    creationDate: Date;

}
