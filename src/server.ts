import { ApolloServer } from 'apollo-server';
import { Sequelize } from 'sequelize-typescript';
import User from './models/User';
import Bet from './models/Bet';
import schema from './schema';
import { seed } from './seed';

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

  await sequelize.sync({logging: console.log}); // TODO remove logging

  await seed();
  

  const apolloServer = new ApolloServer({
    schema,
    context: { sequelize },
  });

  const { url } = await apolloServer.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

startServer();