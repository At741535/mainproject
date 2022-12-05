import { CommonUtility,APIPath } from '../common'
import { BaseService } from './base';

class Marketplace {

    byToken(protocol,tokenAddress,tokenId) {
        return BaseService.get(`${APIPath.marketplace}/${protocol}/${tokenAddress}/${tokenId}`)
    }

    buyNft(data) {
        return BaseService.put(`${APIPath.buyNft}`,data)
    }

    nftTransactions(params) {
        const query = CommonUtility.objectToParams(params);
        return BaseService.get(`${APIPath.nftTransactions}?${query}`)
    }

    userListing(address) {
        return BaseService.get(`${APIPath.marketplaceUserListing}/${address}`)
    }

    cancelListing(data) {
        return BaseService.put(`${APIPath.marketplaceCancelListing}`,data)
    }

    addReservedOrder(data) {
        return BaseService.post(`${APIPath.reservedOrder}`,data)
    }

    updateOrder(data) {
        return BaseService.post(`${APIPath.updateOrder}`,data)
    }
}

const MarketplaceService = new Marketplace()
Object.freeze(MarketplaceService)
export { MarketplaceService }
