import { Resolver, Query, Arg, Mutation, Int, Float, Ctx } from 'type-graphql';
import User from '../models/user';
import Bet from '../models/bet';
import { Sequelize } from 'sequelize';
import { BetController } from '../controllers/bet';
import { ApolloContext } from '../server';
import { acquireLock, releaseLock } from '../redis';


@Resolver()
class BetResolver {
  @Query(() => Bet, {nullable: true})
  async getBet(@Arg('id', () => Int) id: number): Promise<Bet | null> {
    return Bet.findByPk(id);
  }

  @Query(() => [Bet])
  async getBetList(): Promise<Bet[]> {
    return Bet.findAll();
  }

  @Query(() => [Bet])
  async getBestBetPerUser(@Arg('limit') limit: number): Promise<Bet[]> {
    const bestBets = await Bet.findAll({
      where: Sequelize.literal(`"id" = (
        SELECT "id" FROM "Bets" b1
        WHERE b1."userId" = "Bet"."userId"
        ORDER BY b1."betAmount" DESC
        LIMIT 1
      )`),
      limit: limit,
    });
    return bestBets;
  }

  @Mutation(() => Bet)
  async createBet(
    @Arg('userId') userId: number,
    @Arg('betAmount') betAmount: number,
    @Arg('chance') chance: number,
    @Ctx() context: ApolloContext
  ): Promise<Bet> {
    const { sequelize, redis } = context;

    try {
      await acquireLock(redis, userId);
    } catch (error) {
      console.error(error);
      throw new Error('An operation is already in progress for this user');
    }

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const betResults = BetController.processBet({ betAmount, chance });

      const bet = new Bet({
        userId,
        betAmount,
        chance,
        payout: betResults.payout,
        win: betResults.win,
      });

      user.balance -= betAmount;

      if (user.balance < 0) {
        throw new Error('User balance cannot drop below 0');
      }

      if (bet.win) {
        user.balance += bet.payout;
      }

      await sequelize.transaction(async (transaction) => {
        await bet.save({ transaction });
        await user.save({ transaction });  
      });

      return bet;
    } finally {
      await releaseLock(redis, userId);
    }
  } 
}

export default BetResolver;