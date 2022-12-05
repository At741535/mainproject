import { gql } from "@apollo/client";

const GetAuctionNftByContract = gql`
query Query($filters: ListAuctionNftInput) {
  AuctionNfts(filters: $filters) {
    contractAddress
    isListed
    nft_id
    _id
  }
}`

export { GetAuctionNftByContract }