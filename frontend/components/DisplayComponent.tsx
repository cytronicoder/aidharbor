import Blurb from './Blurb';
import "./DisplayComponent.css";
import Marquee from 'react-fast-marquee';
import React, { useState, useEffect } from "react";
import { Provider, Network, Types, AptosClient } from "aptos";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const provider = new Provider(Network.TESTNET);
const moduleAddress = "0x46237378154b23618ecabe046cf1832f536766eb095813c2b1265845e05d9adb";
const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1');

interface Item {
    id: number;
    backgroundImage: string;
    logo: string;
    name: string;
    oneLiner: string;
    description?: string;
    detail?: string;
    amountRaised?: number;
}

interface DisplayComponentProps {
    jsonToBeDisplayed: Item[];
}

const DisplayComponent: React.FC<DisplayComponentProps> = ({ jsonToBeDisplayed }) => {

    const [, setTransactionInProgress] = useState<boolean>(false);
    const { account, signAndSubmitTransaction } = useWallet();
    const [, setAccountHasList] = useState<boolean>(false);
    const [, setTotalAptRaised] = useState(null);
    const [resources, setResources] = React.useState<Types.MoveResource[]>([]);

    const donateNow = async () => {
        if (!account) return [];
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

    useEffect(() => {
        const fetchList = async () => {
            // if (!account) return [];    
            try {
                // const CharityDonationResource = await provider.getAccountResource(
                //   account.address,
                //   `${moduleAddress}::charity_donation::CharityDonation`
                // );
                // console.log("CharityDonationResource: "+CharityDonationResource);
                client.getAccountResources(moduleAddress).then(setResources);
                const resourceType = `${moduleAddress}::CharityDonation::get_charity_apt_raised`;
                const resource = resources.find((r) => r.type === resourceType);
                const data = resource?.data as { message: string } | undefined;
                const message = data?.message;
                console.log('message from fetch: ' + message);

                const url = 'https://fullnode.testnet.aptoslabs.com/v1/view';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, application/x-bcs'
                    },
                    body: '{"function":"46237378154b23618ecabe046cf1832f536766eb095813c2b1265845e05d9adb::CharityDonation::get_charity_apt_raised","type_arguments":[],"arguments":["0x32e5a9e28f5d6d74279ac50edd4b912b196ac8219a7c81037c12ac8fcdf16de4"]}'
                };

                fetch(url, options)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json(); // This parses the JSON data in the response
                    })
                    .then(data => {
                        // You can now work with the parsed data
                        console.log("Total Raised for this Charity alone:" + data);
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });

                setAccountHasList(true);
            } catch (e) {
                setAccountHasList(false);
            }
        };

        setAccountHasList(true);
        const apiUrl = 'https://fullnode.testnet.aptoslabs.com/v1/accounts/46237378154b23618ecabe046cf1832f536766eb095813c2b1265845e05d9adb/resource/0x46237378154b23618ecabe046cf1832f536766eb095813c2b1265845e05d9adb::CharityDonation::Charities';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Access the "total_apt_raised" value from the JSON response
                const totalAptRaisedValue = data.data.total_apt_raised;
                setTotalAptRaised(totalAptRaisedValue);
                console.log('totalAptRaisedValue: ', totalAptRaisedValue);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        fetchList();
    }, [account?.address, resources]);

    return (
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
                                amountRaised={item.amountRaised}
                                onCTAClick={donateNow}
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default DisplayComponent;
