import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  name: string;
}
@ObjectType()
export class RegisterResponse {
  @Field()
  id: string;
  @Field()
  email: string;
}
