import { expect } from 'chai';
import { BetController } from './bet';

describe('BetController', () => {
  describe('processBet', () => {
    it('should process a bet and return the correct payout and win status', () => {
      const betAmount = 10;
      const chance = 50;

      const result = BetController.processBet({ betAmount, chance });

      expect(result).to.have.property('payout');
      expect(result).to.have.property('win');
      expect(result.payout).to.equal(20);
      expect(result.win).to.be.oneOf([true, false]);
    });

    it('should return win when chance is 100', () => {
      const betAmount = 10;
      const chance = 100;

      const result = BetController.processBet({ betAmount, chance });

      expect(result.win).to.be.true;
    });

    it('should return loss when chance is 0', () => {
      const betAmount = 10;
      const chance = 0;

      const result = BetController.processBet({ betAmount, chance });

      expect(result.win).to.be.false;
    });

    it('should return payout of 0 when amount is 0', () => {
      const betAmount = 0;
      const chance = 50;

      const result = BetController.processBet({ betAmount, chance });

      expect(result.payout).to.equal(0);
    });

    it('the calculated payout should be rounded to 2 decimal places', () => {
      const betAmount = 99;
      const chance = 24.5;

      const result = BetController.processBet({ betAmount, chance });

      expect(result).to.have.property('payout');
      expect(result).to.have.property('win');
      expect(result.payout).to.equal(404.08);
      expect(result.win).to.be.oneOf([true, false]);
    });

    it('should throw an error if the chance is outside the [1, 100] interval', () => {
      const betAmount = 10;
      const invalidChance = -10;

      expect(() => BetController.processBet({ betAmount, chance: invalidChance })).to.throw(
        'The chance should be in the [1, 100] interval'
      );
    });
  });
});
