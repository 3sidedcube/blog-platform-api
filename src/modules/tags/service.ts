import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/service";
import * as request from 'supertest';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}
  async deleteUnusedTags() {
    return this.prisma.tag.deleteMany({
      where: { posts: { none: {} } },
    });
  }
  async tags(){
    const tags = await  this.prisma.tag.findMany()
    return tags
  }
  async getTagWithPostCount(){
    const tagWithCounts = await this.prisma.tag.findMany({
      select : {
        name : true,
        _count:{
          select : {posts : true}
        }
      }
    })
    return tagWithCounts.map((tag)=>({
      name : tag.name,
      postCount : tag._count.posts
    }))
  }
}