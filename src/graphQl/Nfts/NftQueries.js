import { gql } from "@apollo/client";

const GetNftByContractAndTokenId = gql`
query Query($filters: ListNftInput) {
  NftByContractAndToken(filters: $filters) {
    token_address
    owner
    token_id
    _id
  }
}`

export { GetNftByContractAndTokenId }