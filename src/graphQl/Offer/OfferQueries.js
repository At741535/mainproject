import { gql } from "@apollo/client";

const GetOfferDataByContract = gql`
  query Query($filters: ListOfferInput) {
    Offers(filters: $filters) {
      _id
      nft_id
      marketplace_id
      contractAddress
      status
      offer_price
      signedOrder
      buyer_id
    }
  }
`;

const GetPrice = gql`
  query Query($payload: ReqData!) {
    price(payload: $payload)
  }
`;

export { GetOfferDataByContract, GetPrice };
