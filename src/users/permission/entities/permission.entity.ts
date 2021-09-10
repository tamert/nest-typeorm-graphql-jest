import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { IsBoolean, IsString, MinLength } from 'class-validator';
import { Field } from '@nestjs/graphql';
import { permissionTypes } from '../enums/permissionTypes';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Field()
    @Column({
        nullable: false,
    })
    @IsString()
    @MinLength(2)
    public name: string;

    @Field()
    @Column({
        nullable: false,
    })
    @IsString()
    @MinLength(2)
    public relationObject: string;

    @Field()
    @Column({
        type: 'enum',
        enum: permissionTypes,
        default: permissionTypes.ROLE,
    })
    public role: permissionTypes;

    @Field()
    @Column('boolean', { default: () => 'false' })
    @IsBoolean()
    public isGranted: boolean;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
