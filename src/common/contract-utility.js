import { Protocols,CommonConstant } from './constants'
import ETHLOGO from "../images/ETH.svg"
import USDLOGO from "../images/usdc.svg"

const Images = {};
export class ContractUtility {


  static getCurrentNetwork = () => {
    if (CommonConstant.isDevelopment) {
      return Protocols.polygon.name
    } else {
      return Protocols.ethereum.name
    }
  }

  static getNetwork = (netId) => {
    // console.log("netID", netId);
    switch ((netId || "").toString()) {
      case "1":
      case "0x1":
        return "eth";
      // case "2":
      // case "0x2":
      //   return "Morden";
      // case "3":
      // case "0x3":
      //   return "Ropsten";
      case "5":
      case "0x5":
        return "goerli";
      // case "42":
      // case "0x42":
      //   return "Kovan";
      case "13881":
      case "0x13881":
      case "80001":
      case "0x80001":
      case 80001:
        return "mumbai";
      case 137:
      case "137":
      case "89":
      case "0x89":
        return "polygon";
      // case "38":
      // case "0x38":
      // case "56":
      // case "0x56":
      //   return "bsc";
      // case "61":
      // case "0x61":
      // case "97":
      // case "0x97":
      //   return "bsc testnet";
      // case "0x64":
      //   return "xdai";
      // case "0x12c":
      //   return "xdai testnet";
      // case "0xa869":
      //   return "Avalanche testnet";
      default:
        return "Unknown";
    }
  };

  static getProtocol(netId) {
    switch ((netId || '').toString()) {
      case '1':
      case '0x1':
      case '2':
      case '0x2':
      case '3':
      case '0x3':
      case '4':
      case '0x4':
      case '42':
      case '0x42':
        return Protocols.ethereum.name
      case '13881':
      case '0x13881':
      case '80001':
      case '0x80001':
      case '89':
      case '0x89':
      case '137':
      case '0x137':
        return Protocols.polygon.name
      case '38':
      case '0x38':
      case '97':
      case '0x97':
      case '61':
      case '0x61':
      case '56':
      case '0x56':
        return Protocols.bsc.name
      default:
        return null
    }
  }
  static checkNetwork = (netId) => {
    const name = ContractUtility.getProtocol(netId);
    let validName;
    if (CommonConstant.isDevelopment && name === Protocols.polygon.name) {
      validName = Protocols.polygon.name;
    } else if (!CommonConstant.isDevelopment && name === Protocols.ethereum.name) {
      validName = Protocols.ethereum.name;
    }
    return { valid: name === validName,validName };
  };

  static getMoralisNetwork(protocol) {
    if (!CommonConstant.isDevelopment) {
      switch (protocol) {
        case Protocols.ethereum.name:
          return 'eth'
        case Protocols.polygon.name:
        case Protocols.bsc.name:
          return protocol
        default:
          return null
      }
    } else {
      switch (protocol) {
        case Protocols.ethereum.name:
          return 'goerli'
        case Protocols.polygon.name:
          return 'mumbai'
        case Protocols.bsc.name:
          return 'bsc testnet'
        default:
          return null
      }
    }
  }

  static getPaymentList = chainId => {
    switch (chainId) {
      case 'goerli':
      case 'polygon':
        return [
          {
            name: 'USDC',
            text: 'USDC',
            symbol: 'usdc',
            address: '0xe11a86849d99f524cac3e7a0ec1241828e332c62',
            icon: USDLOGO,
            decimals: 18,
          },
          {
            name: 'WETH',
            text: 'WETH',
            symbol: 'eth',
            address: '0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa',
            icon: ETHLOGO,
            image: Images?.createcollection?.ethereum,
            decimals: 18,
          },
        ]
      case 'eth':
      case 'ethereum':
        return [
          {
            name: 'Eth',
            text: 'ETH',
            symbol: 'eth',
            address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            decimals: 18,
            icon: ETHLOGO,
            nativeToken: true,
            url: 'https://app.uniswap.org/#/swap?outputCurrency=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&chain=mainnet',
          },
          {
            name: 'Weth',
            text: 'WETH',
            symbol: 'weth',
            address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            decimals: 18,
            icon: ETHLOGO,
            url: 'https://app.uniswap.org/#/swap?outputCurrency=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&chain=mainnet',
          },
          {
            name: 'USDC',
            text: 'USDC',
            symbol: 'usdc',
            address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            decimals: 6,
            icon: USDLOGO,
            url: 'https://app.uniswap.org/#/swap?outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&chain=mainnet',
          },
        ]

      default:
        return []
    }
  }

  static marketplacePaymentList = chainId => {
    return ContractUtility.getPaymentList(chainId).filter(x => !x.nativeToken)
  }

  static blockchainList = [
    {
      text: 'Ethereum',
      value: 'ethereum',
    },
    // {
    //     name: 'Polygon',
    //     value: 'polygon',
    // },
  ]

  static getRPCurl = chainId => {
    if (CommonConstant.isDevelopment) {
      switch (chainId) {
        case "polygon":
          return 'https://rpc-mumbai.maticvigil.com/'
        case 'goerli':
          return 'https://goerli.infura.io/v3/'

        default:
          return ''
      }
    } else {
      switch (chainId) {

        case 'ethereum':
          return 'https://mainnet.infura.io/v3/'

        case "polygon":
          return 'https://polygon-rpc.com/'

        default:
          return ''
      }
    }
  }

  static getTokenAddress(protocol,address) {
    switch (protocol) {
      case Protocols.ethereum.name:
      case Protocols.bsc.name:
      case Protocols.polygon.name:
        return `${Protocols[protocol].assetUrl[
          !CommonConstant.isDevelopment
            ? 'mainnet'
            : 'testnet'
        ]
          }/${address}`

      default:
        return null
    }
  }

  static getTransaction(protocol,address) {
    switch (protocol) {
      case Protocols.ethereum.name:
      case Protocols.bsc.name:
      case Protocols.polygon.name:
        return `${Protocols[protocol].txUrl[
          !CommonConstant.isDevelopment
            ? 'mainnet'
            : 'testnet'
        ]
          }/${address}`

      default:
        return null
    }
  }


  static changeNetwork = async (chainId) => {
    const chainName = chainId
    const chainDetail = Protocols[chainName]
    const chain = CommonConstant.isDevelopment ? "testnet" : "mainnet"
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: chainDetail.chainId[chain]
        }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: chainDetail.chainId[chain],
              chainName: chainDetail.chainName[chain],
              nativeCurrency: {
                name: chainDetail.nativeCurrency[chain],
                symbol: chainDetail.nativeCurrency[chain],
                decimals: 18,
              },
              rpcUrls: [ContractUtility.getRPCurl(chainName)],
              blockExplorerUrls: [chainDetail.scanUrl[chain]],
            }]
          })
        } catch (addError) {
          console.log('Error adding Chain',addError);
        }
      }
    }
  }

  static getPaymentToken = (value,chainId) => {
    const list = ContractUtility.getPaymentList(chainId)
    return list.find((item) => (item.address || '').toLowerCase() === (value || '').toLowerCase());
  }

  static canSell = (currentProtocol) => {
    return CommonConstant.isDevelopment ? currentProtocol === Protocols.polygon.name : currentProtocol === Protocols.ethereum.name
  }

}
