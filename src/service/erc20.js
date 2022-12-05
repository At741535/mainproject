import { CommonConstant } from '../common'
import { ERC20_ABI } from '../contracts/erc20_abi'

class ERC20 {

    async isApprovedForAll(contract,account,contractAddress) {
        try {
            const receipt = await contract.methods
                .isApprovedForAll(account,contractAddress)
                .call()
            return receipt
        } catch (error) {
            return error
        }
    }

    async approve(web3,contractAddress,from,tokenAddress,requiredBalance) {
        const contractErc20 = new web3.eth.Contract(ERC20_ABI,tokenAddress)
        const decimals = +(await contractErc20.methods.decimals().call())
        const allowance = await contractErc20.methods.allowance(from,contractAddress).call()
        if (allowance < (requiredBalance * (10 ** decimals))) {
            const tempAmount = (50 * 2222) * (10 ** decimals)
            const amount = await web3.utils.toWei(
                tempAmount.toLocaleString("fullwide",{ useGrouping: false }),
                'ether',
            )
            await contractErc20.methods.approve(contractAddress,amount).send({ from })
        }
    }

    async approveWithout(web3,contractAddress,from,tokenAddress) {
        const contractErc20 = new web3.eth.Contract(ERC20_ABI,tokenAddress)
        const tempAmount = (50 * 2222) * (10 ** 18)
        const amount = await web3.utils.toWei(
            tempAmount.toLocaleString("fullwide",{ useGrouping: false }),
            'ether',
        )
        await contractErc20.methods.approve(contractAddress,amount).send({ from })
    }

    async tokenBalance(web3,tokenAddress,account) {
        const contractErc20 = new web3.eth.Contract(ERC20_ABI,tokenAddress)
        const balance = await contractErc20.methods.balanceOf(account).call()
        const decimals = +(await contractErc20.methods.decimals().call())
        return balance / 10 ** decimals
    }

    async balance(web3,tokenAddress,account) {
        const contractErc20 = new web3.eth.Contract(ERC20_ABI,tokenAddress)
        const balance = await contractErc20.methods.balanceOf(account).call()
        return +balance;
    }


    async getTokenBalance(Web3,tokenAddress,account) {
        const web3 = new Web3(window.ethereum);
        if (tokenAddress === CommonConstant.nativeAddress) {
            const balance = await web3.eth.getBalance(account)
            return balance / (10 ** 18)
        } else {
            return await ERC20Service.tokenBalance(
                web3,
                tokenAddress,
                account,
            )
        }
    }

    async decimals(web3,tokenAddress) {
        const contractErc20 = new web3.eth.Contract(ERC20_ABI,tokenAddress)
        const balance = await contractErc20.methods.decimals().call()
        return +balance;
    }
}

const ERC20Service = new ERC20()
Object.freeze(ERC20Service)
export { ERC20Service }
