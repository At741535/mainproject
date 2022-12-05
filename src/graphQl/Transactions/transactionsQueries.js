import { gql } from "@apollo/client";

export const GetTransactions = gql`
  query Query($filters: ListNftTransactionInput) {
    NftTransactions(filters: $filters) {
      from
      to
      event
      amount
      blockNumber
      marketplaceId
      transactionHash
      nftId
      createdAt
      paymentToken
    }
  }
`;
