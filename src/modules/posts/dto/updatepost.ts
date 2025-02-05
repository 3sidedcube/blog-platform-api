import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdatePost {
  @Field()
  title: string;
  @Field()
  content: string;
  @Field()
  id:string  
}