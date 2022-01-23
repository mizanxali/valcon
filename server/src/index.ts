import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { resolvers } from './resolvers';
import { User } from './schema/user.schema';
import Context from './types/context';
import { connectDB } from './utils/db';
import { verifyJwt } from './utils/jwt';
import authChecker from './utils/authChecker';

const PORT = process.env.port || 4000;

const main = async () => {
  const schema = await buildSchema({
    resolvers,
    authChecker,
  });

  const app = express();

  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      if (ctx.req.headers.accesstoken) {
        const user = verifyJwt<User>(ctx.req.headers.accesstoken as string);
        ctx.user = user;
      }
      return ctx;
    },
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  connectDB();
};

main();
