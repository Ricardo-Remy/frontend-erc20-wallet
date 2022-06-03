# ERC20 Wallet

This is a small project that allows you to send ETH as ERC20 token.
The project displays the last successfull transaction containing the confirmed blockNumber and the blockHash.
It also displays the last error if any.
Both successfull or error transactions are persisted.

## Acceptance Criteria

- [x] The app should keep the user informed of things like, what is the expected time for the transaction to be mined, if it errored, etc.
- [x] If the user closes the browser and comes back, the app should display the correct state.
- [x] Transaction state should be consistent across tabs. In other words, if the UI is displaying a notification for a transaction pending, on one tab, it should show the same on other open tabs.
- [x] The app should start in read-only mode and only give a popup to connect a wallet if the user clicks a button.

## Tech stack

- Nextjs framework
- Tailwind css
- Ethers

## Run the project

```bash

# clone the project
git clone https://github.com/Ricardo-Remy/frontend-erc20-wallet.git

# install dependencies
npm i

# run the app
npm run dev
```

## Licence - MIT
