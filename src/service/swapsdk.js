import { CommonConstant,OfferStatusType,SwapSdk,calculateFee } from '../common';
import { NftSwapV4 } from "@traderxyz/nft-swap-sdk";
import Web3 from "web3";
import { ethers } from "ethers";
class SwapSdkClass {
    async createOrder(data,blockchain,createNewOrder,setProgressState) {

        const assetsToSwapMaker = [data.MAKER_ASSET]
        const assetsToSwapTaker = [data.TAKER_ASSET]
        const swapSdk = await SwapSdk(blockchain,Web3,NftSwapV4,ethers);
        const walletAddressUserA = await swapSdk.signer.getAddress()

        // approving makerAsset to swapSdk
        try {
            if (swapSdk) {
                setProgressState(prev => {
                    const state = { ...prev }
                    state["progress"] = true
                    state["failed"] = false
                    state["success"] = false
                    return state
                })
                const approvalStatusForUserA = await swapSdk.nftSwapSdk.loadApprovalStatus(
                    assetsToSwapMaker[0],
                    walletAddressUserA,
                )
                // If we do need to approve makers assets for swapping, do that
                if (!approvalStatusForUserA.contractApproved) {
                    const approvalTx = await swapSdk.nftSwapSdk.approveTokenOrNftByAsset(
                        assetsToSwapMaker[0],
                        walletAddressUserA,
                    )
                    await approvalTx.wait()
                }
                const order = swapSdk.nftSwapSdk.buildOrder(
                    assetsToSwapMaker[0],
                    assetsToSwapTaker[0],
                    walletAddressUserA,
                    {
                        expiry: data.expiry, // order will be expired after given time
                        taker: data.reserveBuyer || CommonConstant.nullAddress
                    }
                )

                // Signing the order using the maker's wallet address
                const signedOrder = await swapSdk.nftSwapSdk.signOrder(
                    order,
                    walletAddressUserA,
                    swapSdk.signer,
                )


                if (!data.marketplace) {
                    const obj = {
                        walletAddress: walletAddressUserA,
                        creatorAddress: data.creatorAddress,
                        contractAddress: data.contractAddress,
                        supply: 1,
                        tokenId: data.tokenId,
                        signedOrder: !data.reserveBuyer && signedOrder,
                        sold: false,
                        paymentToken: data.paymentToken,
                        nft: data.nft,
                        transaction: data.transaction,
                        protocol: data.protocol,
                        reservedSignedOrder: data.reserveBuyer && [
                            { offerId: data.offerId,signedOrder },
                        ],
                        reserved: data.reserved || false,
                        listType: data.listType,
                        auctionType: data.auctionType || false,
                        isActive: true,
                        offer_price: data.offer_price
                    }
                    //return await MarketplaceService.add(obj)
                    await createNewOrder(obj)
                    setProgressState(prev => ({ ...prev,success: true,progress: false }))
                }
            }
        } catch (e) {
            setProgressState(prev => ({ ...prev,success: false,progress: false,failed: true }))
        }

        // throw new Error("Error in load SwapSDK")
    }

    async createOffer(data,blockchain,onOfferCreate,setProgressState) {
        const swapSdk = await SwapSdk(blockchain,Web3,NftSwapV4,ethers);
        const { actualPirce,fee } = calculateFee(data.price)
        console.log("data.schema_name", data.schema_name);
        const TAKER_ASSET = {
          tokenAddress: data.tokenAddress,
          tokenId: data.tokenId,
          type: data.schema_name,
          amount: "1",
        };
        const MAKER_ASSET = {
            tokenAddress: data.paymentToken,
            amount: Web3.utils.toWei(
                actualPirce.toLocaleString("fullwide",{ useGrouping: false }),
                "ether"
            ),
            type: 'ERC20',
        }

        const walletAddressUserA = await swapSdk.signer.getAddress()
        const assetsToSwapMaker = [MAKER_ASSET]
        const assetsToSwapTaker = [TAKER_ASSET]
        // approving makerAsset to swapSdk
        try {
            if (swapSdk) {
                setProgressState(prev => {
                    const state = { ...prev }
                    state["progress"] = true
                    state["failed"] = false
                    state["success"] = false
                    return state
                })
                const approvalStatusForUserA = await swapSdk.nftSwapSdk.loadApprovalStatus(
                    assetsToSwapMaker[0],
                    walletAddressUserA,
                )
                // If we do need to approve makers assets for swapping, do that
                if (!approvalStatusForUserA.contractApproved) {
                    const approvalTx = await swapSdk.nftSwapSdk.approveTokenOrNftByAsset(
                        assetsToSwapMaker[0],
                        walletAddressUserA,
                    )
                    await approvalTx.wait()
                }
                const order = swapSdk.nftSwapSdk.buildOrder(
                    assetsToSwapMaker[0],
                    assetsToSwapTaker[0],
                    walletAddressUserA,
                    {
                        expiry: data.expiryTime, // order will be expired after given time
                        fees: [
                            {
                                amount: Web3.utils.toWei(
                                    fee.toLocaleString("fullwide",{
                                        useGrouping: false,
                                    }),
                                    "ether"
                                ), //  fee
                                recipient: "0x2876c502a88D052E7AEeb21f074A655A73e68D65", // address
                            },
                        ],
                    },
                )

                // Signing the order using the maker's wallet address
                const direction = 1
                const signedOrder = await swapSdk.nftSwapSdk.signOrder(
                    order,
                    walletAddressUserA,
                    swapSdk.signer,
                    direction
                )
                if (signedOrder) {
                    let obj = {
                        signedOrder,
                        protocol: data.protocol,
                        nft_id: data.tokenId,
                        marketplace_id: data?.marketplace_id,
                        contractAddress: data?.tokenAddress,
                        status: OfferStatusType.Created,
                        offer_price: Web3.utils.toWei(
                            data.price.toLocaleString("fullwide",{ useGrouping: false }),
                            "ether"
                        )
                    }
                    await onOfferCreate(obj)
                    setProgressState(prev => ({ ...prev,success: true,progress: false }))
                }

            }
        } catch (e) {
            console.log(e)
            setProgressState(prev => ({ ...prev,success: false,progress: false,failed: true }))
        }
    }

    async fillOffer(data,blockchain,onOfferAccept,setProgressState) {
        try {
            const swapSdk = await SwapSdk(blockchain,Web3,NftSwapV4,ethers);
            if (swapSdk) {
                setProgressState(prev => {
                    const state = { ...prev }
                    state["progress"] = true
                    state["failed"] = false
                    state["success"] = false
                    return state
                })
            const TAKER_ASSET = {
                    tokenAddress: data.signedOrder.erc721Token || data.signedOrder.erc1155Token ,
                    tokenId: data.signedOrder.erc721TokenId || data.signedOrder.erc1155TokenId,
                    type: data.schema_name,
                    amount: '1',
                }
                const assetsToSwapTaker = [TAKER_ASSET]

                const approvalStatusForUserB =
                    await swapSdk.nftSwapSdk.loadApprovalStatus(
                        assetsToSwapTaker[0],
                        data.account,
                    )

                // If we do need to approve makers assets for swapping, do that
                if (!approvalStatusForUserB.contractApproved) {
                    const approvalTx =
                        await swapSdk.nftSwapSdk.approveTokenOrNftByAsset(
                            assetsToSwapTaker[0],
                            data.account,
                        )
                    await approvalTx.wait()
                }

                // Filling the order (Pass the signed order)
                const fillTx = await swapSdk.nftSwapSdk.fillSignedOrder(
                    data.signedOrder,
                )
                // Wait for the transaction receipt
                const fillTxReceipt = await swapSdk.nftSwapSdk.awaitTransactionHash(
                    fillTx.hash,
                )
                if (fillTxReceipt.status) {
                    setProgressState(prev => ({ ...prev,success: true,progress: false }))
                    onOfferAccept(data,fillTxReceipt);
                    return fillTxReceipt;
                }
                // throw new Error("Error in transactions")
            }
        } catch (e) {
            setProgressState(prev => ({ ...prev,success: false,progress: false,failed: true }))
        }

        throw new Error("Error in load SwapSDK")
    }

    async fillOrder(data,blockchain,onOfferAccept,setProgressState) {
        try {
            const swapSdk = await SwapSdk(blockchain,Web3,NftSwapV4,ethers);
            if (swapSdk) {
                setProgressState(prev => {
                    const state = { ...prev }
                    state["progress"] = true
                    state["failed"] = false
                    state["success"] = false
                    return state
                })
                const TAKER_ASSET = {
                    tokenAddress: data.signedOrder.erc721Token,
                    tokenId: data.signedOrder.erc721TokenId,
                    type: "ERC721",
                    amount: '1',
                }
                const assetsToSwapTaker = [TAKER_ASSET]

                const approvalStatusForUserB =
                    await swapSdk.nftSwapSdk.loadApprovalStatus(
                        assetsToSwapTaker[0],
                        data.account,
                    )

                // If we do need to approve makers assets for swapping, do that
                if (!approvalStatusForUserB.contractApproved) {
                    const approvalTx =
                        await swapSdk.nftSwapSdk.approveTokenOrNftByAsset(
                            assetsToSwapTaker[0],
                            data.account,
                        )
                    await approvalTx.wait()
                }

                // Filling the order (Pass the signed order)
                const fillTx = await swapSdk.nftSwapSdk.fillSignedOrder(
                    data.signedOrder,
                )
                // Wait for the transaction receipt
                const fillTxReceipt = await swapSdk.nftSwapSdk.awaitTransactionHash(
                    fillTx.hash,
                )
                if (fillTxReceipt.status) {
                    setProgressState(prev => ({ ...prev,success: true,progress: false }))
                    onOfferAccept(data,fillTxReceipt)
                    return fillTxReceipt.transactionHash;
                }
                // throw new Error("Error in transactions")
            }
        } catch (e) {
            setProgressState(prev => ({ ...prev,success: false,progress: false,failed: true }))
        }

        throw new Error("Error in load SwapSDK")
    }
}

const SwapSdkService = new SwapSdkClass()
Object.freeze(SwapSdkService)
export { SwapSdkService }