export interface Network {
	id: number;
	name: string;
	symbol: string;
	icon: string;
	tokens: Token[];
}
export interface Token {
	id: string;
	symbol: string;
	name: string;
	icon: string;
	decimals: number;
	address: string;
}
export interface BridgeFormData {
	sourceChain: Network;
	destinationChain: Network;
	amount: string;
	recipientAddress: string;
}
