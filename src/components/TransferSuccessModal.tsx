import { CheckCircle, X } from "lucide-react";

interface TransferSuccessModalProps {
	isOpen: boolean;
	onClose: () => void;
	fromAddress: string;
	toAddress: string;
	amountSent: string | number;
	amountReceived: string | number;
	hash: string;
}

export default function TransferSuccessModal({
	isOpen,
	onClose,
	fromAddress,
	toAddress,
	amountSent,
	amountReceived,
	hash,
}: TransferSuccessModalProps) {
	if (!isOpen) return null;

	return (
		// <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
		// 	<div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-xl">
		// 		{/* Success Icon */}
		// 		<div className="flex justify-center mb-4">
		// 			<div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
		// 				<CheckCircle className="h-8 w-8 text-green-400" />
		// 			</div>
		// 		</div>

		// 		{/* Title */}
		// 		<h2 className="text-center text-xl font-semibold text-white">
		// 			Transfer Successful
		// 		</h2>

		// 		<p className="mt-2 text-center text-sm text-slate-400">
		// 			Your transaction has been completed successfully.
		// 		</p>

		// 		{/* Details */}
		// 		<div className="mt-6 space-y-3 text-sm">
		// 			<div className="flex justify-between">
		// 				<span className="text-slate-400">From</span>
		// 				<span className="text-white truncate max-w-[200px]">
		// 					{fromAddress}
		// 				</span>
		// 			</div>

		// 			<div className="flex justify-between">
		// 				<span className="text-slate-400">To</span>
		// 				<span className="text-white truncate max-w-[200px]">
		// 					{toAddress}
		// 				</span>
		// 			</div>

		// 			<div className="flex justify-between">
		// 				<span className="text-slate-400">Amount Sent</span>
		// 				<span className="text-white font-medium">
		// 					{Number(amountSent).toFixed(4)} USDC
		// 				</span>
		// 			</div>

		// 			<div className="flex justify-between">
		// 				<span className="text-slate-400">Amount Received</span>
		// 				<span className="text-green-400 font-medium">
		// 					{Number(amountReceived).toFixed(4)} XRP
		// 				</span>
		// 			</div>
		// 		</div>

		// 		{/* Action */}
		// 		<button
		// 			// onClick={onClose}
		// 			onClick={() => {
		// 				window.open(
		// 					`https://testnet.xrpl.org/transactions/${hash}`,
		// 					"_blank"
		// 				);
		// 			}}
		// 			className="mt-6 w-full rounded-lg bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-500 transition"
		// 		>
		// 			View Transaction
		// 		</button>
		// 	</div>
		// </div>
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
			<div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-xl">
				{/* Close Icon */}
				<button
					onClick={onClose}
					className="absolute right-4 top-4 rounded-md p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition"
				>
					<X className="h-5 w-5" />
				</button>

				{/* Success Icon */}
				<div className="flex justify-center mb-4">
					<div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
						<CheckCircle className="h-8 w-8 text-green-400" />
					</div>
				</div>

				{/* Title */}
				<h2 className="text-center text-xl font-semibold text-white">
					Transfer Successful
				</h2>

				<p className="mt-2 text-center text-sm text-slate-400">
					Your transaction has been completed successfully.
				</p>

				{/* Details */}
				<div className="mt-6 space-y-3 text-sm">
					<div className="flex justify-between">
						<span className="text-slate-400">From</span>
						<span className="text-white truncate max-w-[200px]">
							{fromAddress}
						</span>
					</div>

					<div className="flex justify-between">
						<span className="text-slate-400">To</span>
						<span className="text-white truncate max-w-[200px]">
							{toAddress}
						</span>
					</div>

					<div className="flex justify-between">
						<span className="text-slate-400">Amount Sent</span>
						<span className="text-white font-medium">
							{Number(amountSent).toFixed(4)} USDC
						</span>
					</div>

					<div className="flex justify-between">
						<span className="text-slate-400">Amount Received</span>
						<span className="text-green-400 font-medium">
							{Number(amountReceived).toFixed(4)} XRP
						</span>
					</div>
				</div>

				{/* Action */}
				<button
					onClick={() =>
						window.open(
							`https://testnet.xrpl.org/transactions/${hash}`,
							"_blank"
						)
					}
					className="mt-6 w-full rounded-lg bg-orange-500 hover:bg-orange-600 py-2.5 text-white font-medium transition"
				>
					View Transaction
				</button>
			</div>
		</div>
	);
}
