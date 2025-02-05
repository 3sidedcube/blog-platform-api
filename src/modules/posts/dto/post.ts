import { ObjectType, Field, Int } from "@nestjs/graphql";

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
  @Field(()=> [String], {nullable:true})
  tags? : string[]
}