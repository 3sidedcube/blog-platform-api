import {  UseGuards } from "@nestjs/common";
import { Mutation, Args, Resolver, Query } from "@nestjs/graphql";
import { Authorization } from "../auth/guard/auth.guard";
import { TagService } from "./service";
import { Response } from "src/common/dto/response";
import { Tag } from "./dto/tag";
import { TagPostCount } from "./dto/tagpostcount";

@Resolver()
export class TagResolver {
  constructor(private tagService: TagService) {}
@Mutation(() => Response)
  @UseGuards(Authorization)
  async deleteUnusedTags() {
    await this.tagService.deleteUnusedTags()
    return {message:'Tag deleted successfully'};
  }
  @Query(()=> [TagPostCount])
  @UseGuards(Authorization)
  async getTagsWithPostCount() {
    return this.tagService.getTagWithPostCount()
  }
  @Query(()=> [Tag],{nullable: true})
    async tags(){
      return this.tagService.tags()
    }
}