import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Tag } from "src/modules/tags/dto/tag";

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class Post {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  createdAt: Date;
  @Field(()=> [Tag], {nullable:true})
  tags? : Tag[]
}