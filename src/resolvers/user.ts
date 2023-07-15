import { Resolver, Query, Arg, Int } from 'type-graphql';
import User from '../models/user';

@Resolver()
class UserResolver {
  @Query(() => User, {nullable: true})
  async getUser(@Arg('id', () => Int) id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  @Query(() => [User])
  async getUserList(): Promise<User[]> {
    return User.findAll();
  }
}

export default UserResolver;