import {Directive, Field, Extensions, ID, ObjectType} from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, } from 'typeorm';
import {checkRoleMiddleware} from "../../common/middlewares/checkRole.middleware";


@Entity()
@ObjectType()
export class Recipe {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Field({ middleware: [checkRoleMiddleware] })
  @Extensions({ role: ["admin"] })
  @Directive('@upper')
  @Column({length: 255 })
  title: string;

  @Field({ nullable: true })
  @Column({length: 255 })
  description?: string;


  @Field()
  @CreateDateColumn()
  creationDate: Date;

  @Field(type => [String])
  @Column("simple-json")
  ingredients: string[];
}
