import { APIPath,CommonUtility } from "../common";
import { BaseService } from "./base";

const CMCAPIConstant = {
  price: "tools/price-conversion",
};

class Token {
  metadata(reqData) {
    const url = `${APIPath.tokenMetadata}?${CommonUtility.objectToParams(
      reqData
    )}`;
    return BaseService.moralisAPI(url);
  }

  tokenBalances(tokenAddress,reqData) {
    const url = `${tokenAddress}/${APIPath.erc20
      }?${CommonUtility.objectToParams(reqData)}`;
    return BaseService.moralisAPI(url);
  }

  price(reqData) {
    const url = `${CMCAPIConstant.price}?${CommonUtility.objectToParams(
      reqData
    )}`;
    return BaseService.cmcAPI(url);
  }
}

const TokenService = new Token();
Object.freeze(TokenService);
export { TokenService };
