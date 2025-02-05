import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/service";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(title: string, content: string, authorId: string) {
    return this.prisma.post.create({
      data: {
        title,
        content,
        authorId
    }})
  }

  async updatePost(id: string, data: { title?: string; content?: string}) {
    return this.prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  async deletePost(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }
  async getAllPosts(page:number, limit:number){
    const skip = (page-1) * limit
    const posts = await  this.prisma.post.findMany({
        orderBy : {createdAt: 'desc'},
        skip,
        take:limit
    })
    const total = await this.prisma.post.count();
    return {posts, total}
  }
  async getPostById(id:string){
    return  this.prisma.post.findUnique({
        where: {id},
        include : {tags: true}
    })
  }
  async searchPosts(query?: string, tag?: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const whereClause: any = {};

    if (query) {
      whereClause.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ];
    }

    if (tag) {
      whereClause.tags = { some: { name: tag } };
    }

    const posts = await this.prisma.post.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: { tags: true },
    });

    const total = await this.prisma.post.count({ where: whereClause });
    return { posts, total };
  }
  async getPostCountByTag(tagName: string) {
    return this.prisma.post.count({
      where: { tags: { some: { name: tagName } } },
    });
  }
}