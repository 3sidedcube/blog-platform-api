import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Authorization } from '../auth/guard/auth.guard';
import { PostService } from './service';
import { CreatePost } from './dto/createpost';
import { Response } from 'src/common/dto/response';
import { UpdatePost } from './dto/updatepost';
import { PaginatedPosts, Post } from './dto/post';
import { AssignTag } from './dto/assigntag';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostService) {}

  @Mutation(() => Response)
  @UseGuards(Authorization)
  async createPost(
    @Args('request') input: CreatePost,
    @Context() context
    
  ) {
    const authorId = context.req.user.sub
    await this.postsService.createPost(input.title, input.content, authorId);
    return {message:'Post created successfully'};
  }

  @Mutation(() => Response)
  @UseGuards(Authorization)
  async updatePost(
    @Args('request') input: UpdatePost
  ) {
    await this.postsService.updatePost(input.id,input);
    return {message:'Post updated successfully'};
  }

  @Mutation(() => Response)
  @UseGuards(Authorization)
  async deletePost(@Args('id') id: string) {
    await this.postsService.deletePost(id);
    return {message:'Post deleted successfully'};
  }

  @Query(() => Number)
  async getPostCountByTag(@Args('tagName') tagName: string) {
    return this.postsService.getPostCountByTag(tagName);
  }
  @Query(()=> PaginatedPosts)
  async getAllPosts(
  @Args('page',{type:()=> Number, nullable:true}) page=1,
  @Args('limit', {type:()=>Number, nullable:true}) limit=10
  ){
    return this.postsService.getAllPosts(page,limit)
  }
  @Query(()=>Post,{nullable: true})
  async getPostById(@Args('id') id:string){
    return this.postsService.getPostById(id)
  }
  @Query(() => PaginatedPosts)
  async searchPosts(
    @Args('query', { type: () => String, nullable: true }) query?: string,
    @Args('tag', { type: () => String, nullable: true }) tag?: string,
    @Args('page', { type: () => Number, nullable: true }) page = 1,
    @Args('limit', { type: () => Number, nullable: true }) limit = 10
  ) {
    return this.postsService.searchPosts(query, tag, page, limit);
  }
  @Mutation(()=>Response)
  @UseGuards(Authorization)
  async assignTagToPost(
    @Args('request') input: AssignTag
  )
  {
    await this.postsService.assignTagsToPost(input.postId, input.tags)
    return { message: "Tags assigned successfully"}
  }
}
