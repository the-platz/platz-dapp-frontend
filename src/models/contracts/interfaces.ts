import BN from 'bn.js'

export interface IContractArgs {}

// TODO: deprecated
export interface ChangeMethodOptions<T = object> {
	meta: string
	callbackUrl: string
	args: T
	gas?: BN
	amount?: BN
}

export type IChangeMethodFn<T = object> = (changeMethodOptions: ChangeMethodOptions<T>) => void

export type IViewMethodFn<I, O> = (x: I) => O

export type IContractCall = (
	args?: IContractArgs,
	gas?: string,
	deposit?: string
) => void
