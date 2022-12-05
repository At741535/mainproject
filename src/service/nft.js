import { APIPath,CommonUtility } from '../common';
import { BaseService } from './base';

class NFT {

    getNFTs = (reqData) => {
        const url = `${APIPath.assets}?${CommonUtility.objectToParams(reqData)}`;
        return BaseService.openseaAPI(url);
    }

    moralisNFTs = (address,reqData,cursor) => {
        const url = `${address}/nft?${CommonUtility.objectToParams(reqData)}`;
        return BaseService.moralisAPI(url,cursor);
    }


    moralisByTokenAddress = (tokenAddress,tokenId,reqData) => {
        const url = `nft/${tokenAddress}/${tokenId}?${CommonUtility.objectToParams(reqData)}`;
        return BaseService.moralisAPI(url);
    }

    moralisNFTOwners = (tokenAddress,tokenId,reqData) => {
        const url = `nft/${tokenAddress}/${tokenId}/owners?${CommonUtility.objectToParams(reqData)}`;
        return BaseService.moralisAPI(url);
    }

    nftDetails = (token_address,token_id) => {
        const url = `${APIPath.asset}/${token_address}/${token_id}`;
        return BaseService.openseaAPI(url);
    }

    metadataLink = (url) => {
        return BaseService.extenralAPICall(url);
    }
    moralistTransactions = (token_address,token_id,reqData) => {
        const url = `nft/${token_address}/${token_id}/transfers?${CommonUtility.objectToParams(
            reqData,
        )}`
        return BaseService.moralisAPI(url)
    }


    collection = (slug) => {
        const url = `${APIPath.collection}/${slug}`;
        return BaseService.openseaAPI(url);
    }
}

const NFTService = new NFT();
Object.freeze(NFTService);
export { NFTService };
