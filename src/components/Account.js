import React,{ useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Box,Modal } from "@mui/material";
import { saveWallet,updateAccount,disconnectWallet,updateNetwork } from "../redux/actions";
import { networkHashMap,ContractUtility } from "../common";
import WrongNetwork from "./WrongNetwork";

const Account = ({ walletDisconnectHandler,setGetWallet,initialState }) => {
  const [network,setNetwork] = useState(false);
  const [networkName,setNetworkName] = useState(null);
  const reduxDispatch = useDispatch();
  const blockchain = useSelector((state) => state?.blockchain);

  const networkHandler = () => {
    setNetwork(false);
  };

  const handleWalletDisconnect = (accounts) => {
    if (!accounts) {
      reduxDispatch(updateAccount(null));
    }
  };

  useEffect(() => {
    (async () => {
      if (blockchain.wallet && blockchain.connectedChainId) {
        const network = await ContractUtility.checkNetwork(blockchain.connectedChainId);
        setNetworkName(network.validName);
        if (!network.valid) {
          setNetwork(true);
        } else {
          setNetwork(false);
        }
      }
      if (!blockchain.connectedChainId) {
        setNetwork(false)
      }
    })()
  },[blockchain,blockchain.connectedChainId]);

  useEffect(() => {
    if (blockchain.wallet && blockchain.wallet.provider) {
      blockchain.wallet.provider.on("accountsChanged",function (accounts) {
        if (accounts) {
          localStorage.removeItem("access_token");
          setGetWallet((prev) => { return { ...prev,account: accounts[0] } })
          reduxDispatch(saveWallet({ ...initialState }));
        }
      });
      blockchain.wallet.provider.on("networkChanged",function (networkId) {
        reduxDispatch(updateNetwork(networkHashMap[networkId]));
      });
      blockchain.wallet.provider.on("disconnect",handleWalletDisconnect);
    }
  },[blockchain.wallet]);


  const disconnectWalletHandler = async () => {
    await setNetwork(false);
    await walletDisconnectHandler()
    reduxDispatch(disconnectWallet());
  };

  useEffect(() => {
    const networkValid = ContractUtility.checkNetwork(blockchain?.connectedChainId);
    if (!network && blockchain.connectedAccountAddress && !networkValid.valid) {
      disconnectWalletHandler()
      reduxDispatch(
        saveWallet({
          connectedAccountAddress: null
        })
      );
      setNetwork(false)
    }
  },[network])

  return (
    <React.Fragment>
      <Modal open={network} onClose={networkHandler}>
        <Box>
          <WrongNetwork networkName={networkName} disconnectWallet={disconnectWalletHandler} />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Account;
