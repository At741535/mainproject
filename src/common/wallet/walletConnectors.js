import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

const ConnectionInfo = {
    RPC_URL_1: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    RPC_URL_5: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    PORTIS_DAPP_ID: 'b04933fe-005b-4b5c-ae47-315dbf4c76fa',
};

const RPC_URLS = {
    1: ConnectionInfo.RPC_URL_1,
    5: ConnectionInfo.RPC_URL_5,
}

export const injected = new InjectedConnector({ supportedChainIds: [1,3,4,5,38,42,89,97,80001,137,56,421611,43114,43113,421613,42161] })

export const walletconnect = new WalletConnectConnector({
    rpc: RPC_URLS,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
});

export const walletlink = new WalletLinkConnector({
    url: RPC_URLS[1],
    appName: 'web3-react example',
    supportedChainIds: [1,4,97],
})
