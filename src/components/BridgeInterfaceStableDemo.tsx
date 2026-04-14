import { useState, useEffect } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { ArrowDownUp } from "lucide-react";
import { SUPPORTED_NETWORKS } from "../constants/networks";
import { Network, Token } from "../types/bridge";
import NetworkSelector from "./NetworkSelector";
import { ERC20_ABI } from "../utils/bridge";
import { createPublicClient, formatUnits, http } from "viem";
import { polygon, polygonAmoy, baseSepolia } from "viem/chains";
import useGetTransaction from "../hooks/useGetTransaction";
import TxnHashLink from "./TxnHashLink";
import { toast } from "react-toastify";
import TransferSuccessModal from "./TransferSuccessModal";
import useGetTxnDemo from "../hooks/useGetTxnDemo";
import useSendBaseTxn from "../hooks/useSendBaseTxn";
import useGetBaseTxnDemo from "../hooks/useGetBaseTxnDemo";
import useGetWallets from "../hooks/useGetWallets";
import TransferSuccessBaseModal from "./TransferSuccessBaseModal";

export default function BridgeInterfaceStable() {
	const { address, isConnected } = useAppKitAccount();
	const { walletProvider } = useAppKitProvider("eip155");
	const [sourceChain, setSourceChain] = useState<Network>(
		SUPPORTED_NETWORKS[2],
	);
	const [sourceToken, setSourceToken] = useState<Token>(
		SUPPORTED_NETWORKS[2].tokens[0],
	);
	const [destinationChain, setDestinationChain] = useState<Network>(
		SUPPORTED_NETWORKS[2],
	);
	const [destinationToken, setDestinationToken] = useState<Token>(
		SUPPORTED_NETWORKS[2].tokens[1],
	);
	const [amount, setAmount] = useState(
		`${import.meta.env.VITE_DEFAULT_AMOUNT}`,
	);
	const [recipientAddress, setRecipientAddress] = useState("");
	const [balance, setBalance] = useState("0");
	const [isLoading, setIsLoading] = useState(false);
	const [orderHash, setOrderHash] = useState<string>("");
	const [orderId, setOrderId] = useState("");
	const [txnModal, setTxnModal] = useState(false);
	const [fillAmt, setFillAmt] = useState(0);
	const [fromAmt, setFromAmt] = useState(0);
	const [toAdd, setToAdd] = useState("");

	const publicWallet = createPublicClient({
		chain: baseSepolia,
		transport: http(import.meta.env.VITE_BASE_RPC),
	});
	const { data: walletsData, isLoading: walletLoading } = useGetWallets();

	useEffect(() => {
		(async () => {
			if (walletsData.sender) {
				await fetchBalance();
			}
		})();
	}, [walletsData, walletProvider, sourceToken]);

	const fetchBalance = async () => {
		// if (!walletProvider || !address) return;

		try {
			const [rawBalance, decimals] = await Promise.all([
				publicWallet.readContract({
					address: walletsData.tokens.USDC as `0x${string}`,
					abi: ERC20_ABI,
					functionName: "balanceOf",
					args: [walletsData.sender],
				}),
				publicWallet.readContract({
					address: walletsData.tokens.USDC as `0x${string}`,
					abi: ERC20_ABI,
					functionName: "decimals",
				}),
			]);
			console.log("raw balance", rawBalance, decimals);
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
	const { data: transactionData } = useGetBaseTxnDemo(orderId);

	const [polygonHash, setPolygonHash] = useState<string>("");
	const [xrpHash, setXrpHash] = useState<string>("");
	// useEffect(() => {
	// 	if (!transactionData) return;

	// 	if (transactionData.transactionHash) {
	// 		setPolygonHash(transactionData.polygonTxHash);
	// 	}
	// 	if (transactionData.overallStatus === "processing") {
	// 		setTxnModal(true);
	// 		setXrpHash(transactionData.xrpTxHash);
	// 		setPolygonHash(transactionData.polygonTxHash);
	// 		setFillAmt(Number(transactionData.xrpAmount));
	// 		setFromAmt(Number(transactionData.usdcAmount));
	// 		setToAdd(transactionData.receiverXrpAddress);
	// 		setIsLoading(false);
	// 	}
	// 	if (transactionData.overallStatus === "completed") {
	// 		setXrpHash(transactionData.xrpTxHash);
	// 		setIsLoading(false);
	// 		// toast("Transaction Completed Successfully!", { type: "success" });
	// 	}
	// 	if (transactionData.overallStatus === "failed") {
	// 		setIsLoading(false);
	// 		toast("Transaction Failed. Please try again.", {
	// 			type: "error",
	// 			autoClose: 5000,
	// 		});
	// 	}
	// 	if (transactionData.status === "refunded") {
	// 		setIsLoading(false);
	// 		toast("Transaction Failed. A refund has been initiated.", {
	// 			type: "error",
	// 			autoClose: 5000,
	// 		});
	// 	}
	// }, [transactionData]);

	// useEffect(() => {
	// 	if (!transactionData) return;

	// 	if (transactionData.polygonTxHash) {
	// 		setPolygonHash(transactionData.polygonTxHash);

	// 		toast(
	// 			<div className="space-y-1">
	// 				<p className="text-sm text-slate-300">Polygon Transaction Hash:</p>
	// 				<TxnHashLink
	// 					hash={transactionData.polygonTxHash}
	// 					explorerUrl="https://bscscan.com/tx"
	// 				/>
	// 			</div>,
	// 			{
	// 				toastId: `bsc-${transactionData.polygonTxHash}`, // ✅ prevents duplicates
	// 			},
	// 		);
	// 	}

	// 	if (transactionData.overallStatus === "completed") {
	// 		setXrpHash(transactionData.xrpTxHash);
	// 		setPolygonHash(transactionData.polygonTxHash);
	// 		setFillAmt(Number(transactionData.xrpAmount));
	// 		setFromAmt(Number(transactionData.usdcAmount));
	// 		setToAdd(transactionData.receiverXrpAddress);
	// 		setIsLoading(false);
	// 	}

	// 	if (transactionData.status === "failed") {
	// 		setIsLoading(false);
	// 		toast.error("Transaction Failed. Please try again.", {
	// 			toastId: "txn-failed",
	// 			autoClose: 5000,
	// 		});
	// 	}
	// }, [transactionData]);

	const [euroTetherBalance, setEuroTetherBalance] = useState("0");
	const receiverAddress = import.meta.env.VITE_BASE_RECEIVER_ADDRESS_EURT;
	useEffect(() => {
		const fetchEuroTetherBalance = async () => {
			const [rawBalance, decimals] = await Promise.all([
				publicWallet.readContract({
					address: walletsData.tokens.EURC as `0x${string}`,
					abi: ERC20_ABI,
					functionName: "balanceOf",
					args: [walletsData.receiver],
				}),
				publicWallet.readContract({
					address: walletsData.tokens.EURC as `0x${string}`,
					abi: ERC20_ABI,
					functionName: "decimals",
				}),
			]);
			console.log("raw balance", rawBalance, decimals);
			const balanceEth = formatUnits(rawBalance as bigint, decimals as number);
			setEuroTetherBalance(balanceEth);
		};
		fetchEuroTetherBalance();
		fetchBalance();
	}, [walletsData]);

	useEffect(() => {
		const fetchEuroTetherBalance = async () => {
			const [rawBalance, decimals] = await Promise.all([
				publicWallet.readContract({
					address: walletsData.tokens.EURC as `0x${string}`,
					abi: ERC20_ABI,
					functionName: "balanceOf",
					args: [walletsData.receiver],
				}),
				publicWallet.readContract({
					address: walletsData.tokens.EURC as `0x${string}`,
					abi: ERC20_ABI,
					functionName: "decimals",
				}),
			]);
			console.log("raw balance", rawBalance, decimals);
			const balanceEth = formatUnits(rawBalance as bigint, decimals as number);
			setEuroTetherBalance(balanceEth);
		};
		fetchEuroTetherBalance();
		fetchBalance();
	}, [txnModal]);
	const { mutate } = useSendBaseTxn();
	return (
		<div
			className="w-full max-w-lg mx-auto p-6 rounded-2xl shadow-2xl glass-card"
			style={{ borderColor: "rgba(148,163,184,0.06)" }}
		>
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<img
						src="https://cdn.prod.website-files.com/68da869991640cb4d53e986a/6916e394a215fb6974e32c5b_BXNK-logo-final2.svg"
						width={200}
					/>
				</div>
			</div>

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
					<div className="mt-4">
						<div className="grid grid-cols-2 gap-2">
							<div>
								<label className="text-sm font-medium text-slate-300 mb-3">
									<div className="mb-3">Sender Address</div>
								</label>
								<input
									type="text"
									value={`${
										!walletLoading && walletsData.sender.slice(0, 6)
									}...${!walletLoading && walletsData.sender.slice(-4)}`}
									// onChange={(e) => setRecipientAddress(e.target.value)}
									placeholder="0x..."
									disabled={!isConnected}
									className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
								/>
							</div>
							<div>
								<label className="text-sm font-medium text-slate-300 mb-3">
									<div className="mb-3">Balance</div>
								</label>
								<div className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm">
									{" "}
									{Number(balance).toFixed(2)} USDC
								</div>
							</div>
						</div>
					</div>
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
					<label className="text-sm font-medium text-slate-300 mb-3 flex justify-between">
						<div>To</div>
					</label>
					<NetworkSelector
						selectedNetwork={destinationChain}
						selectedToken={destinationToken}
						onSelectNetwork={setDestinationChain}
						onSelectToken={setDestinationToken}
						networks={SUPPORTED_NETWORKS}
						disabled={!isConnected}
					/>
					<div className="mt-4"></div>
					<div className="mt-4">
						<div className="grid grid-cols-2 gap-2">
							<div>
								<label className="text-sm font-medium text-slate-300 mb-3">
									<div className="mb-3">Recipient Address</div>

									{/* To */}
								</label>
								<input
									type="text"
									value={`${
										!walletLoading && walletsData.receiver.slice(0, 6)
									}...${!walletLoading && walletsData.receiver.slice(-4)}`}
									// onChange={(e) => setRecipientAddress(e.target.value)}
									placeholder="0x..."
									disabled={!isConnected}
									className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
								/>
							</div>
							<div>
								<label className="text-sm font-medium text-slate-300 mb-3">
									<div className="mb-3">Balance</div>

									{/* To */}
								</label>
								<div className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm">
									{" "}
									{Number(euroTetherBalance).toFixed(2)} EURC
								</div>
							</div>
						</div>

						{/* <p className="mt-2 text-xs text-slate-400">
                            Ensure recipient supports the destination chain.
                        </p> */}
					</div>
				</div>

				<button
					onClick={() => {
						setIsLoading(true);
						mutate(
							{
								amount: amount,
							},
							{
								onSuccess: (data) => {
									console.log("checking mutate", data);
									// setOrderId(data.bridgeTransactionId);
									// setPolygonHash(data.txHashes.usdcTransfer);
									// setXrpHash(data.txHashes.eurcTransfer);
									// setIsLoading(false);
									setXrpHash(data.txHashes.eurcTransfer);
									setPolygonHash(data.txHashes.usdcTransfer);
									setFillAmt(data.outputAmount);
									setFromAmt(data.inputAmount);
									setToAdd(walletsData.receiver);
									setIsLoading(false);
									setTxnModal(true);
								},
								onError: (error: any) => {
									console.log(error);
									toast.error("Transaction Failed. Please try again.", {
										toastId: "txn-failed",
										autoClose: 5000,
										onClose: () => {
											setIsLoading(false);
										},
									});
								},
							},
						);
					}}
					disabled={isLoading}
					className="bg-orange-500 hover:bg-orange-600 hover:text-black w-full py-4 px-6 text-black font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
					) : (
						`Send ${amount} USDC`
					)}
				</button>
			</div>

			<TransferSuccessBaseModal
				isOpen={txnModal}
				onClose={() => setTxnModal(false)}
				fromAddress={(!walletLoading && walletsData.sender) || ""}
				toAddress={toAdd}
				amountSent={fromAmt}
				amountReceived={fillAmt}
				xrpHash={xrpHash}
				polHash={polygonHash}
			/>
		</div>
	);
}
