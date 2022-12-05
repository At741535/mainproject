const url = process.env.REACT_APP_API_PATH
const moralisAPI = process.env.REACT_APP_MORALIS_API_PATH
const openSeaAPI = process.env.REACT_APP_OPENSEA_API_PATH
const hologenetixAPI = process.env.REACT_APP_HOLOGENETIX_API_PATH
const cmcAPI=process.env.REACT_APP_CMC_API_PATH

export const APIPath = {
    server: url,
    basePath: url?.replace(new RegExp('/api$'),''),
    openSeaAPI,
    moralisAPI,
    cmcAPI,
    hologenetixAPI,
    twitter: "https://twitter.com",
    // Config
    config: 'totem/config',

    // User
    users: 'users',
    userByAddress: 'users/by-address',
    userFirebase: 'users/fcm',
    userByAddresses: 'users/by-addresses',
    toggleFollow: 'users/toggle-follow',
    toggleFriends: 'users/toggle-friends',
    userFollowings: 'users/followings',
    userFollowers: 'users/followers',
    userFriends: 'users/friends',
    userRecommended: 'users/recommended',
    userSettings: 'users/settings',
    me: 'users/me',
    userItems: 'user-items',
    userItemsBulkSave: 'user-items/bulk-save',
    tokenPrice: 'nft/price',
    tokenQuoteLatest: 'nft/quote-latest',
    transactions: 'totem/transactions',
    leaderboard: 'totem/leaderboard',

    // mission
    missions: 'user-missions',
    myMissions: 'user-missions/my',
    missionMetaData: 'user-missions/metadata',
    missionRewards: 'user-missions/token-rewards',
    missionClaim: 'user-missions/claim-mission',

    // auth
    authInit: 'auth/init',
    login: 'auth/login',

    // Token Metadata
    tokenMetadata: 'erc20/metadata',
    erc20: 'erc20',

    // OpenSea API Path
    assets: 'assets',
    asset: 'asset',

    // marketplace
    buyNft: 'marketplace/buy-nft',
    nftTransactions: 'nft-transactions',
    marketplace: "marketplace",
    marketplaceUserListing: 'marketplace/user-listing',
    marketplaceTrendingItems: 'marketplace/trending-items',
    marketplaceCancelListing: 'marketplace/cancel-listing',
    updateOrder: 'marketplace/update-order',
    reservedOrder: 'marketplace/reserved-order',
    nftViewed: 'nft/viewed',
    nftByCollectionSlug: 'nft/by-name',
    allNFTs: 'nft/all-items',

    // collection
    collection: 'collection',
    userCollections: 'collection/user-collections',
    collectionByName: 'collection/by-name',
    summary: 'collection/summary',

    userNFTs: 'user-nfts',
    userNFTsByUser: 'user-nfts/user',
    userNFTSave: 'user-nfts/save',

    // Announcements
    announcements: 'announcements',
    userFeeds: 'activities',
    friendsFeeds: 'activities/friends',

    // support
    support: 'support',

    // notification
    notification: 'db-notifications',

    // Upload Files
    getSignedURL: 'aws/requestUploadUrl',

    chartData:
        'https://api.coingecko.com/api/v3/coins/totem-earth-systems/market_chart',

    // Obtain Hologenetix whitelist  Check
    hologenetixWhiteList: "check",

    // search result
    searchResult: 'search',
    searchSummaryResult: 'search/details',

    // make-offer
    offers: "offers",
    offersByNft: "offers/nft",
    cancelOffer: "offers/cancel",
    fillOffer: "offers/fill-offer",
    // counter offer
    counterOffer: "offers/counter-offer",
}
