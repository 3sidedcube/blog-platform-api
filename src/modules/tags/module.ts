import { Module } from "@nestjs/common";
import { TagService } from "./service";
import { AuthModule } from "../auth/module";
import { PrismaModule } from "prisma/module";
import { TagResolver } from "./resolver";

@Module({
    imports: [
  AuthModule,
    PrismaModule,
  ],
  providers: [
     TagResolver,
     TagService
  ],
  exports: [TagService],
})
export class TagModule{}