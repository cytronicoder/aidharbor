import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { AptosClient, AptosAccount, Types } from "aptos";
import charities from '../../charities.json';

import Hero from "../components/Hero";
import DisplayComponent from '../components/DisplayComponent';

function App() {
  // Initialize AptosClient
  const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");

  // Fetch account resources
  const fetchAccountResources = async () => {
    try {
      const accountResources = await client.getAccountResources("0xdfb0edf99d7ad7d8a5eec663084340c6fb4ebb951f0a9ca0fbaf75d7a1e92376");
      console.log(accountResources);
    } catch (error) {
      console.error("Failed to fetch account resources:", error);
    }
  };

  // Submit a transaction to the chain
  const submitTransaction = async () => {
    try {
      const alice = new AptosAccount();

      const payload: Types.EntryFunctionPayload = {
        function: "0x123::todolist::create_task",
        type_arguments: [],
        arguments: ["read aptos.dev"],
      };

      const rawTxn = await client.generateTransaction(alice.address(), payload);
      const bcsTxn = AptosClient.generateBCSTransaction(alice, rawTxn);
      const transactionRes = await client.submitSignedBCSTransaction(bcsTxn);

      console.log("Transaction Result:", transactionRes);
    } catch (error) {
      console.error("Failed to submit transaction:", error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-text">AidHarbor</div>
        <div>
          <WalletSelector />
        </div>
      </div>

      <Hero
        oneLiner="Empower. Relieve. Sustain."
        description="Coordinate disaster relief and make cross-border payments sustainably with Aptos."
        onCTAClick={() => {
          console.log('CTA button clicked!');
          fetchAccountResources();
          // submitTransaction();
        }}
        ctaText="Get Started"
      />
      <DisplayComponent jsonToBeDisplayed={charities} />
    </div>
  );
}

export default App;
