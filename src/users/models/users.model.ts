import {Field, ID, ObjectType, HideField} from '@nestjs/graphql';
import {IsBoolean, IsEmail, IsEmpty, IsString, MinLength} from 'class-validator';
import {RefreshToken} from "../../auth/refresh-token/models/refresh-token.model";
import {
    Column,
    Entity,
    Index,
    OneToMany,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

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

    @Field(type => [String])
    @Column("simple-json")
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

    public jwtPayload() {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            isSuperUser: this.isSuperUser,
            roles: this.roles,
            creationDate: this.creationDate,
        };
    }

    @Field()
    @CreateDateColumn()
    creationDate: Date;

}
