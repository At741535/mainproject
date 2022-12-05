// import { Images } from "images";
import {
    injected,
    walletconnect,
    walletlink,
} from "./walletConnectors";

export const Connectors = [
    {
        img: "Images.header.mask",
        name: 'MetaMask',
        desc: 'Recommended',
        connector: injected,
        deepLink: "https://metamask.app.link/dapp/",
    },
    {
        img: "Images.header.walletconn",
        name: 'WalletConnect',
        connector: walletconnect
    },
    {
        img: "Images.header.coinbase",
        name: 'Coinbase',
        connector: walletlink,
        deepLink: "https://go.cb-w.com/dapp?cb_url="
    },
]