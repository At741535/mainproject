export const saveWallet = (payload) => {
  return {
    type: "SAVE_WALLET",
    payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ connectedAccountAddress: account }));
  };
};

const updateNetworkRequest = (payload) => {
  return {
    type: "UPDATE_NETWORK",
    payload: payload,
  };
};

export const updateNetwork = (network) => {
  return async (dispatch) => {
    dispatch(updateNetworkRequest({ connectedChainId: network }));
  };
};

const disconnect = (payload) => {
  return {
    type: "DISCONNECT",
    payload: payload,
  };
};

export const disconnectWallet = (network) => {
  return async (dispatch) => {
    dispatch(disconnect());
  };
};

// export const swapperSwitch = (payload) => {
//   return {
//     type: "SWAPPER_SWITCH",
//     payload,
//   };
// };

// export const updateTwitterUser = (payload)=>{
//   return {
//     type: "TWITTER_UPDATE",
//     payload,
//   }
// }

// export const mintContractAddress = (payload) => {
//   return {
//     type: "MINT_CONTRACT_ADDRESS",
//     payload,
//   }
// }

// export const updateWalletBalance = (payload) => {
//   return {
//     type: "UPDATE_WALLET_BALANCE",
//     payload,
//   };
// };
