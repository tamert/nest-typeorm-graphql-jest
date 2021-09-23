import { Field, ID, ObjectType, HideField } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsEmpty } from 'class-validator';
import { RefreshToken } from '../../auth/refresh-token/entitites/refresh-token.entity';
import {
    Column,
    Entity,
    JoinTable,
    Index,
    OneToMany,
    ManyToMany,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from '../../recipes/entities/recipe.entity';
import { Permission } from '../permission/entities/permission.entity';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({ length: 100 })
    @Field()
    public firstName: string;

    @Column({ length: 100 })
    @Field()
    public lastName: string;

    @Field(() => [String])
    @Column('simple-json', { default: () => null })
    roles: string[];

    @Field()
    @Column()
    @Index({ unique: true })
    @IsEmail()
    public email: string;

    @HideField()
    @Column('boolean', { default: () => 'false' })
    @IsBoolean()
    public isSuperUser: boolean;

    @HideField()
    @Column()
    @IsEmpty()
    public password: string;

    @HideField()
    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, { onDelete: 'CASCADE' })
    public refreshTokens: RefreshToken[];

    @HideField()
    @Column({ nullable: true })
    salt: string;

    @Field(() => [Recipe], { nullable: true })
    @OneToMany(() => Recipe, (recipe) => recipe.user, { cascade: true, eager: true })
    recipes!: Recipe[];

    @Field(() => [Permission], { nullable: true })
    @ManyToMany(() => Permission)
    @JoinTable()
    permissions: Permission[];

    public jwtPayload() {
        return {
            salt: this.salt,
        };
    }

    @Field()
    @CreateDateColumn()
    creationDate: Date;
}
