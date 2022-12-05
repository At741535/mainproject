import React,{ useState,useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { NftSingleDetail,NftAuctionDetail } from "../page-components/nft-details";
import { CircularProgress,styled } from "@mui/material";
import { useMutation } from "@apollo/client";
import {
  GetMarketplaceByTokenHook,
  GetPaymentTokenHook,
  GetUserNFTDetailsHook,
  NFTDetailsHook,
  NFTTransactionsHook,
  GetOffersByTokenHook,
} from "../hooks";
import { CreateNft } from "../graphQl/Nfts/NftMutation";
import {
  CreateMarketplaceNft,
  UpdateMarketplace,
} from "../graphQl/Marketplace/MarketplaceNftMutation";
import { CreateOffer,UpdateOffer } from "../graphQl/Offer/OfferMutation";
import { CreateTransaction } from "../graphQl/Transactions/transactionsMutations";
import { DateUtility,weiToCurrency,OfferStatusType,ContractUtility } from "../common";
import { DocumentTitle } from "../components";
import { useWallet } from "../context/wallet";

const LoaderWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;

  svg {
    color: #000000;
  }
`;

const prepareMarketplaceInput = (listingData,nft_id) => {

  const skipProp = [
    "isAuction",
    "offerId",
    "nft",
    "expiry",
    "transaction",
    "TAKER_ASSET",
    "MAKER_ASSET",
    "reserveBuyer",
  ];
  listingData.listType === "fixed" && skipProp.push("auctionType")
  skipProp.forEach((prop) => {
    delete listingData[prop];
  });
  return { ...listingData,nft_id };
};

const NftDetail = () => {

  const {
    toggleWalletConnect,
  } = useWallet()

  const [loader,setLoader] = useState(false);
  const { tokenAddress,tokenId,protocol } = useParams();
  const blockchain = useSelector((state) => state?.blockchain);
  const [createOffer] = useMutation(CreateOffer);
  const [createNft] = useMutation(CreateNft);
  const [createMarketplace] = useMutation(CreateMarketplaceNft);
  const [updateMarketplace] = useMutation(UpdateMarketplace);
  const [updateOffer] = useMutation(UpdateOffer);
  const [AddNewTransaction] = useMutation(CreateTransaction);
  const canTakeAction = useMemo(() => ContractUtility.canSell(protocol),[protocol])

  const { data: nftDetails,owners,loading } = NFTDetailsHook(
    tokenAddress,
    tokenId,
    protocol,
  );

  const { data: marketplaceData,refreshData: refreshMarketplaceData } = GetMarketplaceByTokenHook(protocol,tokenAddress,tokenId);

  const { transactions: nftTransactions,
    nft: currNftData,refreshData: userNftDetailsRefresh,
  } = GetUserNFTDetailsHook(protocol,tokenAddress,tokenId)

  const { data: transactions } = NFTTransactionsHook(
    protocol,
    tokenId,
    tokenAddress,
  );

  const { allTransactions } = useMemo(() => {
    let result = [];
    transactions.forEach(item => {
      const temp = nftTransactions.some(x => x.transactionHash === item.transactionHash || x.event === item.event);
      if (!temp) {
        result.push(item)
      }
    });
    result = [...result,...(nftTransactions || [])];
    const allTransactions = result.sort((a,b) => DateUtility.convertDateToUnix(b.transactionDate) - DateUtility.convertDateToUnix(a.transactionDate));

    let creatorAddress = ''
    let uniqueUserAddresses = [];
    allTransactions.forEach(item => {
      if (item.isMinted && !creatorAddress) {
        creatorAddress = item.to
      }
      uniqueUserAddresses.push(item.to);
      if (!item.isMinted) {
        uniqueUserAddresses.push(item.from)
      }
    });

    return { allTransactions }
  },[nftTransactions,transactions])

  const { data: paymentToken } = GetPaymentTokenHook(
    marketplaceData?.signedOrder?.erc20Token,
    protocol
  );

  const { data: offers,refreshData: refreshOffers,loading: offersLoading,setData: setOffersData } = GetOffersByTokenHook(
    protocol,
    blockchain.connectedAccountAddress,
    tokenAddress,
    tokenId,
    marketplaceData?._id
  );

  const sortedOffer = useMemo(
    () =>
      offers.sort((a,b) => {
        return b.amount - a.amount;
      }),
    [offers]
  );

  const currentBid = useMemo(() => {
    if (sortedOffer[0]) {
      return ({ currentBid: weiToCurrency(null,sortedOffer[0].amount),dollarPrice: sortedOffer[0].dollarPrice })
    } else {
      return null
    }
  },[sortedOffer]);

  const { isOwner,ownerAddress } = useMemo(() => {
    const isOwner = blockchain?.connectedAccountAddress &&
      (owners.some(x => x.owner_of.toLowerCase() === blockchain.connectedAccountAddress.toLowerCase()))

    const ownerAddress = (owners.length > 0 ? owners[0].owner_of : '').toLowerCase()

    return { isOwner,ownerAddress }
  },[owners,blockchain.connectedAccountAddress])

  const cancelListingHandler = (id) => {
    updateMarketplace({
      variables: {
        payload: {
          _id: id,
          isActive: false,
        },
      }
    }).then((data) => {
      const resData = data.data.updateMarketplaceNft;
      AddNewTransaction({
        variables: {
          payload: {
            amount: resData.signedOrder.erc20TokenAmount,
            blockNumber: 0,
            event: "Canceled",
            from: resData?.walletAddress?.toLowerCase(),
            paymentToken: resData.paymentToken,
            marketplaceId: resData?._id,
            nftId: resData?.nft_id,
            to: "0x0000000000000000000000000000000000000000",
            transactionHash:
              "0x0000000000000000000000000000000000000000000000000000000000000000",
            userId: blockchain?.userId,
            createdAt: new Date(),
          },
        },
        onCompleted: async () => {
          refreshMarketplaceData();
          userNftDetailsRefresh()
        },
      });
    });
  };

  const handleCreateOrder = async (listingData) => {
    // getNft({
    //   variables: {
    //     filters: {
    //       token_address: listingData.contractAddress,
    //       token_id: listingData.tokenId,
    //     },
    //   },
    // }).then((res) => {
    if (currNftData) {
      const nft_id = currNftData._id;
      createMarketplace({
        variables: {
          payload: prepareMarketplaceInput(listingData,nft_id),
        },
      }).then((marketplaceData) => {
        const data = marketplaceData.data.createMarketplaceNft;

        AddNewTransaction({
          variables: {
            payload: {
              marketplaceId: data._id,
              nftId: data.nft_id,
              event: "Listed",
              transactionHash:
                "0x0000000000000000000000000000000000000000000000000000000000000000",
              amount: listingData.signedOrder.erc20TokenAmount,
              paymentToken: listingData.paymentToken,
              blockNumber: 0,
              to: data?.contractAddress,
              from: blockchain.connectedAccountAddress,
              userId: blockchain.userId,
              createdAt: new Date(),
            },
          },
        });
        refreshMarketplaceData();
        userNftDetailsRefresh()
      });
    } else {
      createNft({
        variables: {
          payload: {
            ...listingData.nft,
          },
        },
        onCompleted: async (data) => {
          const nft_id = data.createNft._id;
          createMarketplace({
            variables: {
              payload: prepareMarketplaceInput(listingData,nft_id),
            },
          }).then((marketplaceData) => {
            const data = marketplaceData.data.createMarketplaceNft;
            AddNewTransaction({
              variables: {
                payload: {
                  marketplaceId: data._id,
                  nftId: data.nft_id,
                  event: "Listed",
                  transactionHash:
                    "0x0000000000000000000000000000000000000000000000000000000000000000",
                  amount: listingData.signedOrder.erc20TokenAmount,
                  paymentToken: listingData.paymentToken,
                  blockNumber: 0,
                  to: data?.contractAddress,
                  from: blockchain.connectedAccountAddress,
                  userId: blockchain.userId,
                  createdAt: new Date(),
                },
              },

            });
            refreshMarketplaceData();
            userNftDetailsRefresh()
          });
        },
      });
    }
    // });
  };

  const handleCreateOffer = async (offerData) => {
    createOffer({
      variables: {
        payload: offerData,
      },
    }).then((offer) => {
      updateMarketplace({
        variables: {
          payload: {
            _id: offerData.marketplace_id,
            offer_price: offerData.offer_price,
          },
        },
        onCompleted: async (data) => { },
      }).then((res) => {
        refreshMarketplaceData();
        refreshOffers();
        userNftDetailsRefresh()
      });
    });
  };

  const handleCancelOffer = async (id) => {
    updateOffer({
      variables: {
        payload: {
          _id: id,
          status: OfferStatusType.Canceled,
        },
      },
    }).then(() => {
      refreshOffers();
      userNftDetailsRefresh()
    });
  };

  const handleAcceptOffer = async ({ id,marketplaceId,listType,account,from: fixedFillFrom },fillTxReceipt) => {
    if (listType === "auction") {
      updateOffer({
        variables: {
          payload: {
            _id: id,
            status: OfferStatusType.Filled,
          },
        },
      }).then((offer) => {
        updateMarketplace({
          variables: {
            payload: {
              _id: marketplaceId,
              sold: true,
              isActive: false,
              walletAddress: blockchain.connectedAccountAddress,
            },
          },
          onCompleted: async (data) => {
            const nftData = data.updateMarketplaceNft;
            const offerData = offer.data.updateOffer;

            AddNewTransaction({
              variables: {
                payload: {
                  amount: nftData?.offer_price,
                  blockNumber: fillTxReceipt?.blockNumber,
                  event: "Sold",
                  from: nftData?.walletAddress,
                  // amount: nftData.signedOrder.erc20TokenAmount,
                  paymentToken: nftData.paymentToken,
                  marketplaceId: nftData?._id,
                  nftId: nftData?.nft_id,
                  to: offerData.signedOrder.maker,
                  transactionHash: fillTxReceipt?.transactionHash,
                  userId: blockchain?.userId,
                  createdAt: new Date(),
                },
              },
              onCompleted: async () => {
                refreshMarketplaceData();
                refreshOffers();
                userNftDetailsRefresh()
              },
            });
          },
        });
      });
    } else {
      updateMarketplace({
        variables: {
          payload: {
            _id: marketplaceId,
            sold: true,
            isActive: false,
            walletAddress: blockchain.connectedAccountAddress,
          },
        },
        onCompleted: async (data) => {
          const nftData = data.updateMarketplaceNft;
          // const offerData = offer.data.updateOffer;

          AddNewTransaction({
            variables: {
              payload: {
                amount: nftData?.offer_price,
                blockNumber: fillTxReceipt?.blockNumber,
                event: "Sold",
                from: fixedFillFrom,
                // amount: nftData.signedOrder.erc20TokenAmount,
                paymentToken: nftData.paymentToken,
                marketplaceId: nftData?._id,
                nftId: nftData?.nft_id,
                to: account,
                transactionHash: fillTxReceipt?.transactionHash,
                userId: blockchain?.userId,
                createdAt: new Date(),
              },
            },
            onCompleted: async () => {
              refreshMarketplaceData();
              setOffersData([])
              userNftDetailsRefresh()
            },
          });
        },
      });
    }

  };

  return (
    <>
      <DocumentTitle title={`${nftDetails?.name || "Details"} - NFT Auctions`} />
      {loading ? (
        <LoaderWrapper>
          <CircularProgress />
        </LoaderWrapper>
      ) : (
        <>
          <NftSingleDetail
            blockchain={blockchain}
            nftDetails={nftDetails}
            handleAcceptOffer={handleAcceptOffer}
            handleCreateOrder={handleCreateOrder}
            marketplaceData={marketplaceData}
            paymentToken={paymentToken}
            isOwner={isOwner}
            ownerAddress={ownerAddress}
            onCancelListing={cancelListingHandler}
            onOfferCreate={handleCreateOffer}
            currentBid={currentBid}
            offersLoading={offersLoading}
            canTakeAction={canTakeAction}
            protocol={protocol}
            connectWallet={toggleWalletConnect}
          />
          <NftAuctionDetail
            onCancelOffer={handleCancelOffer}
            onAcceptOffer={handleAcceptOffer}
            offers={sortedOffer}
            nftDetails={nftDetails}
            isOwner={isOwner}
            blockchain={blockchain}
            marketplaceData={marketplaceData}
            setLoader={setLoader}
            loader={loader}
            transactions={allTransactions}
            protocol={protocol}
          />
        </>
      )}
    </>
  );
};

export default NftDetail;
