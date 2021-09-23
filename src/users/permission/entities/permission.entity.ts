import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { IsString, MinLength } from 'class-validator';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../entities/user.entity';

@Entity()
@ObjectType()
export class Permission {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Field()
    @Column({
        nullable: false,
    })
    @IsString()
    @MinLength(2)
    public name: string;

    @Field(() => [User], { nullable: true })
    @ManyToMany(() => User, (user) => user.permissions, { eager: false, cascade: true })
    users: User[];

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
