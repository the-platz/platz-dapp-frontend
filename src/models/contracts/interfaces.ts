import BN from 'bn.js';

export interface IContractArgs {}

export interface ChangeMethodOptions {
    meta: string;
    callbackUrl: string;
    args: object;
    gas?: BN;
    amount?: BN;
}

export type IChangeMethodFn = (changeMethodOptions: ChangeMethodOptions) => void

export type IContractCall = (args?: IContractArgs, gas?: string, deposit?: string) => void