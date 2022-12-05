import { useEffect,useState } from 'react'
import { NFTService } from '../service/nft'
import { ContractUtility,CommonConstant,ErrorConstant } from "../common";
import { useLazyQuery } from "@apollo/client";
import { GetListedNft } from "../graphQl/Marketplace/MarkertplaceNftQueries";

export const GetListedNFTs = (walletAddress,filters) => {

    const [nfts] = useLazyQuery(GetListedNft,{
        fetchPolicy: "network-only",
    });

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const [refresh,setRefresh] = useState(0);

    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await nfts({
                variables: {
                    filters: {
                        walletAddress: walletAddress,
                        protocol: ContractUtility.getCurrentNetwork(),
                        ...filters
                    }
                }
            })
            setData([...result?.data?.ListedNfts])
        } catch (error) {
            console.log(error)
            setError(ErrorConstant.default)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (nfts) {
            fetchData()
        }
    },[refresh,walletAddress,filters])

    const refreshData = () => {
        setRefresh(Math.random())
    }

    return { data,loading,error,refreshData }
}

export const NFTTransactionsHook = (protocol,tokenId,tokenAddress) => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const [refresh,setRefresh] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await NFTService.moralistTransactions(
                    tokenAddress,
                    tokenId,
                    {
                        chain: ContractUtility.getMoralisNetwork(protocol),
                        format: 'decimal',
                    },
                )
                const transactions = result.result.map(item => ({
                    transactionHash: item.transaction_hash,
                    _id: Math.random(),
                    to: item.to_address,
                    from: item.from_address,
                    paymentToken: '',
                    amount: item.value,
                    transactionDate: item.block_timestamp,
                    event: item.from_address === CommonConstant.nullAddress ? "Minted" : "Transfer",
                    isMinted: item.from_address === CommonConstant.nullAddress,
                }))
                let temp = [];
                if (result.page === 0) {
                    temp = transactions
                } else {
                    temp = [...data,...transactions]
                }
                // if (result.total > temp.length) {
                //     setCursor(result.cursor)
                // } else {
                //     setCursor('')
                // }
                setData([...temp])
            } catch (error) {
                console.log(error)
                setError(ErrorConstant.default)
            } finally {
                setLoading(false)
            }
        }
        if (protocol && tokenId && tokenAddress) {
            fetchData()
        }
    },[tokenId,tokenAddress,protocol,refresh])

    const refreshData = () => {
        setRefresh(Math.random())
    }

    return { data,loading,error,refreshData }
}
