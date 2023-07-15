# Dice Betting API

The Dice Betting API is a GraphQL-based backend for managing user bets on a dice game. It provides a set of queries and mutations to interact with user and bet data.

## Getting Started

To run the Dice Betting API, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/your-username/dice-betting-api.git
```
2. Install the dependencies:

```shell
cd dice-betting-api
npm install
```

2. Run tests:

```shell
npm run test
```

3. Start the application using Docker Compose:

```shell
docker-compose up
```

This will start the GraphQL server and a PostgreSQL database container.

4. Access the API via the following URL:

```
http://localhost:4000/graphql
```

## Functionality
The Dice Betting API provides the following functionality:

* Query user information and bets:

  * getUser(id: Int): User: Retrieve a user by their ID.
  * getUserList: [User!]: Retrieve a list of all users.
  * getBet(id: Int): Bet: Retrieve a bet by its ID.
  * getBetList: [Bet!]: Retrieve a list of all bets.
  * getBestBetPerUser(limit: Int): [Bet!]: Retrieve a distinct list of the best bet each user has made.

* Mutation to create a new bet:
  * createBet(userId: Int, betAmount: Float, chance: Float): Bet: Create a new bet with the provided user ID, bet amount, and chance.

## GraphQL Schema
The GraphQL schema for the Dice Betting API includes the following types:

User: Represents a user with properties like ID, name, and balance.
Bet: Represents a bet with properties like ID, user ID, bet amount, chance, payout, and win.
For detailed documentation on the available queries, mutations, and types, you can use the GraphQL Playground or any other GraphQL client to explore the API.