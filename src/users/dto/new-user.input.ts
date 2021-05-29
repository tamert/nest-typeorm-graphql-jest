import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(255)
  email: string;

  @Field()
  @MaxLength(255)
  firstName: string;

  @Field()
  @MaxLength(255)
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(5, 30)
  password?: string;

}
