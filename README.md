# React JS dApp Template (Currently broken due to Alchemy API changes)

For single-page dApp projects

## Prerequisites

-   Knowledge in Typescript/Javascript and Solidity
-   [Alchemy Account](https://www.alchemy.com/)
-   [Etherscan Account](https://etherscan.io/)
-   Rinkeby Testnet wallet and some RinkebyETH

## Install dependencies

```bash
npm install
```

## Configure and deploy Solidity smart contract

Open and configure `./contracts/Sample.sol`

Open and configure `./scripts/deploy.js`

Open and configure `./.env.sample` and enter the values for `PRIV_KEY` with your Rinkeby wallet private key, `REACT_APP_RPC_URL` and `RPC_URL` with the RPC URL provided by Alchemy, and `ETHERSCAN_API_KEY` with your API key from Etherscan.

Rename `.env.sample` to `.env`

Run the following command with HardHat CLI:

```bash
npx hardhat run --network rinkeby scripts/deploy.js
```

## Configure dApp for new Solidity smart contract

Open and configure `./.env` and enter the value for `REACT_APP_CONTRACT_ADDRESS` with the address provided by the HardHat deployment

Replace the values in `./public/config/config.json` with the values from your deployed Solidity smart contract

Copy the `.sol` directory from `./artifacts/contracts` to `./src/artifacts/contracts`

## Run the app

```bash
npm run start
```
