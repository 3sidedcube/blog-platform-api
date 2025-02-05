import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class AssignTag{
@Field()
postId : string
@Field(()=>[String])
tags: string[]
}