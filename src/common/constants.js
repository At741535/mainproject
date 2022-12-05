import ETH from "../images/cryptocurrency_eth.svg"
import USD from "../images/usdc.svg";

const addressSymbolMap = {
  WETH: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  BNB: "0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F",
  WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  BUSD: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
  BETH: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  ETH: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
};

const networkEnum = Object.freeze({
  "0x1": "Ethereum Main",
  "0x3": "Ropsten",
  "0x5": "Goerli",
  "0x38": "BSC",
  "0x61": "BSC Testnet",
  "0x97": "BSC Testnet",
  "0x89": "Polygon",
  "0x81": "Mumbai",
  "0xfa": "Fantom",
  localhost: "localhost",
});

const networkHashMap = Object.freeze({
  1: "0x1",
  3: "0x3",
  4: "0x4",
  97: "0x97",
  61: "0x61",
  137: "0x89",
  80001: "0x13881",
});

const networkNameHashMap = Object.freeze({
  "0x1": "Ethereum Main",
  "0x3": "Ropsten",
  "0x5": "Goerli",
  "0x81": "Mumbai",
  "0x89": "Polygon",
  "0x13881": "Mumbai",
  "0x97": "BNB Testnet",
  "0x61": "BNB Testnet",
});

const modularIndexMap = {
  0: 0,
  1: 0.1,
  2: 0.15,
  3: 0.25,
  4: 0.3,
};

const CommonConstant = {
  defaultPageSize: 20,
  mode: process.env.REACT_APP_ENVIRONMENT,
  isDevelopment: process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT",
  maxBonus: 10 ** 18,
  totemChart: 'https://coinmarketcap.com/currencies/totem-new-earth-systems/',
  nullTx: '0x0000000000000000000000000000000000000000000000000000000000000000',
  nullAddress: "0x0000000000000000000000000000000000000000",
  nativeAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
}

const txBaseUrl = () => {
  if (CommonConstant.isDevelopment) {
    return "https://mumbai.polygonscan.com";
  } else {
    return "https://polygonscan.com";
  }
};

const TokenAddress = {
  WETH: {
    address: "0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa",
    symbol: "WETH",
    currencyLogo: ETH,
  },
  USDC: {
    address: "0xe11a86849d99f524cac3e7a0ec1241828e332c62",
    symbol: "USDC",
    currencyLogo: USD,
  },
};

const balanceFetchAddress = {
  weiEth: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
  matic: "0x0000000000000000000000000000000000001010"
}

const Protocols = {
  ethereum: {
    name: 'ethereum',
    chainId: {
      mainnet: '0x1',
      testnet: '0x5',
    },

    assetUrl: {
      mainnet: 'https://etherscan.io/address',
      testnet: 'https://goerli.etherscan.io/address',
    },
    tokenUrl: {
      mainnet: 'https://etherscan.io/token',
      testnet: 'https://goerli.etherscan.io/token',
    },
    txUrl: {
      mainnet: 'https://etherscan.io/tx',
      testnet: 'https://goerli.etherscan.io/tx',
    },
  },
  bsc: {
    name: 'bsc',
    chainId: {
      mainnet: '0x38',
      testnet: '0x61',
    },
    assetUrl: {
      mainnet: 'https://bscscan.com/address',
      testnet: 'https://testnet.bscscan.com/address',
    },
    tokenUrl: {
      mainnet: 'https://bscscan.com/token',
      testnet: 'https://testnet.bscscan.com/token',
    },
    txUrl: {
      mainnet: 'https://bscscan.com/tx',
      testnet: 'https://testnet.bscscan.com/tx',
    },
  },
  polygon: {
    name: 'polygon',
    chainId: {
      mainnet: '0x89',
      testnet: '0x13881',
    },
    assetUrl: {
      mainnet: 'https://polygonscan.com/address',
      testnet: 'https://mumbai.polygonscan.com/address',
    },
    tokenUrl: {
      mainnet: 'https://polygonscan.com/token',
      testnet: 'https://mumbai.polygonscan.com/token',
    },
    txUrl: {
      mainnet: 'https://polygonscan.com/tx',
      testnet: 'https://mumbai.polygonscan.com/tx',
    },
    nativeCurrency: {
      mainnet: 'MATIC',
      testnet: 'MATIC',
    },
    scanUrl: {
      mainnet: 'https://polygonscan.com/',
      testnet: 'https://mumbai.polygonscan.com/'
    },
    chainName: {
      mainnet: "polygon",
      testnet: "mumbai"
    }
  },
}

const ErrorConstant = {
  default: 'Something went wrong',
}

const OfferStatusType = {
  Created: 'Created',
  Filled: 'Filled',
  Canceled: 'Canceled',
}

export {
  CommonConstant,Protocols,OfferStatusType,ErrorConstant,addressSymbolMap,networkEnum,networkHashMap,
  networkNameHashMap,modularIndexMap,TokenAddress,balanceFetchAddress,txBaseUrl,
};
