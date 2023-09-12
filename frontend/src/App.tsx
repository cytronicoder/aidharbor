import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { AptosClient, Types } from "aptos";
import charities from '../../charities.json';
import { useState, useEffect } from "react";

import Hero from "../components/Hero";
import DisplayComponent from '../components/DisplayComponent';

function App() {
  const [transactions, setTransactions] = useState<Types.Transaction[]>([]);

  // Initialize AptosClient
  const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const txns = await client.getTransactions();
        // Only keep the last 5 transactions
        setTransactions(txns.slice(-5));
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    const interval = setInterval(fetchTransactions, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [client]);

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
        }}
        ctaText="Get Started"
      />

      {/* Displaying the last 5 transactions */}
      {/* <div className="transactions">
        <h3>Recent Transactions</h3>
        <ul>
          {transactions.map((txn, index) => (
            <li key={index}>{txn.hash}</li>
          ))}
        </ul>
      </div> */}

      <DisplayComponent jsonToBeDisplayed={charities} />
    </div>
  );
}

export default App;
