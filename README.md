# aptos-singapore-2023

Aptos-powered platform for transparent disaster relief coordination and eco-conscious cross-border payments

## Getting Started

1. run `pnpm install` to install dependencies; if you don't have pnpm installed, refer to [pnpm docs](https://pnpm.io/installation).
2. create two `.env` files - one in the root directory and one in `frontend/` both with `VITE_APP_NETWORK=testnet`
3. run `pnpm run move:init` to initialize a new CLI Profile.
4. run `pnpm run move:compile` to compile your move contract.
5. run `pnpm run move:publish` to publish your contract.
6. run `pnpm start` to run your dApp.

## TODO

### Design and Layout

- [ ] Wireframe and design the main pages:
  - [ ] Homepage
  - [ ] List of charities
  - [ ] Donation details
  - [ ] Loyalty token usage, and
  - [ ] Admin dashboard

### Components

- [ ] Develop a reusable component library (buttons, input fields, cards, etc.)
- [ ] Create core layout components:
  - [ ] Header
  - [ ] Footer
  - [ ] Sidebar, and
  - [ ] Main content area
- [ ] Design dynamic components:
  - [ ] List of charities
  - [ ] Donation form
  - [ ] Loyalty token usage display, and
  - [ ] Live donation feed

### UX

- [ ] Allow basic users to browse the list of charities and donate
- [ ] Display detailed information about each charity upon selection
- [ ] Incorporate a donation form to specify the donation amount and trigger the Aptos transaction
- [ ] Post-donation, allocate "loyalty tokens" to users in real-time
- [ ] Implement functionality for basic users to browse and use their "loyalty tokens"
- [ ] Design a homepage with links to individual charity pages and a live feed of concurrent donations
