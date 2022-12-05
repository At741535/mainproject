
import { useEffect,useState } from 'react'
import {
    CommonUtility,ContractUtility,CommonConstant,ErrorConstant
} from '../common';
import { MarketplaceService } from '../service'
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";

import { GetNftByContractAndTokenId } from "../graphQl/Nfts/NftQueries";
import { GetTransactions } from "../graphQl/Transactions/transactionsQueries";
import { GetListedNftByContractAndToken } from "../graphQl/Marketplace/MarkertplaceNftQueries";

export const GetMarketplaceListingHook = () => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await MarketplaceService.get()
                setData(result)
            } catch {
                setError(ErrorConstant.default)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    },[])

    return { data,loading,error }
}


export const GetUserListingHook = (address) => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await MarketplaceService.userListing(address)
                setData(result)
            } catch {
                setError(ErrorConstant.default)
            } finally {
                setLoading(false)
            }
        }

        if (address) {
            fetchData()
        }

    },[address])

    return { data,loading,error }
}

export const GetNFTTransactionsHook = (address) => {

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const [hasMore,setHasMore] = useState(true);
    const [filter,setFilter] = useState({
        page: 0,
        offset: CommonConstant.defaultPageSize,
    })

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await MarketplaceService.nftTransactions({
                ...filter,
                walletAddress: address,
            });
            if (filter.page > 0) {
                setData(data.concat((result || [])));
            } else {
                setData(result || [])
            }
            setHasMore((result || []).length === filter.offset);
        } catch (error) {
            setError(ErrorConstant.default);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (filter && address) {
            fetchData();
        }
    },[filter,address]);

    const refreshData = () => {
        fetchData();
    }

    const pageChanged = () => {
        const temp = {
            ...filter,
            page: filter.page + 1,
        }
        setFilter({ ...temp });
    }

    return { data,loading,error,pageChanged,hasMore,refreshData };
}

export const GetMarketplaceTokensHook = (network) => {

    const [data,setData] = useState(null);

    const selectNetworkTokens = () => {
        const token = ContractUtility.marketplacePaymentList(network)
        setData(token)
    }

    useEffect(() => {
        if (network) {
            selectNetworkTokens();
        }
    },[network]);

    return { data };
}

export const GetMarketplaceNetworkHook = () => {

    const [data,setData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            setData([...ContractUtility.blockchainList])
        }
        fetchData();
    },[]);

    return { data };
}

export const GetMarketplaceByTokenHook = (protocol,tokenAddress,tokenId) => {

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const [refresh,setRefresh] = useState(0);
    const { connectedAccountAddress } = useSelector((state) => state?.blockchain);
    const [getListedNftData] = useLazyQuery(GetListedNftByContractAndToken,{
        fetchPolicy: "network-only",
    });

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await getListedNftData({
                variables: { filters: { contractAddress: tokenAddress,tokenId: tokenId,isActive: true,sold: false } },
            })
            const result = response.data.getByContractAndToken[0];
            if (connectedAccountAddress && result?.reserved) {
                const reservedOrder = result?.reservedSignedOrder.find(
                    item =>
                        item?.signedOrder.taker === connectedAccountAddress.toLowerCase(),
                )
                if (reservedOrder) {
                    result.signedOrder =
                        reservedOrder?.signedOrder || result.signedOrder
                    result.offerId = reservedOrder.offerId
                }
            }
            setData(result)
        } catch (error) {
            setError(ErrorConstant.default)
            setData(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (tokenAddress && tokenId && protocol) {
            fetchData();
        }
    },[tokenAddress,tokenId,protocol,refresh,connectedAccountAddress]);

    const refreshData = () => {
        setData(null)
        setRefresh(Math.random())
    }
    // console.log("data", data)
    return { data,loading,error,refreshData,setData };
}

export const GetPaymentTokenHook = (tokenAddress,network) => {

    const [data,setData] = useState(null);

    const selectNetworkTokens = () => {
        const token = ContractUtility.getPaymentToken((tokenAddress).toLowerCase(),network)
        setData(token)
    }
    useEffect(() => {
        if (tokenAddress && network) {
            selectNetworkTokens();
        }
    },[tokenAddress,network]);

    return { data };
}


export const GetUserNFTDetailsHook = (protocol,tokenAddress,tokenId) => {
    const [getNft] = useLazyQuery(GetNftByContractAndTokenId,{
        fetchPolicy: "network-only", // Doesn't check cache before making a network request
    });

    const [getTransactionsByNftId] = useLazyQuery(GetTransactions,{
        fetchPolicy: "network-only", // Doesn't check cache before making a network request
    });

    const [transactions,setTransactions] = useState([]);
    const [nft,setNft] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const [refresh,setRefresh] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { NftByContractAndToken: apiNft } = {} } = await getNft({
                variables: {
                    filters: {
                        token_address: tokenAddress,
                        token_id: tokenId,
                        protocol
                    },
                }
            })
            if ((apiNft || []).length > 0) {
                //console.log("apiNft",apiNft);
                setNft(apiNft[0])
                await loadTransactions(apiNft[0]._id)
            }
        }
        const loadTransactions = async (nftId) => {
            try {
                setLoading(true);
                const result = await getTransactionsByNftId({
                    variables: {
                        filters: {
                            nftId,
                        },
                    }
                });

                const temp = result?.data?.NftTransactions.map(item => ({
                    _id: item._id,
                    transactionHash: item.transactionHash,
                    to: item.to,
                    from: item.from,
                    amount: item.amount,
                    transactionDate: item.createdAt,
                    event: item.event,
                    isMinted: item.event === "Minted",
                    paymentToken: item.paymentToken && item.event !== "Minted" ?
                        ContractUtility.getPaymentToken(item.paymentToken.toLowerCase(),protocol) : "",
                    usdPrice: item.usdPrice || 0,
                }))

                const tempPromise = temp.map(async (item) => {
                    if (item?.paymentToken) {
                        const amountInDecimal = (item.amount / 10 ** item.paymentToken.decimals)
                        return {
                            ...item,
                            dollarPrice: CommonUtility.currencyFormat(item.usdPrice * amountInDecimal),
                            amountInDecimal,
                        }
                    }
                    return item
                });
                const tempResult = await Promise.all(tempPromise);
                setTransactions(tempResult);
            } catch (error) {
                setError(ErrorConstant.default);
            } finally {
                setLoading(false);
            }
        }

        if (protocol && tokenAddress && tokenId) {
            fetchData();
        }
    },[protocol,tokenAddress,tokenId,refresh]);

    const refreshData = () => {
        setRefresh(Math.random())
    }

    return { loading,error,nft,transactions,refreshData };
}


