import { UseGuards } from "@nestjs/common";
import { Mutation, Args, Resolver } from "@nestjs/graphql";
import { Authorization } from "../auth/guard/auth.guard";
import { TagService } from "./service";
import { Response } from "src/common/dto/response";

@Resolver()
export class TagResolver {
  constructor(private tagService: TagService) {}
@Mutation(() => Response)
  @UseGuards(Authorization)
  async deleteUnusedTags() {
    await this.tagService.deleteUnusedTags()
    return {message:'Tag deleted successfully'};
  }
}