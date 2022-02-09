import { Contract, WalletConnection } from "near-api-js"
import { ContractMethods } from "near-api-js/lib/contract"
import { IContractCall } from "./interfaces"
import * as env from "../../env"

const PunktContractOptions: ContractMethods = {
    viewMethods: ["ft_balance_of"],
    changeMethods: []
}

export type PunktContract = Contract & {
    ft_balance_of? : (args: any) => string,
}

export { PunktContractOptions }

export const getPunktContract = (walletConnection: WalletConnection): PunktContract => {
    const contract: PunktContract = new Contract(
        walletConnection.account(),
        env.PUNKT_CONTRACT,
        PunktContractOptions)
    
    return contract
}