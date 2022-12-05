import { useEffect,useState } from "react";
import { NFTService } from '../service'
import { CommonConstant,Protocols,ErrorConstant,CommonUtility,ContractUtility } from "../common";


const binopolyConvertor = async item => {
  try {
    let tokenData
    if (item.token_uri.startsWith('http')) {
      tokenData = await NFTService.metadataLink(item.token_uri)
    } else {
      tokenData = JSON.parse(
        item.token_uri.replace('data:application/json,',''),
      )
    }
    return {
      name: tokenData?.name,
      image_preview_url: (tokenData?.image || '').replace(
        'ipfs://',
        'https://ipfs.io/ipfs/',
      ),
      description: tokenData?.description,
      token_id: item.token_id,
      asset_contract: {
        address: item.token_address,
        name: item.name,
        schema_name: item.contract_type,
      },
      id: `${item.token_address}-${item.token_id}`,
      extraProps: tokenData.properties,
      permalink: tokenData?.external_url,
    }
  } catch (error) {
    return {
      token_id: item.token_id,
      asset_contract: {
        address: item.token_address,
        name: item.name,
        schema_name: item.contract_type,
      },
      id: `${item.token_address}-${item.token_id}`,
    }
  }
}
const moralisToOpenSea = async (item,protocol) => {
  if (!item.metadata && item.token_uri) {
    const t = await binopolyConvertor(item)
    return t
  }
  let metadata = item.metadata ? JSON.parse(item.metadata) : {}

  if (metadata?.nft?.id) {
    metadata = metadata?.nft
  }

  const t = {
    name: metadata?.name,
    image_preview_url: (
      metadata?.image_url ||
      metadata?.image ||
      ''
    ).replace('ipfs://','https://ipfs.io/ipfs/'),
    description: metadata?.description,
    token_id: item.token_id,
    traits: metadata?.attributes || [],

    asset_contract: {
      address: item.token_address,
      name: item.name,
      schema_name: item.contract_type,
    },
    owner: {
      address: item.owner_of,
    },
    id: `${item.token_address}-${item.token_id}`,
    protocol,
    // permalink :
  }
  return t
}

export const InventoryNft = (address,protocol) => {
  const [nfts,setNFTs] = useState([])

  const [error,setError] = useState();
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const openseaNFT = async filter => {
      const result = await NFTService.getNFTs({
        owner: address,
        ...filter,
      })
      return result.assets.map(item => ({
        ...item,
        protocol: Protocols.ethereum.name,
      }))
    }

    const moralisFetchData = async protocol => {
      const result = await NFTService.moralisNFTs(address,{
        chain: ContractUtility.getMoralisNetwork(protocol),
        format: 'decimal',
      })
      const tempPromises = (result.result || []).map(item =>
        moralisToOpenSea(item,protocol))
      const tempResult = await Promise.all(tempPromises)
      return tempResult
    }

    const loadNFT = async (filter,prevData,protocol) => {
      let temp = []
      try {
        setLoading(true)
        let result = []
        switch (protocol) {
          case Protocols.ethereum.name:
            result = await openseaNFT(filter)
            break
          case Protocols.polygon.name:
          case Protocols.bsc.name:
            result = await moralisFetchData(protocol)
            break
          default:
            break
        }
        temp = prevData.concat(result || [])
        if ((result || []).length === filter.limit) {
          await CommonUtility.timeoutPromise(1001)
          loadNFT(
            {
              ...filter,
              offset: filter.offset + filter.limit,
            },
            temp,
            protocol,
          )
        } else {
          setNFTs(temp)
          setLoading(false)
        }
      } catch (err) {
        if (err.status === 429) {
          loadNFT(
            {
              ...filter,
            },
            temp,
          )
        } else {
          setLoading(false)
        }
      }
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        await loadNFT(
          {
            offset: 0,
            limit: 48,
            order_direction: 'desc',
          },
          [],
          protocol,
        )
      } catch {
        setLoading(false)
        setError(ErrorConstant.default)
      }
    }

    if (address) {
      fetchData()
    } else {
      setNFTs([])
    }
  },[address])

  return { userAllNFT: nfts,error,loading };
};

export const NFTDetailsHook = (tokenAddress,tokenId,protocol) => {
  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const [refresh,setRefresh] = useState(0);
  const [owners,setOwners] = useState([]);

  const fetchOwners = async () => {
    try {
      const response = await NFTService.moralisNFTOwners(
        tokenAddress,
        tokenId,
        {
          chain: ContractUtility.getMoralisNetwork(protocol),
          format: 'decimal',
        },
      )
      setOwners(response?.result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await NFTService.nftDetails(
          tokenAddress,
          tokenId,
        )

        if (result.owner?.address === CommonConstant.nullAddress && (result.top_ownerships || []).length > 0) {
          result.owner = { ...result.top_ownerships[result.top_ownerships.length - 1].owner }
        }
        setData({
          ...result,
          protocol,
        })
        fetchOwners()
      } catch (error) {
        console.log(error)
        if (error?.status === 404) {
          moralisFetchData()
        } else {
          setError(ErrorConstant.default)
        }
      } finally {
        setLoading(false)
      }
    }
    const moralisFetchData = async () => {
      try {
        setLoading(true)
        const result = await NFTService.moralisByTokenAddress(
          tokenAddress,
          tokenId,
          {
            chain: ContractUtility.getMoralisNetwork(protocol),
            format: 'decimal',
          },
        )
        const temp = await moralisToOpenSea(result,protocol)
        setData(temp)
        fetchOwners()
      } catch (error) {
        console.log(error)
        setError(ErrorConstant.default)
      } finally {
        setLoading(false)
      }
    }

    if (protocol && tokenId && tokenAddress) {
      switch (protocol) {
        case Protocols.ethereum.name:
          fetchData()
          break
        case Protocols.polygon.name:
        case Protocols.bsc.name:
          moralisFetchData()
          break

        default:
          break
      }
    }
  },[protocol,tokenAddress,tokenId,refresh])

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return { data,loading,error,refreshData,owners }
}
