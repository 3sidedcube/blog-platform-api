import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/service";

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}
  async deleteUnusedTags() {
    return this.prisma.tag.deleteMany({
      where: { posts: { none: {} } },
    });
  }
}