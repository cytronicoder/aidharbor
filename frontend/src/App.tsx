import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import charities from '../../charities.json';

import Hero from "../components/Hero";
import DisplayComponent from '../components/DisplayComponent';

function App() {
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
        onCTAClick={() => console.log('CTA button clicked!')}
        ctaText="Get Started"
      />
      <DisplayComponent jsonToBeDisplayed={charities} />
    </div>
  );
}

export default App;
