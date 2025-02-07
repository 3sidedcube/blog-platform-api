import { Field, ObjectType } from "@nestjs/graphql"
@ObjectType()
export class TagPostCount{
    @Field()
    name : string
    @Field()
    postCount : number
    
    
}