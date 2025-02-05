import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreatePost {
  @Field()
  title: string;
  @Field()
  content: string;
}