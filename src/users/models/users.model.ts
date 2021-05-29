import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, Index, OneToMany, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsEmail, IsEmpty, IsString, MinLength } from 'class-validator';


@Entity()
@ObjectType()
export class User {

  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Column({
    nullable: true,
  })
  @Index({ unique: true })
  @IsString()
  @MinLength(32)
  public authorizationCode: string;

  @Column({length: 100})
  public firstName: string;

  @Column({length: 100})
  public lastName: string;

  @Field()
  @Column()
  @Index({ unique: true })
  @IsEmail()
  public email: string;

  @Field()
  @Column('boolean', { default: () => 'false' })
  @IsBoolean()
  public IsSuperUser: boolean;

  @Column()
  @IsEmpty()
  public password: string;

  //@OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, { onDelete: 'CASCADE' })
  //public refreshTokens: RefreshToken[];

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
