import {Field, ID, ObjectType, HideField} from '@nestjs/graphql';
import {Column, Entity, Index, OneToMany, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import {IsBoolean, IsEmail, IsEmpty, IsString, MinLength} from 'class-validator';
import {RefreshToken} from "../../auth/refresh-token/models/refresh-token.model";


@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column({
        nullable: true,
    })
    @Index({unique: true})
    @IsString()
    @HideField()
    @MinLength(32)
    public authorizationCode: string;

    @Column({length: 100})
    @Field()
    public firstName: string;

    @Column({length: 100})
    @Field()
    public lastName: string;

    @Field()
    @Column()
    @Index({unique: true})
    @IsEmail()
    public email: string;

    @HideField()
    @Column('boolean', {default: () => 'false'})
    @IsBoolean()
    public IsSuperUser: boolean;

    @HideField()
    @Column()
    @IsEmpty()
    public password: string;

    @HideField()
    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {onDelete: 'CASCADE'})
    public refreshTokens: RefreshToken[];

    public jwtPayload() {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            IsSuperUser: this.IsSuperUser,
            creationDate: this.creationDate,
        };
    }

    @Field()
    @CreateDateColumn()
    creationDate: Date;

}
