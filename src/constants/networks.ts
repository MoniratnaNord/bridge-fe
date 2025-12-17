// import { Network } from '../types/bridge';

// export const SUPPORTED_NETWORKS: Network[] = [
//   {
//     id: 1,
//     name: 'Ethereum',
//     symbol: 'ETH',
//     icon: '⟠',
//   },
//   {
//     id: 42161,
//     name: 'Arbitrum',
//     symbol: 'ARB',
//     icon: '🔷',
//   },
//   {
//     id: 137,
//     name: 'Polygon',
//     symbol: 'MATIC',
//     icon: '⬡',
//   },
//   {
//     id: 10,
//     name: 'Optimism',
//     symbol: 'OP',
//     icon: '🔴',
//   },
//   {
//     id: 8453,
//     name: 'Base',
//     symbol: 'BASE',
//     icon: '🔵',
//   },
// ];

// constants/networks.ts
import { Network } from "../types/bridge";

export const SUPPORTED_NETWORKS: Network[] = [
	{
		id: 80002,
		name: "Polygon",
		symbol: "",
		icon: "https://raw.githubusercontent.com/0xsquid/assets/main/images/webp128/chains/polygon.webp",
		tokens: [
			{
				id: "usdc",
				symbol: "USDC",
				name: "USD Coin",
				icon: "https://raw.githubusercontent.com/0xsquid/assets/main/images/migration/webp/42161_0xaf88d065e77c8cc2239327c5edb3a432268e5831.webp",
				decimals: 6,
				address: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582",
			},
		],
	},

	{
		id: 1440000,
		name: "XRPL",
		symbol: "XRP",
		icon: "https://raw.githubusercontent.com/0xsquid/assets/main/images/webp128/chains/xrpl.webp",
		tokens: [
			{
				id: "xrp",
				symbol: "XRP",
				name: "XRP",
				icon: "https://raw.githubusercontent.com/0xsquid/assets/main/images/migration/webp/xrpl-mainnet_xrp.webp",
				decimals: 18,
				address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
			},
		],
	},

	// {
	// 	id: 137,
	// 	name: "Polygon",
	// 	symbol: "MATIC",
	// 	icon: "⬡",
	// 	tokens: [
	// 		{
	// 			id: "matic",
	// 			symbol: "MATIC",
	// 			name: "Polygon",
	// 			icon: "⬡",
	// 			decimals: 18,
	// 		},
	// 		{
	// 			id: "usdc",
	// 			symbol: "USDC",
	// 			name: "USD Coin",
	// 			icon: "💵",
	// 			decimals: 6,
	// 		},
	// 		{
	// 			id: "usdt",
	// 			symbol: "USDT",
	// 			name: "Tether",
	// 			icon: "💲",
	// 			decimals: 6,
	// 		},
	// 	],
	// },

	// {
	// 	id: 10,
	// 	name: "Optimism",
	// 	symbol: "OP",
	// 	icon: "🔴",
	// 	tokens: [
	// 		{
	// 			id: "eth",
	// 			symbol: "ETH",
	// 			name: "Ethereum",
	// 			icon: "⟠",
	// 			decimals: 18,
	// 		},
	// 		{
	// 			id: "op",
	// 			symbol: "OP",
	// 			name: "Optimism",
	// 			icon: "🔴",
	// 			decimals: 18,
	// 		},
	// 		{
	// 			id: "usdc",
	// 			symbol: "USDC",
	// 			name: "USD Coin",
	// 			icon: "💵",
	// 			decimals: 6,
	// 		},
	// 	],
	// },

	// {
	// 	id: 8453,
	// 	name: "Base",
	// 	symbol: "BASE",
	// 	icon: "🔵",
	// 	tokens: [
	// 		{
	// 			id: "eth",
	// 			symbol: "ETH",
	// 			name: "Ethereum",
	// 			icon: "⟠",
	// 			decimals: 18,
	// 		},
	// 		{
	// 			id: "usdc",
	// 			symbol: "USDC",
	// 			name: "USD Coin",
	// 			icon: "💵",
	// 			decimals: 6,
	// 		},
	// 	],
	// },
];
