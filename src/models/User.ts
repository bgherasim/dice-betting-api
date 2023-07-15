import { Table, Column, Model, HasMany, DataType, PrimaryKey } from 'sequelize-typescript';
import { Field, Int, ObjectType } from 'type-graphql';
import Bet from './bet';

@ObjectType()
@Table
class User extends Model {
  @Field(() => Int)
  @PrimaryKey
  @Column
  id: number;

  @Field({ description: 'The name of the user.' })
  @Column
  name: string;

  @Field({ description: 'The balance of the user.' })
  @Column(DataType.FLOAT)
  balance: number;

  @HasMany(() => Bet)
  bets: Bet[];
}

export default User;
