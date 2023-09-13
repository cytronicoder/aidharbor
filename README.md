# AidHabor

Aptos-powered platform for **transparent disaster relief coordination** and eco-conscious **cross-border payments**

Presentation: <https://docs.google.com/presentation/d/1Vc3-S4YCdLaVLDTF40F0MPqKfPaL6wtrJm78Hm16PrY/edit?usp=sharing>

Teammates:

- Bryan Ho: <https://github.com/therealbryanho>
- Zeyu Yao: <https://github.com/cytronicoder>
- Gustav Kalander: <https://github.com/guskal01>

Frontend demo: <https://aptos-singapore-2023.vercel.app/> or <https://aptos.cytronicoder.com/>

Testnet module: <https://explorer.aptoslabs.com/account/0x46237378154b23618ecabe046cf1832f536766eb095813c2b1265845e05d9adb/modules/code/CharityDonation?network=testnet>

## Move contracts

Learn more about the contracts at [move/README.md!](move/README.md)

## Frontend - getting started

1. run `pnpm install` to install dependencies; if you don't have pnpm installed, refer to [pnpm docs](https://pnpm.io/installation).
2. create two `.env` files - one in the root directory and one in `frontend/` both with `VITE_APP_NETWORK=testnet`
3. run `pnpm run move:init` to initialize a new CLI Profile.
4. run `pnpm run move:compile` to compile your move contract.
5. run `pnpm run move:publish` to publish your contract.
6. run `pnpm start` to run your dApp.
