import { Module } from "@nestjs/common";
import { PostsResolver } from "./resolver";
import { PostService } from "./service";
import { AuthModule } from "../auth/module"
import { PrismaModule } from "prisma/module";

@Module({
  imports: [
    AuthModule,
    PrismaModule,
  ],
  providers: [
    PostsResolver,
    PostService
  ],
  exports: [PostService],
})
export class PostModule {}