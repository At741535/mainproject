import React from 'react'
import App from './App'
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { WalletProvider } from './context/wallet';

const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
};

const EntryComponent = () => {
    return (
        <>
            <Web3ReactProvider getLibrary={getLibrary}>
                <WalletProvider>
                    <App />
                </WalletProvider>
            </Web3ReactProvider>

        </>
    )
}

export default EntryComponent
