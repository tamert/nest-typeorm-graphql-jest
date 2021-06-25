import {Directive, Field, Extensions, ID, ObjectType} from '@nestjs/graphql';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn} from 'typeorm';
import {fieldPermissionMiddleware} from "../../auth/middlewares/fieldPermission.middleware";


@Entity()
@ObjectType()
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
}
