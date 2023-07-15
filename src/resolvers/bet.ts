import { Resolver, Query, Arg, Mutation, Int, Float } from 'type-graphql';
import User from '../models/user';
import Bet from '../models/bet';
import { Sequelize } from 'sequelize';
import { BetController } from '../controllers/bet';

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
    @Arg('chance') chance: number
  ): Promise<Bet> {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const betResults = BetController.processBet({betAmount, chance});

    const bet = new Bet({userId, betAmount, chance, payout: betResults.payout, win: betResults.win});

    user.balance -= betAmount;

    if (bet.win) {
      user.balance += bet.payout;
    }

    await bet.save();
    await user.save();

    return bet;
  }
}

export default BetResolver;