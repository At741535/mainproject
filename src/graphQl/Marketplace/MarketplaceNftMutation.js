import { gql } from "@apollo/client";

export const CreateMarketplaceNft = gql`
mutation Mutation($payload: CreateMarketplaceInput!) {
  createMarketplaceNft(payload: $payload) {
    _id
    contractAddress
    createdAt
    isActive
    listType
    nft_id
    offer_price
    paymentToken
    reserved
    signedOrder
    sold
    tokenId
    supply
    walletAddress
    creatorAddress
  }
}
`

export const UpdateMarketplace = gql`
mutation Mutation($payload: UpdateMarketplaceInput!) {
  updateMarketplaceNft(payload: $payload) {
    _id
    contractAddress
    createdAt
    isActive
    listType
    nft_id
    offer_price
    paymentToken
    reserved
    signedOrder
    sold
    tokenId
    supply
    walletAddress
    creatorAddress
  }
}
`