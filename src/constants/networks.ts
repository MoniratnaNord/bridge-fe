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
		id: 137,
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
				address: import.meta.env.VITE_ERC_CONTRACT_ADDRESS,
			},
			{
				id: "euroTether",
				symbol: "Euro Tether",
				name: "Euro Tether",
				icon: "https://raw.githubusercontent.com/0xsquid/assets/main/images/migration/webp/42161_0xaf88d065e77c8cc2239327c5edb3a432268e5831.webp",
				decimals: 6,
				address: import.meta.env.VITE_ERC_CONTRACT_ADDRESS,
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
	{
		id: 8453,
		name: "Base",
		symbol: "BASE",
		icon: "https://imgs.search.brave.com/DLsSihMnvQhG2z_hTCl7hujsaIwjZdyqY2miPT3rKW0/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvZmI4Y2I5NTZl/OTBhMTdmZjc5ZDU4/YzNjYmU2YmJkZGM5/NzMzNTM3ZTc2NDJk/M2U1NmUzMjgxNzk5/NDUzYmFkOC93d3cu/YmFzZS5vcmcv",
		tokens: [
			{
				id: "usdc",
				symbol: "USDC",
				name: "USD Coin",
				icon: "https://raw.githubusercontent.com/0xsquid/assets/main/images/migration/webp/42161_0xaf88d065e77c8cc2239327c5edb3a432268e5831.webp",
				decimals: 6,
				address: import.meta.env.VITE_BASE_ERC_CONTRACT_ADDRESS,
			},
			{
				id: "euroTether",
				symbol: "EURC",
				name: "Euro Tether",
				icon: "https://basescan.org/token/images/circleeurc_32.png",
				decimals: 6,
				address: import.meta.env.VITE_BASE_ERC_EURC_CONTRACT_ADDRESS,
			},
		],
	},
];
