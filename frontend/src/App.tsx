import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import charities from '../../charities.json';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';

import DisplayComponent from '../components/DisplayComponent';
import Partners from './partners';

function App() {
  return (
    <Router>
      <div className="navbar">
        <div className="navbar-text">giving.ABC</div>
        <a href="/">Charities</a>
        <a href="/partners">Partners</a>
        <div>
          <WalletSelector />
        </div>
      </div>

      <Routes>
        <Route path='/' element={<DisplayComponent jsonToBeDisplayed={charities} />} />
        <Route path='/partners' element={<Partners />} />
      </Routes>
    </Router>
  );
}

export default App;
