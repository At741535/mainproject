import { gql } from "@apollo/client";

const CreateOffer = gql`
mutation Mutation($payload: CreateOfferInput!) {
  createOffer(payload: $payload) {
    _id
    nft_id
    marketplace_id
    contractAddress
    signedOrder
    status
  }
}
`
const UpdateOffer = gql`
mutation Mutation($payload: UpdateOfferInput!) {
  updateOffer(payload: $payload) {
     _id
    nft_id
    marketplace_id
    contractAddress
    signedOrder
    status
  }
}
`
export { CreateOffer,UpdateOffer }