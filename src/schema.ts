import { buildSchemaSync } from 'type-graphql';
import BetResolver from './resolvers/BetResolver';

const schema = buildSchemaSync({
  resolvers: [BetResolver],
});

export default schema;