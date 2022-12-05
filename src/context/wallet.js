import React,{ createContext,useContext,useState,useEffect,useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ExistingUsersFilter } from "../graphQl/User/UserQueries";
import { CreateUserById } from "../graphQl/User/UserMutation";
import Web3 from "web3";
import { genrateNewSignature,getToken,Connectors,ContractUtility } from "../common";
import { useLazyQuery,useMutation } from "@apollo/client";
import { useDispatch,useSelector } from "react-redux";
import { saveWallet,disconnectWallet } from "../redux/actions";
import { initialState } from "../redux/reducer";
import { isMobile } from "react-device-detect";

import WalletConnect from '../components/WalletConnect';

const WalletContext = createContext()

export function WalletProvider({ children }) {
    const blockchain = useSelector((state) => state?.blockchain);
    const [getUser] = useLazyQuery(ExistingUsersFilter,{
        fetchPolicy: "network-only", // Doesn't check cache before making a network request
    });
    const [createUserById] = useMutation(CreateUserById);
    const [openConnectWallet,setOpenConnectWallet] = useState(false);
    const [getWallet,setGetWallet] = useState(null);
    const [userData,setUserData] = useState();
    const { chainId,activate,active,deactivate } = useWeb3React();
    const reduxDispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (getWallet && getWallet.account) {
                const web3 = new Web3(getWallet.provider);
                const nonce = await web3.eth.getTransactionCount(getWallet.account);
                const isConnected = await getToken();
                const sig =
                    !isConnected &&
                    (await genrateNewSignature(Web3,getWallet.account,nonce));
                getUser({
                    variables: { filters: { wallet: getWallet.account } },
                    onCompleted: (data) => {
                        // setIsLoading(false);
                    },
                }).then(async (response) => {
                    //const network = ContractUtility.getNetwork(chainId.toString())
                    if (response && response.data.Users.length) {
                        const userData = response.data?.Users[0];
                        setUserData({ ...userData });
                        await localStorage.setItem(
                            "access_token",
                            response.data.Users[0]?.token
                        );
                        localStorage.setItem("connected","connected");
                    } else {
                        createUserById({
                            variables: {
                                payload: {
                                    wallet: getWallet.account,
                                    nonce: nonce,
                                    signature: sig,
                                },
                            },
                            onCompleted: async (data) => {
                                await localStorage.setItem(
                                    "access_token",
                                    data.createUser.token
                                );
                                localStorage.setItem("connected","connected");
                            },
                        }).then((data) => {
                            const createdData = data.data.createUser;
                            setUserData({ ...createdData });
                        });
                    }
                }).catch(console.error());
            } else {
                reduxDispatch(saveWallet({ ...initialState }));
                setUserData(null);
            }
        })();
    },[getWallet]);

    useEffect(() => {
        if (active && userData) {
            const web3 = new Web3(getWallet.provider);
            const protocol =
                chainId && ContractUtility.getProtocol(chainId.toString());
            reduxDispatch(
                saveWallet({
                    ...blockchain,
                    connectedAccountAddress: userData.wallet,
                    userId: userData._id,
                    wallet: getWallet,
                    web3,
                    protocol,
                })
            );
        }
    },[userData]);

    const reduxInitialState = async () => {
        await deactivate();
        setGetWallet(null);
        reduxDispatch(
            saveWallet({
                ...initialState,
            })
        );
    };

    const walletDisconnectHandler = async () => {
        await localStorage.removeItem("connected");
        await localStorage.removeItem("access_token");
        await reduxInitialState();
        await reduxDispatch(disconnectWallet());
    };

    const toggleWalletConnect = () => {
        setOpenConnectWallet(!openConnectWallet);
    };

    const connectMobileWallet = (item) => {
        let dappUrl = window.location.href.split("//")[1].split("/")[0];
        if (item.name === "Coinbase") {
            dappUrl = encodeURIComponent(dappUrl)
        }
        const deepLink = `${item.deepLink}${dappUrl}`;
        window.open(deepLink,"_self");
    };

    const connectWalletWeb3React = async (item) => {
        if (!window.ethereum && isMobile && item.deepLink) {
            connectMobileWallet(item)
            return
        }
        try {
            await activate(item.connector);
        } catch {
        }
        const newWallet = await item.connector.activate();
        if (newWallet) {
            await setGetWallet(newWallet);
        }
        return newWallet;
    };

    useEffect(() => {
        if (active && chainId && getWallet) {
            reduxDispatch(
                saveWallet({
                    connectedChainId: chainId,
                })
            );
            setOpenConnectWallet(false);
        }
    },[chainId,blockchain.connectedAccountAddress]);

    useEffect(() => {
        if (!active && blockchain?.connectedAccountAddress) {
            (async () => {
                await reduxInitialState();
            })();
        }
    },[getWallet,chainId,active]);

    useEffect(() => {
        (async () => {
            const isConnected = await getToken();
            if (isConnected && !blockchain?.connectedAccountAddress) {
                try {
                    await connectWalletWeb3React(Connectors[0]);
                } catch {
                    // navigate('/')
                }
            }
        })();
    },[]);

    const contextData = useMemo(() => ({
        openConnectWallet,
        toggleWalletConnect,
        connectWalletWeb3React,
        walletDisconnectHandler,
        setGetWallet,
    }),[
        openConnectWallet,
        toggleWalletConnect,
        connectWalletWeb3React,
        walletDisconnectHandler,
        setGetWallet,
    ])

    return (
        <WalletContext.Provider value={contextData}>
            {children}
            <WalletConnect
                openConnectWallet={openConnectWallet}
                closeWalletConnect={toggleWalletConnect}
                connectWalletWeb3React={connectWalletWeb3React}
            />
        </WalletContext.Provider>
    )
}

export const useWallet = () => useContext(WalletContext)
