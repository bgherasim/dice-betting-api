export class BetController {
  static processBet({ betAmount, chance }: {betAmount: number, chance: number}) {
    if (chance < 0 || chance > 100) {
      throw new Error('The chance should be in the [1, 100] interval');
    }
    
    const payout = betAmount * (100 / chance);
    const rand =  Math.random() * 100;

    const win = rand <= chance;

    return {
      payout,
      win
    };
  }
}