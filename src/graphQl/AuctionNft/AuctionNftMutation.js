import { gql } from "@apollo/client";

const CreateAuctionNft = gql`
mutation Mutation($payload: CreateAuctionNftInput!) {
    createAuctionNft(payload: $payload) {
        contractAddress
        isListed
        nft_id
        owner_of
    }
}
`

const UpdateAUctionNft= gql`
mutation Mutation($payload: UpdateAuctionNftInput!) {
  updateAuctionNft(payload: $payload) {
    owner_of
    isListed
    nft_id
    contractAddress
  }
}
`
export { CreateAuctionNft, UpdateAUctionNft }
