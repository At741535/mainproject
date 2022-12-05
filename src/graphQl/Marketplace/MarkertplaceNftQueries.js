import { gql } from "@apollo/client";

export const GetListedNft = gql`
query Query($filters: MarketplaceFilterInput) {
  ListedNfts(filters: $filters) {
     listedNFT
      signedOrder
      offer_price
      _id
      listType
      walletAddress
      creatorAddress
    }
  }
`;

export const GetListedNftByContractAndToken = gql`
  query Query($filters: ListMarketplaceInput) {
    getByContractAndToken(filters: $filters) {
      listedNFT
      signedOrder
      offer_price
      _id
      listType
      walletAddress
      creatorAddress
      nft_id
    }
  }
`;
export const GetFilteredListedNft = gql`
  query Query($min: String, $max: String, $token: String, $walletAddress: String,$protocol: String!,$listType: String!,$isNew:Boolean!) {
    FilteredListedNfts(min: $min, max: $max, token: $token, walletAddress: $walletAddress,protocol: $protocol,listType:$listType,isNew:$isNew) {
      signedOrder
      listedNFT
      offer_price
      paymentToken
      listType
      walletAddress
      creatorAddress
    }
  }
`;
