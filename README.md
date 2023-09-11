# aptos-singapore-2023

Aptos-powered platform for transparent disaster relief coordination and eco-conscious cross-border payments

## Getting Started

1. run `pnpm install` to install dependencies; if you don't have pnpm installed, refer to [pnpm docs](https://pnpm.io/installation).
2. create two `.env` files - one in the root directory and one in `frontend/` both with `VITE_APP_NETWORK=testnet`
3. run `pnpm run move:init` to initialize a new CLI Profile.
4. run `pnpm run move:compile` to compile your move contract.
5. run `pnpm run move:publish` to publish your contract.
6. run `pnpm start` to run your dApp.

## TODO for front-end

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

## TODO for back-end

- [ ] Set up a development environment for the Aptos Move smart contract.
- [ ] Write a custom Move smart contract for the donation system.

  - Include functionality to track and memo where donations are directed, ensuring transparency for charities.
  - Test the contract in a sandboxed environment before deployment.

- [ ] Develop and deploy the fungible asset standard as defined by [Aptos standards](https://aptos.dev/standards/fungible-asset/#fungible-asset-and-fungible-store).

  - This will be used to represent "loyalty tokens" and potentially other assets on the platform.
  - Ensure that the asset is divisible, transferable, and adheres to the standard's specifications.

- [ ] Set up a connection with the Aptos [GraphQL API (indexer + explorer)](https://aptos.dev/indexer/api/) to monitor live transactions.
- [ ] Implement a mechanism to fetch and display real-time donation transactions on the platform.

  - This will power the live feed feature on the front-end.
  - Ensure that the system can handle high volumes of transaction data without lag or slowdown.

- [ ] Design RESTful API endpoints to manage charities (CRUD operations).
- [ ] Integrate the API with the Move smart contract to handle donation transactions.
- [ ] Implement user authentication and authorization mechanisms to secure data and restrict access to admin features.
