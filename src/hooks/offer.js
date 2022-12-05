import { useEffect,useState } from "react";
import { ErrorConstant,OfferStatusType,DateUtility,DateFormat,CommonUtility,ContractUtility } from "../common";
import { useLazyQuery } from "@apollo/client";
import { GetOfferDataByContract,GetPrice } from "../graphQl/Offer/OfferQueries";

export const GetOffersByTokenHook = (
  protocol,
  account,
  tokenAddress,
  tokenId,
  marketplaceId
) => {
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [refresh,setRefresh] = useState(0);
  const [getPrice] = useLazyQuery(GetPrice,{ fetchPolicy: "network-only" });

  const [getOffers] = useLazyQuery(GetOfferDataByContract,{
    fetchPolicy: "network-only", // Doesn't check cache before making a network request
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getOffers({
        variables: {
          filters: {
            protocol,
            contractAddress: tokenAddress,
            nft_id: tokenId,
            marketplace_id: marketplaceId,
            status: OfferStatusType.Created,
          },
        },
      });
      const result = response.data.Offers || []; //await OffersService.getOffersByNft(tokenAddress, tokenId, protocol)
      const temp = result.map((item) => ({
        amount: item.offer_price,
        isYours: account
          ? account.toLowerCase() === item.signedOrder.maker.toLowerCase()
          : false,
        paymentToken: item.signedOrder
          ? ContractUtility.getPaymentToken(
            item.signedOrder.erc20Token.toLowerCase(),
            protocol
          )
          : "",
        ...item,
      }));
      const tempPromise = temp.map(async (item) => {
        if (item?.paymentToken) {
          // const cmcResponse = await TokenService.price({
          //   symbol: item.paymentToken.symbol,
          //   amount: 1,
          // });
          const cmcResponse = await getPrice({
            variables: {
              payload: {
                symbol: item.paymentToken.symbol,
                amount: 1,
              },
            },
          });
          const amount = item.amount / (10 ** item.paymentToken.decimals)

          const usdPrice = cmcResponse.data.price.data.quote["USD"]?.price || 0;
          const amountInDecimal = (
            (item.signedOrder.erc20TokenAmount / 10 ** item.paymentToken.decimals) *
            usdPrice
          ).noExponents();

          const dollarPrice = CommonUtility.currencyFormat(amountInDecimal);
          return {
            ...item,
            amountInDecimal,
            dollarPrice,
            price: `${amount} ${item.paymentToken.name}`,
            expireIn: DateUtility.getDistanceInWord(
              new Date(item?.signedOrder?.expiry * 1000),
              DateFormat.dateTime
            ),
            from: item.signedOrder.maker,
          };
        }
        return item;
      });
      const tempResult = await Promise.all(tempPromise);
      setData(tempResult);
    } catch {
      setError(ErrorConstant.default);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (tokenAddress && protocol && marketplaceId) {
      fetchData();
    }
  },[tokenAddress,marketplaceId,protocol,account,refresh]);

  const refreshData = () => {
    setRefresh(Math.random())
  };

  const refreshOffersDeep = async () => {
    await fetchData();
  }

  return {
    data,
    loading,
    error,
    setData,
    refreshData,
    refreshOffersDeep
  };
};
