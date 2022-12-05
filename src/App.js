import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NftDetail from "./pages/NftDetail";
import WalletConnectModal from "./components/WalletConnectModal";
import { Modal } from "@mui/material";
import { Explore, Profile, PublicProfile, Home } from "./pages";

function App() {
  const [network, setNetwork] = useState(false);
  const blockchain = useSelector((state) => state?.blockchain);

  const connectWallet = useMemo(() => {
    return (
      network &&
      !(
        window.location.pathname === "/" ||
        window.location.pathname.indexOf("/user/") > -1
      )
    );
  }, [network]);

  const networkHandler = () => {
    setNetwork(!network);
  };

  useEffect(() => {
    (async () => {
      const isConnected = localStorage.getItem("connected");
      if (!blockchain.connectedAccountAddress && !isConnected) {
        setNetwork(true);
      } else {
        setNetwork(false);
      }
    })();
  }, [blockchain.connectedAccountAddress]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/detail/:protocol/:tokenAddress/:tokenId"
            element={<NftDetail />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:address" element={<PublicProfile />} />
        </Routes>
        {connectWallet && (
          <Modal open={network} onClose={networkHandler}>
            <WalletConnectModal networkHandler={networkHandler} />
          </Modal>
        )}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
