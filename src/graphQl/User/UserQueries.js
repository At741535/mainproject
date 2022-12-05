import { gql } from "@apollo/client";

const ExistingUsersFilter = gql`
  query Query($filters: ListUserInput) {
    Users(filters: $filters) {
      _id
      name
      userName
      wallet
      token
    }
  }
`;

const UserData = gql`
  query Users($filters: ListUserInput) {
    Users(filters: $filters) {
      _id
      name
      userName
      wallet
    }
  }
`;

const GetUserbyWallet = gql`
  query Query($wallet: String!) {
    UserByWallet(wallet: $wallet) {
      _id
      name
      userName
      wallet
      token
    }
  }
`;

const GetUserById = gql`
  query Query($id: String!) {
    User(_id: $id) {
      _id
      name
      userName
      wallet
      token
    }
  }
`;

export { ExistingUsersFilter, UserData, GetUserbyWallet, GetUserById };
