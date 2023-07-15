import { buildSchemaSync } from 'type-graphql';
import BetResolver from './resolvers/bet';
import UserResolver from './resolvers/user';

const schema = buildSchemaSync({
  resolvers: [UserResolver, BetResolver],
});

export default schema;