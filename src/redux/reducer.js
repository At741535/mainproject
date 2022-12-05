export const initialState = {
  wallet: null,
  connectedAccountAddress: null,
  connectedChainId: null,
  web3:null,
  protocol:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_WALLET":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        connectedAccountAddress: action.payload.connectedAccountAddress,
      };
    case "UPDATE_NETWORK":
      return {
        ...state,
        connectedChainId: action.payload.connectedChainId,
      };
    case "DISCONNECT":
      return {
        ...state,
        wallet: null,
        connectedAccountAddress: null,
        connectedChainId: null,
      };

    default:
      return state;
  }
};

export default reducer;
