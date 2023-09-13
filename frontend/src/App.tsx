import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import charities from '../../charities.json';

import Hero from "../components/Hero";
import DisplayComponent from '../components/DisplayComponent';

import "./App.css"; // Consider adding a CSS file for styling

function App() {
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
          ctaText="Get Started"
          onCTAClick={() => {alert("Coming soon...");}}
        />

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
