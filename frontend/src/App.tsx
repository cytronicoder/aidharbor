import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { AptosClient, Types } from "aptos";
import charities from '../../charities.json';
import { useState, useEffect } from "react";

import Hero from "../components/Hero";
import DisplayComponent from '../components/DisplayComponent';

import "./App.css"; // Consider adding a CSS file for styling

function App() {
  const [transactions, setTransactions] = useState<Types.Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initialize AptosClient
  const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const txns = await client.getTransactions();
        // Retain the last 5 transactions
        setTransactions(txns.slice(-5));
      } catch (error) {
        setError("Failed to fetch transactions");
        console.error("Error fetching transactions:", error);
      }
    };

    const interval = setInterval(fetchTransactions, 5000);

    return () => clearInterval(interval);
  }, [client]);

  return (
    <div className="app-container">
      <header className="navbar">
        <a href="/">
          <img src="/ship.svg" alt="AidHarbor logo" className="logo" width={800} />
        </a>
        <WalletSelector />
      </header>

      <main>
        <Hero
          oneLiner="Empower. Relieve. Sustain."
          description="Coordinate disaster relief and make cross-border payments sustainably with Aptos."
          onCTAClick={() => console.log('CTA button clicked!')}
          ctaText="Get Started"
        />

        {/* Consider adding a conditional display in case of errors */}
        {error && <div className="error">{error}</div>}

        {/* Section for transactions if needed in the future */}
        {/* <section className="transactions">
          <h3>Recent Transactions</h3>
          <ul>
            {transactions.map((txn, index) => (
              <li key={index}>{txn.hash}</li>
            ))}
          </ul>
        </section> */}

        <section className="charities-section">
          <DisplayComponent jsonToBeDisplayed={charities} />
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2023 AidHarbor. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
