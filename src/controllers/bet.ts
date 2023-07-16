import Decimal from 'decimal.js';

export class BetController {
  static processBet({ betAmount, chance }: {betAmount: number, chance: number}) {
    if (chance < 0 || chance > 100) {
      throw new Error('The chance should be in the [1, 100] interval');
    }
    
    const decimalBetAmount = new Decimal(betAmount);
    const decimalChance = new Decimal(chance);

    const payout = chance === 0 ? 0 : Number(decimalBetAmount.dividedBy(decimalChance.dividedBy(100)).toFixed(2));
    const rand = Math.random() * 100;

    const win = rand <= chance;

    return {
      payout,
      win
    };
  }
}