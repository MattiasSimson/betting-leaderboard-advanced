# Home Assignment - Betting Leaderboard

This is a full-stack development assignment where you need to modify both the frontend application in the `/client` folder and the backend application in the `/server` folder. To learn more about the frontend and backend applications and how they work, check out the README.md files in their respective folders.

## Goal

Your goal is to create a leaderboard of customers with the best betting performance. You need to create a new endpoint in the backend project that returns the top betting customers with the fields required for the leaderboard table in the frontend. In the frontend project, you need to develop a UI for the betting leaderboard, which will display the data fetched from the backend. The table in the frontend does not need to be very beautiful and fine-tuned - it is just important that it works and meets the requirements :)

## What is a Bet?
A bet is a stake (a sum of money) placed on a specific event occurring. When a customer places a bet, they are predicting that a particular event will happen and hoping to win money based on the odds. The amount won is calculated as the stake multiplied by the odds.

For example, if a customer places a €10 bet on an event with odds of 2.4, they will receive €24 (€10 stake + €14 profit) if their prediction is correct. However, if they are incorrect, they lose the €10 stake.

## The Leaderboard and Its Functionalities

You need to create a leaderboard table in the frontend with the following fields:

1) Full name of the customer
2) Customer's country
3) Total bets
4) Win percentage
5) Profit

The leaderboard should be ordered by profit and display only the top 10 customers. It should also be possible to filter the leaderboard by country. The default country filter value should be `ALL`, but if a specific country (e.g., "Estonia") is selected, it should display only the top customers from that country based on profit. Customers with negative profit should not be visible on the leaderboard.

## How to Calculate the Total Bets for a Customer?
Count all bets placed by the customer that have a status of `WON` or `LOST`. Bets with the status `PENDING` should not be considered.

## How to Calculate the Win Percentage for a Customer?
Count all bets with a status of `WON` or `LOST`, then determine how many of these bets have a `WON` status. Bets with the status `PENDING` should not be considered.

## How to Calculate the Profit for a Customer?

To determine a customer's total profit, both won and lost bets must be considered.
- Bets with the status `PENDING` should not be included in the profit calculation.
- For bets with a `WON` status, calculate the net win using the formula `(stake * odds) - stake` and then sum up the net wins for the won bets
- For bets with a `LOST` status, sum up the stakes of all lost bets.
- Finally, to calculate the profit, you need to deduct the sum of lost bet stakes from the sum of net wins of all the won bets.


### Example Profit Calculation
A customer has made five bets:

| Bet ID  | Stake (€) | Odds | Status |
|---------|-----------|------|---------|
| 1       | 2         | 4    | WON     |
| 2       | 5         | 2.2  | LOST    |
| 3       | 10        | 2.6  | WON     |
| 4       | 5         | 1.3  | PENDING |
| 5       | 15        | 2.1  | LOST    |

#### Step 1: Calculate Total Net Win for `WON` Bets
The customer has two `WON` bets (Bet 1 and Bet 3):
((2 * 4) - 2) + ((10 * 2.6) - 10) = (8 - 2) + (26 - 10) = 6 + 16 = 22

#### Step 2: Calculate Total Stakes of `LOST` Bets
The customer has two `LOST` bets (Bet 2 and Bet 5):
5 + 15 = 20

#### Step 3: Calculate Profit
22 - 20 = 2

Thus, the customer's profit is €2.

## Development Tips
1) Modify only the files inside the `/src` folder unless you want to install additional packages by modifying `package.json`.
2) Perform most of the data processing (ordering, filtering, etc.) on the backend. Keeping the frontend as simple as possible is considered best practice.
3) If the `App.tsx` file becomes too large, consider splitting different parts of the application into smaller components.
4) Maintain a consistent coding style across all files.
5) Read this README.md file multiple times to make sure you do not miss any of the requirements in your leaderboard.