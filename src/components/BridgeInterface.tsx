import { useState, useEffect } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, type Eip1193Provider } from "ethers";
import { ArrowDownUp, Wallet, Check, Zap } from "lucide-react";
import { SUPPORTED_NETWORKS } from "../constants/networks";
import { Network, Token } from "../types/bridge";
import NetworkSelector from "./NetworkSelector";
import AmountInput from "./AmountInput";
import {
	BRIDGE_ABI,
	BRIDGE_CONTRACT_ADDRESS,
	ERC20_ABI,
	executeBridge,
} from "../utils/bridge";
import {
	createPublicClient,
	createWalletClient,
	custom,
	formatUnits,
	http,
} from "viem";
import { polygonAmoy } from "viem/chains";
import useGetTransaction from "../hooks/useGetTransaction";

export default function BridgeInterface() {
	const { address, isConnected } = useAppKitAccount();
	const { walletProvider } = useAppKitProvider("eip155");

	const [sourceChain, setSourceChain] = useState<Network>(
		SUPPORTED_NETWORKS[0]
	);
	// const { writeAsync: createOrder } = useContractWrite({
	// 	address: BRIDGE_CONTRACT_ADDRESS,
	// 	abi: BRIDGE_ABI,
	// 	functionName: "createOrder",
	// });
	const [sourceToken, setSourceToken] = useState<Token>({
		id: "usdc",
		symbol: "USDC",
		name: "USD Coin",
		icon: "💵",
		decimals: 6,
		address: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582",
	});
	const [destinationChain, setDestinationChain] = useState<Network>(
		SUPPORTED_NETWORKS[1]
	);
	const [destinationToken, setDestinationToken] = useState<Token>({
		id: "XRP",
		symbol: "XRP",
		name: "XRP",
		icon: "🔷",
		address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
		decimals: 18,
	});
	const [amount, setAmount] = useState("");
	const [recipientAddress, setRecipientAddress] = useState("");
	const [balance, setBalance] = useState("0");
	const [isLoading, setIsLoading] = useState(false);
	const [destinationValue, setDestinationValue] = useState("");
	const [allowance, setAllowance] = useState<bigint>(0n);
	const [orderHash, setOrderHash] = useState<string>("");
	const publicWallet = createPublicClient({
		chain: polygonAmoy,
		transport: http(),
	});
	useEffect(() => {
		(async () => await fetchBalance())();
	}, [isConnected, walletProvider, sourceToken]);
	useEffect(() => {
		const options = {
			method: "GET",
			headers: { "x-cg-demo-api-key": "CG-zYfpQFy8sDhbM9w4cGTwTjXq" },
		};

		fetch(
			"https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ripple",
			options
		)
			.then((res) => res.json())
			.then((res) => {
				console.log("balance", res.ripple.usd);
				const estimatedValue = amount
					? parseFloat(amount) / Number(res.ripple.usd)
					: "";
				setDestinationValue(estimatedValue.toString());
			})
			.catch((err) => console.error(err));
		(async () => {
			await checkAllowance();
		})();
	}, [amount]);

	const fetchBalance = async () => {
		if (!walletProvider || !address) return;

		try {
			const [rawBalance, decimals] = await Promise.all([
				publicWallet.readContract({
					address: sourceToken.address as `0x${string}`,
					abi: ERC20_ABI,
					functionName: "balanceOf",
					args: [address],
				}),
				publicWallet.readContract({
					address: sourceToken.address as `0x${string}`,
					abi: ERC20_ABI,
					functionName: "decimals",
				}),
			]);
			console.log("raw", rawBalance, decimals);
			const balanceEth = formatUnits(rawBalance as bigint, decimals as number);
			setBalance(balanceEth);
		} catch (error) {
			console.error("Error fetching balance:", error);
			setBalance("0");
		}
	};

	const handleSwapChains = () => {
		const temp = sourceChain;
		setSourceChain(destinationChain);
		setDestinationChain(temp);
	};
	const checkAllowance = async () => {
		const allowance = await publicWallet.readContract({
			address: sourceToken.address as `0x${string}`,
			abi: ERC20_ABI,
			functionName: "allowance",
			args: [address as `0x${string}`, BRIDGE_CONTRACT_ADDRESS],
		});
		console.log("Allowance:", allowance);
		setAllowance(allowance as bigint);
	};
	const approveAllowance = async () => {
		const userWallet = createWalletClient({
			chain: polygonAmoy,
			transport: custom(walletProvider as Eip1193Provider),
			account: address as `0x${string}`,
		});
		if (!isConnected || !walletProvider || !amount) {
			alert("Please connect your wallet and enter an amount");
			return;
		}
		if (
			BigInt(allowance as bigint) <
			BigInt(Number(amount) * 10 ** sourceToken.decimals)
		) {
			const approveTxn = await userWallet.writeContract({
				address: sourceToken.address as `0x${string}`,
				abi: ERC20_ABI,
				functionName: "approve",
				args: [
					BRIDGE_CONTRACT_ADDRESS,
					BigInt(Number(amount) * 10 ** sourceToken.decimals),
				],
			});
			console.log("Approve transaction:", approveTxn);
			alert("Approval transaction sent. Please wait for confirmation.");
			// Wait for approval confirmation
			let approvalConfirmed = false;
			while (!approvalConfirmed) {
				const receipt = await publicWallet.waitForTransactionReceipt({
					hash: approveTxn,
				});
				console.log("Approval receipt:", receipt);
				if (receipt && receipt.status === "success") {
					approvalConfirmed = true;
					await checkAllowance();
				} else {
					await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before checking again
				}
			}
		}
	};
	const {
		data: transactionData,
		isLoading: isTransactionLoading,
		refetch: refetchTransaction,
	} = useGetTransaction(orderHash);

	const checkTxn = async () => {
		let confirmed = false;
		if (transactionData !== undefined) {
			while (!confirmed) {
				if (transactionData.transactionHash) {
					alert("Polygon transaction successful!");
				} else if (transactionData.status === "completed") {
					confirmed = true;
				} else {
					await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before checking again
				}
			}
		}
		// Implementation for checking transaction status
	};
	const handleBridge = async () => {
		const userWallet = createWalletClient({
			chain: polygonAmoy,
			transport: custom(walletProvider as Eip1193Provider),
			account: address as `0x${string}`,
		});

		if (!isConnected || !walletProvider || !amount || !recipientAddress) {
			alert("Please fill in all fields and connect your wallet");
			return;
		}

		setIsLoading(true);
		try {
			const provider = new BrowserProvider(walletProvider as Eip1193Provider);
			const signer = await provider.getSigner();
			const fromAddress = address;
			const toAddress = recipientAddress;
			const filler = "0x04aa78aa957bCf2d9151d5121634d4D146653FEe";
			const fromToken = sourceToken.address;
			const toToken = destinationToken.address;
			const fromAmount = Number(amount) * 10 ** sourceToken.decimals;
			const fillAmount =
				Number(destinationValue) * 10 ** destinationToken.decimals;
			const feeRate = "0";
			const fromChain = sourceChain.id;
			const toChain = destinationChain.id;
			const postHookHash =
				"0x4ed9ba11c87060a6c6f2d0d75b22654cc2e14626522a3b7073249d3b8b8bf817";
			const expiry = Math.floor(Date.now() / 1000) + 4 * 60 * 60;
			const order = {
				fromAddress: fromAddress as `0x${string}`,
				toAddress: toAddress as `0x${string}`,
				filler: filler as `0x${string}`,
				fromToken: fromToken as `0x${string}`,
				toToken: toToken as `0x${string}`,
				fromAmount: BigInt(fromAmount),
				fillAmount: BigInt(fillAmount),
				feeRate: BigInt(feeRate),
				fromChain: BigInt(fromChain),
				toChain: BigInt(toChain),
				postHookHash: postHookHash as `0x${string}`,
				expiry: BigInt(expiry),
			};
			const txn = await userWallet.writeContract({
				address: BRIDGE_CONTRACT_ADDRESS,
				abi: BRIDGE_ABI,
				functionName: "createOrder",
				args: [order],
			});
			console.log("Bridge transaction:", txn);

			let txnConfirmed = false;
			while (!txnConfirmed) {
				const receipt = await publicWallet.waitForTransactionReceipt({
					hash: txn,
				});
				console.log("Approval receipt:", receipt);
				if (receipt && receipt.status === "success") {
					txnConfirmed = true;
					setOrderHash(receipt.transactionHash);
					alert("Bridge transaction initiated successfully! Please ");
				} else {
					await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before checking again
				}
			}
			setAmount("");
			setRecipientAddress("");
			fetchBalance();
		} catch (error) {
			console.error("Bridge error:", error);
			alert("Bridge transaction failed. Please try again.");
			setIsLoading(false);
		} finally {
			setIsLoading(true);
		}
	};

	return (
		<div
			className="w-full max-w-lg mx-auto p-6 rounded-2xl shadow-2xl glass-card"
			style={{ borderColor: "rgba(148,163,184,0.06)" }}
		>
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					{/* <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center ring-1 ring-emerald-500/20">
						<Zap className="w-5 h-5 text-emerald-400" />
					</div> */}
					<div>
						<h1 className="text-2xl font-bold text-white">
							Cross-Chain Bridge
						</h1>
						<p className="text-xs text-slate-400">Fast • Secure • Low-cost</p>
					</div>
				</div>
				<appkit-button balance="hide" />
			</div>

			{isConnected && (
				<div
					className="flex justify-between p-4 rounded-lg"
					style={{
						background:
							"linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
					}}
				>
					<div className="flex items-center gap-3">
						<Wallet className="w-5 h-5 text-emerald-400" />
						<div>
							<div className="text-sm text-slate-300">Connected</div>
							<div className="text-xs text-slate-400 font-mono">
								{address?.slice(0, 6)}...{address?.slice(-4)}
							</div>
						</div>
					</div>
					<div className="flex flex-col items-center gap-3">
						<div className="px-3 py-1 bg-[rgba(255,255,255,0.02)] rounded-full text-xs text-slate-300">
							Balance: <span className="font-medium text-white">{balance}</span>
						</div>
						<div className="flex items-center gap-1 text-emerald-400 text-xs">
							<Check className="w-4 h-4" />
							<span>Wallet synced</span>
						</div>
					</div>
				</div>
			)}

			<div className="space-y-4">
				<div
					className="p-5 rounded-xl"
					style={{
						background:
							"linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.01))",
					}}
				>
					<label className="block text-sm font-medium text-slate-300 mb-3">
						From
					</label>
					<NetworkSelector
						selectedNetwork={sourceChain}
						selectedToken={sourceToken}
						onSelectNetwork={setSourceChain}
						onSelectToken={setSourceToken}
						networks={SUPPORTED_NETWORKS}
						disabled={!isConnected}
					/>
					<AmountInput
						value={amount}
						onChange={setAmount}
						balance={balance}
						disabled={!isConnected}
						placeholder="0.0"
					/>
				</div>

				<div className="flex justify-center">
					<button
						onClick={handleSwapChains}
						className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors border border-slate-600 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
						disabled={!isConnected}
						aria-label="Swap source and destination chains"
					>
						<ArrowDownUp className="w-5 h-5 text-slate-200" />
					</button>
				</div>

				<div className="p-5 bg-slate-800/70 rounded-xl border border-slate-700">
					<label className="block text-sm font-medium text-slate-300 mb-3">
						To
					</label>
					<NetworkSelector
						selectedNetwork={destinationChain}
						selectedToken={destinationToken}
						onSelectNetwork={setDestinationChain}
						onSelectToken={setDestinationToken}
						networks={SUPPORTED_NETWORKS}
						disabled={!isConnected}
					/>
					<div className="mt-4">
						<label className="block text-xs font-medium text-slate-400 mb-2">
							Estimated Value (USD)
						</label>
						<input
							type="text"
							value={
								amount && destinationValue
									? Number(destinationValue).toFixed(2)
									: ""
							}
							placeholder="0.00"
							disabled={true}
							className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
						/>
					</div>
					<div className="mt-4">
						<label className="block text-xs font-medium text-slate-400 mb-2">
							Recipient Address
						</label>
						<input
							type="text"
							value={recipientAddress}
							onChange={(e) => setRecipientAddress(e.target.value)}
							placeholder="0x..."
							disabled={!isConnected}
							className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
						/>
						<p className="mt-2 text-xs text-slate-400">
							Ensure recipient supports the destination chain.
						</p>
					</div>
				</div>

				<button
					onClick={
						BigInt(allowance as bigint) <
						BigInt(Number(amount) * 10 ** sourceToken.decimals)
							? approveAllowance
							: handleBridge
					}
					disabled={!isConnected || !amount || !recipientAddress || isLoading}
					className="w-full py-4 px-6 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
					style={{
						background: "linear-gradient(90deg, #10b981, #059669)",
					}}
				>
					{isLoading ? (
						<>
							<svg
								className="w-5 h-5 animate-spin text-white"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									fill="none"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
								></path>
							</svg>
							Processing...
						</>
					) : BigInt(allowance as bigint) <
					  BigInt(Number(amount) * 10 ** sourceToken.decimals) ? (
						"Approve"
					) : isConnected ? (
						"Bridge Assets"
					) : (
						"Connect Wallet First"
					)}
				</button>
			</div>

			{!isConnected && (
				<p className="mt-4 text-center text-sm text-slate-400">
					Please connect your wallet to start bridging
				</p>
			)}
		</div>
	);
}
