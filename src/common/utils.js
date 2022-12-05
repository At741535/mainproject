
import {
  ContractUtility,
} from './contract-utility';
import fromExponential from "from-exponential";

export const truncate = (fullStr,strLen) => {
  if (fullStr?.length <= strLen) return fullStr || "";

  return (
    // fullStr?.substr(0, frontChars) +
    // separator +
    fullStr?.substr(fullStr?.length - strLen,fullStr?.length)
  );
};

export const SwapSdk = async (blockchain,Web3,NftSwapV4,ethers) => {
  if (blockchain.wallet && blockchain?.wallet?.provider) {
    const etherProvider = new ethers.providers.Web3Provider(
      blockchain.wallet.provider
    );
    const signer = etherProvider.getSigner();
    let chainId = null;
    if (Web3.givenProvider) {
      chainId = (await etherProvider.getNetwork())?.chainId;
    }
    const nftSwapSdk = new NftSwapV4(etherProvider,signer,chainId);
    return { signer,nftSwapSdk };
  }
};


export const genrateNewSignature = async (Web3,sender,nonce) => {
  const message = `I am signing my one-time nonce: ${nonce}`;
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);

    const signature = await web3.eth.personal.sign(message,sender,"");
    //console.log("---signature---", signature);
    return signature;
  }
};

export const getToken = async () => {
  const token = await localStorage.getItem("access_token");
  return token
}

export const weiToCurrency = (signedOrder,amount,protocol = "polygon") => {
  if (signedOrder && !amount) {
    const { erc20Token,erc20TokenAmount } = signedOrder || {}
    const tokenList = ContractUtility.marketplacePaymentList(protocol)

    const paymentTokenDecimals = (tokenList || []).find(item => (item.address.toLowerCase() === erc20Token))?.decimals
    let price = +erc20TokenAmount / (10 ** (+paymentTokenDecimals))
    return price
  }

  if (!signedOrder && amount) {
    let price = +amount / (10 ** (18))
    return price
  }

}

export const calculateFee = (totalprice) => {
  const feePercentage = (process.env.REACT_APP_MARKETPLACE_FEES) / 100
  let actualPirce = (+fromExponential(totalprice * (1 - feePercentage))).toFixed(18)
  let fee = (+fromExponential(totalprice * feePercentage)).toFixed(18)
  return { actualPirce,fee }
}
