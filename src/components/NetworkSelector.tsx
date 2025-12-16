import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Network } from "../types/bridge";

interface NetworkSelectorProps {
	selectedNetwork: Network;
	selectedToken: any;
	onSelectNetwork: (network: Network) => void;
	onSelectToken: (token: any) => void;
	networks: Network[];
	disabled?: boolean;
}

export default function NetworkSelector({
	selectedNetwork,
	selectedToken,
	onSelectNetwork,
	onSelectToken,
	networks,
	disabled = false,
}: NetworkSelectorProps) {
	console.log("networks in NetworkSelector:", networks);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<button
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={disabled}
				className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg flex items-center justify-between hover:border-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<div className="flex items-center gap-3">
					<span className="text-2xl">{selectedNetwork.icon}</span>
					<div className="text-left">
						<div className="text-white font-medium">{selectedNetwork.name}</div>
						<div className="text-slate-400 text-xs">
							{selectedNetwork.symbol}
						</div>
						<div className="text-slate-400 text-xs">
							{selectedToken ? selectedToken.symbol : "Select Token"}
						</div>
					</div>
				</div>
				<ChevronDown
					className={`w-5 h-5 text-slate-400 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && !disabled && (
				<>
					<div
						className="fixed inset-0 z-10"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute z-20 w-full mt-2 bg-slate-900 border border-slate-600 rounded-lg shadow-xl overflow-hidden">
						<div className="grid grid-cols-2">
							<div>
								{networks.map((network) => (
									<button
										key={network.id}
										onClick={() => {
											onSelectNetwork(network);
											// setIsOpen(false);
										}}
										className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-800 transition-colors ${
											selectedNetwork.id === network.id ? "bg-slate-800" : ""
										}`}
									>
										<span className="text-2xl">{network.icon}</span>
										<div className="text-left">
											<div className="text-white font-medium">
												{network.name}
											</div>
											<div className="text-slate-400 text-xs">
												{network.symbol}
											</div>
										</div>
									</button>
								))}
							</div>
							<div className="max-h-72 overflow-x-auto">
								{
									// networks.map((network) =>
									selectedNetwork.tokens.map((token) => (
										<button
											key={token.id}
											onClick={() => {
												onSelectToken(token);
												setIsOpen(false);
											}}
											className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-800 transition-colors ${
												selectedToken.id === token.id ? "bg-slate-800" : ""
											}`}
										>
											<div className="scrollbar flex max-h-10 items-center gap-3 overflow-x-auto">
												<span className="text-2xl">{token.icon}</span>
												<div className="text-left">
													{/* <div className="text-white font-medium">
													{token.name}
												</div> */}
													<div className="text-slate-400 text-xs">
														{token.symbol}
													</div>
												</div>
											</div>
										</button>
									))
									// )
								}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
