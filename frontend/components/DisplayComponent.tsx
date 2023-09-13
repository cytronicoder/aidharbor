import Blurb from './Blurb';
import "./DisplayComponent.css";
import Marquee from 'react-fast-marquee';
import React, { useState } from "react";
import { Provider, Network } from "aptos";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect } from "react";

const provider = new Provider(Network.TESTNET);
const moduleAddress = "0x46237378154b23618ecabe046cf1832f536766eb095813c2b1265845e05d9adb";

interface Item {
    id: number;
    backgroundImage: string;
    logo: string;
    name: string;
    oneLiner: string;
    description?: string;
    detail?: string;
}

interface DisplayComponentProps {
    jsonToBeDisplayed: Item[];
}

const DisplayComponent: React.FC<DisplayComponentProps> = ({ jsonToBeDisplayed }) => {
    const [, setTransactionInProgress] = useState<boolean>(false);
    const { account, signAndSubmitTransaction } = useWallet();
    const [, setAccountHasList] = useState<boolean>(false);
    const [totalAptRaised, setTotalAptRaised] = useState(null);

    useEffect(() => {
        const fetchTotalRaised = () => {
            setAccountHasList(true);
            const apiUrl = 'https://fullnode.testnet.aptoslabs.com/v1/accounts/46237378154b23618ecabe046cf1832f536766eb095813c2b1265845e05d9adb/resource/0x46237378154b23618ecabe046cf1832f536766eb095813c2b1265845e05d9adb::CharityDonation::Charities';
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const totalAptRaisedValue = data.data.total_apt_raised;
                    setTotalAptRaised(totalAptRaisedValue);
                    console.log('totalAptRaisedValue: ', totalAptRaisedValue);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchTotalRaised();

        const intervalId = setInterval(() => {
            fetchTotalRaised();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [account?.address]);

    const donateNow = async () => {
        if (!account) {
            alert("Please connect your wallet!");
            return [];
        }
        setTransactionInProgress(true);

        // build a transaction payload to be submited
        const payload = {
            type: "entry_function_payload",
            function: `${moduleAddress}::CharityDonation::donate_to_charity`,
            type_arguments: [],
            arguments: ["0x32e5a9e28f5d6d74279ac50edd4b912b196ac8219a7c81037c12ac8fcdf16de4", "100"],
        };
        try {
            // sign and submit transaction to chain
            const response = await signAndSubmitTransaction(payload);
            // wait for transaction
            await provider.waitForTransaction(response.hash);
            setAccountHasList(true);
        } catch (error) {
            setAccountHasList(false);
        } finally {
            setTransactionInProgress(false);
        }
    };

    return (
        <>
            <div className="header">
                <h1 className="title">Charities donation demo ⬇️</h1>
                <p className="subtitle">Total amount raised in demo account: {totalAptRaised} Octas</p>
            </div>
            <div className="container">
                <div className="display-component">
                    <Marquee className='marquee' direction="left" pauseOnHover={true} speed={100}>
                        {jsonToBeDisplayed.map(item => (
                            <div className="marquee-item" key={item.id}>
                                <Blurb
                                    backgroundImage={item.backgroundImage}
                                    logo={item.logo}
                                    name={item.name}
                                    oneLiner={item.oneLiner}
                                    onCTAClick={donateNow}
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </>
    );
};

export default DisplayComponent;
