import { gql } from "@apollo/client";

const CreateTransaction = gql`
  mutation Mutation($payload: CreateNftTransactionInput!) {
    createNftTransaction(payload: $payload) {
      _id
      amount
      blockNumber
      createdAt
      event
      from
      marketplaceId
      nftId
      to
      transactionHash
      updatedAt
      userId
      paymentToken
    }
  }
`;

export { CreateTransaction };
