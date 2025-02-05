import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/module';
import { AuthModule } from './modules/auth/module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/posts/module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PostModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      context: ({ req }) => ({ req }),
      path: 'docs',
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
