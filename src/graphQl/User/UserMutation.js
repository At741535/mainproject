import { gql } from "@apollo/client";

const CreateUserById = gql`
  mutation Mutation($payload: CreateUserInput!) {
    createUser(payload: $payload) {
      _id
      name
      userName
      wallet
      signature
      token
    }
  }
`;

const UpdateUserById = gql`
  mutation UpdateUser($payload: UpdateUserInput!, $toDelete: String) {
    updateUser(payload: $payload, toDelete: $toDelete) {
     _id
      name
      userName
      wallet
    }
  }
`;

const UpdatetwitterStatus = gql`
  mutation Mutation($payload: UpdateTwitterStatus!) {
  twitterVerification(payload: $payload) {
    _id
    name
    userName
    wallet
  }
}
`

export { CreateUserById, UpdateUserById, UpdatetwitterStatus };
