import { ApolloServer } from 'apollo-server';
import { Sequelize } from 'sequelize-typescript';
import { Redis } from "ioredis";

import User from './models/user';
import Bet from './models/bet';
import schema from './schema';
import { seed } from './seed';

export interface ApolloContext {
  sequelize: Sequelize;
  redis: Redis
}

async function startServer() {
  const sequelize = new Sequelize({
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "3000", 10),
    dialect: 'postgres',
  });

  sequelize.addModels([User, Bet]);

  await sequelize.sync();

  await seed();

  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  });
  
  redis.on('error', err => console.log('Redis Client Error', err));
  
  const context: ApolloContext = { sequelize, redis };

  const apolloServer = new ApolloServer({
    schema,
    context,
  });

  const { url } = await apolloServer.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

startServer();