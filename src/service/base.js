import axios from 'axios'
import { CommonConstant,APIPath } from '../common'

const onSuccess = response => response.data

const onError = async error =>
    Promise.reject({
        error: error?.response?.data?.error || error?.response?.data,
        status: error?.response?.status,
    })

const request = async (options,isSecure) => {
    const headers = {}
    headers.app = 'demo'

    const client = axios.create({
        baseURL: APIPath.server,
        headers: { ...headers },
    })

    return client(options).then(onSuccess).catch(onError)
}

const uploadFiles = (url,data,headers) => {

    const client = axios({
        url,
        method: "PUT",
        headers: { ...headers },
        data,
    });

    return client
        .then(onSuccess)
        .catch(onError);
}

export class BaseService {
    static get(url,isSecure = true) {
        return request(
            {
                url,
                method: 'GET',
            },
            isSecure,
        )
    }

    static post(url,data,isSecure = true) {
        return request(
            {
                url,
                method: 'POST',
                data,
            },
            isSecure,
        )
    }

    static put(url,data,isSecure = true) {
        return request(
            {
                url,
                method: 'PUT',
                data,
            },
            isSecure,
        )
    }

    static moralisAPI(url,cursor) {
        const client = axios.create({
            baseURL: APIPath.moralisAPI,
        })
        return client({
            url,
            method: 'GET',
            headers: { accept: 'application/json','X-API-Key': process.env.REACT_APP_MORALIS_API_KEY || 'test' }
        })
            .then(onSuccess)
            .catch(onError)
    }

    static cmcAPI(url) {
        const client = axios.create({
            baseURL: APIPath.cmcAPI,
        })
        return client({
            url,
            method: 'GET',
            headers: { accept: 'application/json','X-CMC_PRO_API_KEY': process.env.REACT_APP_CMC_API_KEY }
        })
            .then(onSuccess)
            .catch(onError)
    }

    static openseaAPI(url) {
        const headers = {}

        if (!CommonConstant.isDevelopment) {
            headers['X-API-KEY'] = process.env.REACT_APP_OPENSEA_API_KEY
        }
        const client = axios.create({
            baseURL: APIPath.openSeaAPI,
            headers,
        })
        return client({
            url,
            method: 'GET',
        }).then(onSuccess).catch(onError)
    }

    static extenralAPICall(url) {
        const client = axios({
            url,
            method: 'GET',
            timeout: 1000 * 3,
        })
        return client.then(onSuccess).catch(onError)
    }

    static remove(url,isSecure = true) {
        return request(
            {
                url,
                method: 'DELETE',
            },
            isSecure,
        )
    }

    static upload = (url,data,header) => {
        return uploadFiles(url,data,header);
    }
}
