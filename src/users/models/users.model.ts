import {Field, ID, ObjectType, HideField} from '@nestjs/graphql';
import {IsBoolean, IsEmail, IsEmpty, IsString, MinLength} from 'class-validator';
import { v4 as uuid } from 'uuid';
import {RefreshToken} from "../../auth/refresh-token/models/refresh-token.model";
import {
    Column,
    Entity,
    Index,
    OneToMany,
    CreateDateColumn,
    BeforeInsert,
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

    @Column({ nullable: true })
    salt: string;
    @BeforeInsert()  async generateSalt() {
        this.salt = await uuid();
    }


    public jwtPayload() {
        return {
            salt: this.salt
        };
    }

    @Field()
    @CreateDateColumn()
    creationDate: Date;

}
