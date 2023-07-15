import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Min } from 'sequelize-typescript';
import { Field, Int, ObjectType } from 'type-graphql';
import User from './user';

@ObjectType()
@Table({
  initialAutoIncrement: '10000'
})
class Bet extends Model {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Field()
  @Column(DataType.FLOAT)
  betAmount: number;

  @Field()
  @Column({
    type: DataType.FLOAT,
    validate: {
      min: 0,
      max: 100
    }
  })
  chance: number;

  @Field()
  @Column(DataType.FLOAT)
  payout: number;

  @Field()
  @Column(DataType.BOOLEAN)
  win: boolean;

  @BelongsTo(() => User)
  user: User;
}

export default Bet;
