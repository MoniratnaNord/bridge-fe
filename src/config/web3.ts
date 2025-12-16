import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import {
	mainnet,
	arbitrum,
	polygon,
	optimism,
	base,
	polygonAmoy,
} from "@reown/appkit/networks";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || "demo-project-id";

const metadata = {
	name: "Cross-Chain Bridge",
	description: "Bridge assets across multiple blockchains",
	url: "https://amoy.polygonscan.com",
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const networks = [polygonAmoy];

export const appKit = createAppKit({
	adapters: [new EthersAdapter()],
	networks,
	metadata,
	projectId,
	features: {
		analytics: false,
	},
});
