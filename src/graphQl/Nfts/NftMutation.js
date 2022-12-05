import { gql } from "@apollo/client";

export const CreateNft = gql`
mutation Mutation($payload: CreateNftInput!) {
  createNft(payload: $payload) {
    _id
    token_id
    token_address
  }
}
`
export const UpdateNft= gql`
mutation Mutation($payload: UpdateNftInput!) {
  updateNft(payload: $payload) {
    _id
    token_id
    token_address
  }
}
`