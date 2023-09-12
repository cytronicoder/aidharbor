import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import CharityBlurb from "../components/CharityBlurb";
import './App.css';
import charities from '../../charities.json';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import Partners from './partners';

function App() {
  const { account, connected } = useWallet();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentCharity, setCurrentCharity] = useState(null);

  useEffect(() => {
    setIsWalletConnected(connected);
  }, [connected]);

  const truncateAddress = (address: string) => {
    if (!address || address.length < 10) {
      return address;
    }
    return `${address.slice(0, 5)}...${address.slice(-5)}`;
  };

  const openModal = (charity) => {
    setCurrentCharity(charity);
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentCharity(null);
    setModalOpen(false);
  };

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-text">giving.ABC</div>
        <a href="/">Charities</a>
        <a href="/partners">Partners</a>
        <div>
          {isWalletConnected ? (
            <div>{truncateAddress(account?.address as string)}</div>
          ) : (
            <WalletSelector />
          )}
        </div>
      </div>

      <Routes>
        <Route path='/' element={
          <div className="center-container">
          {charities.map(charity => (
            <CharityBlurb
              key={charity.id}
              backgroundImage={charity.backgroundImage}
              logo={charity.logo}
              charityName={charity.name}
              address={charity.address}
              oneLiner={charity.oneLiner}
              amountRaised={charity.amountRaised}
              onCTAClick={() => openModal(charity)}
            />
          ))}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Charity Details"
          >
            {currentCharity && (
              <>
                <h2>{currentCharity.name}</h2>
                <p>{currentCharity.writeup}</p>
                <p>Amount Raised: {currentCharity.amountRaised}</p>

                <Tabs>
                  <TabList>
                    <Tab>Live feed of donations</Tab>
                    <Tab>Live feed of funds used</Tab>
                    <Tab>Top Donors</Tab>
                  </TabList>

                  <TabPanel>
                    {/* Content for Live feed of donations */}
                    <p>Donations data here...</p>
                  </TabPanel>

                  <TabPanel>
                    {/* Content for Live feed of funds used */}
                    <p>Usage of funds data here...</p>
                  </TabPanel>

                  <TabPanel>
                    {/* Content for Top Donors */}
                    <p>List of top donors...</p>
                  </TabPanel>
                </Tabs>
              </>
            )}
          </Modal>
        </div>
      }/>
      <Route path='/partners' element={<Partners />} />
      </Routes>
    </Router>
  );
}

export default App;
