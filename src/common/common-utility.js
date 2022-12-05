import { Protocols } from './constants'

const queryString = require('query-string')

Number.prototype.noExponents = function () {
    var data = String(this).split(/[eE]/);
    if (data.length === 1) return data[0];

    var z = '',
        sign = this < 0 ? '-' : '',
        str = data[0].replace('.',''),
        mag = Number(data[1]) + 1;

    if (mag < 0) {
        z = sign + '0.';
        while (mag++) z += '0';
        return z + str.replace(/^\-/,'');
    }
    mag -= str.length;
    while (mag--) z += '0';
    return str + z;
}

export const AcceptFileType = {
    image: {
        'image/*': ['.jpeg','.png','.jpg','.gif'],
    },
    video: {
        'video/*': ['.mp4','.webm','.wav','.mp3','.ogg','.glb','.gltf','.mov'],
    },
    imageVideo: {
        'image/*': ['.jpeg','.png','.jpg','.gif','.mp4','.webm','.wav','.mov','.mp3','.ogg','.glb','.gltf'],
    },
}

export class CommonUtility {


    static currencyFormat(value,currency) {
        //console.log("________value_____",value);
        if (Number.isNaN(value || 0)) {
            return value
        }

        return new Intl.NumberFormat('en-US',{
            style: 'currency',
            currency: currency || 'USD',
        }).format(value || 0)
    }

    static numberCompact(value) {
        if (Number.isNaN(value || 0)) {
            return value
        }
        return new Intl.NumberFormat('en',{
            notation: 'compact',
        }).format(value || 0)
    }

    static isNotEmpty(item) {
        return (
            item !== undefined &&
            item !== null &&
            item !== '' &&
            item.length !== 0
        )
    }

    static truncateString(text,ellipsisString) {
        return (text || '').length > ellipsisString
            ? `${text.substring(0,ellipsisString)}...`
            : text
    }

    static numberWithCommas(x) {
        if (!x) return x;
        const parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
        return parts.join(".");
        // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
    }

    static objectToParams(obj) {
        const str = queryString.stringify(obj)
        return str
    }

    static toTitleCase(phrase) {
        return phrase
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    static timeoutPromise(ms) {
        return new Promise(resolve => setTimeout(resolve,ms))
    }

    static roundNumber(num,decimals = 6) {
        const t = 10 ** decimals
        let result = Math.round((num + Number.EPSILON) * t) / t
        if (num < 0) {
            result *= -1
        }
        return result
    }

    static addressConvertor(address) {
        if ((address || '').length < 10) {
            return address || ''
        }
        return `${address.slice(0,4)}...${address.slice(address.length - 6)}`
    }

    static symbolConvertor(symbol) {
        switch (symbol) {
            case "Cake-LP":
                return "CTZN/BUSD Cake-LP"
            case "UNI-V2":
                return "CTZN/USDC UNI-LP"
            default:
                return symbol
        }
    }

    static nameConvertor(name,protocol = Protocols.ethereum.name) {
        switch (name) {
            case "Pancake LPs":
                return "CTZN/BUSD Cake-LP"
            case "UNI-V2":
            case "Uniswap V2":
                return "$CTZN / ETH Uni-LP"
            case "Totem Earth Systems":
                return protocol === Protocols.ethereum.name ? "CTZN ERC Staking" : "CTZN BSC Staking"
            default:
                return name
        }
    }

    static toWei(decimals) {
        switch (decimals) {
            case "1":
                return "wei"
            case "3":
                return "Kwei"
            case "6":
                return "mwei"
            case "9":
                return "gwei"
            case "12":
                return "szabo"
            case "18":
                return "ether"
            case "21":
                return "kether"
            case "24":
                return "mether"
            case "27":
                return "gether"
            case "30":
                return "tether"
            default:
                return "ether"
        }
    }

    static currentTimeInSeconds = () => {
        return Math.floor(new Date().getTime() / 1000)
    }


    static isURLImageVideo = (url) => {
        const types = AcceptFileType.imageVideo['image/*']
        return types.some(x => url.includes(x))
    }

    static isURLVideo = (url) => {
        const types = AcceptFileType.video['video/*']
        return types.some(x => url.includes(x))
    }

    static isURLImage = (url) => {
        const types = AcceptFileType.image['image/*']
        return types.some(x => url.includes(x))
    }
}
