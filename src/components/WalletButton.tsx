import { useState, useRef, useEffect } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

export function OrangeWalletButton() {
	const { open } = useAppKit();
	const { address, isConnected } = useAppKitAccount();
	const [openMenu, setOpenMenu] = useState(false);
	const menuRef = useRef(null);

	// Close dropdown on outside click
	useEffect(() => {
		const handler = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setOpenMenu(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const shortAddress = address
		? `${address.slice(0, 6)}...${address.slice(-4)}`
		: "";

	if (!isConnected) {
		return (
			<button
				onClick={() => open()}
				className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
			>
				Connect Wallet
			</button>
		);
	}

	return (
		<div className="relative inline-block" ref={menuRef}>
			<button
				onClick={() => setOpenMenu(!openMenu)}
				className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
			>
				{shortAddress}
			</button>

			{openMenu && (
				<div className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border">
					<button
						onClick={() => {
							open({ view: "Account" }); // opens AppKit account modal
							setOpenMenu(false);
						}}
						className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-xl"
					>
						Account
					</button>

					{/* <button
						onClick={() => {
							open({ view: "Disconnect" });
							setOpenMenu(false);
						}}
						className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-b-xl"
					>
						Disconnect
					</button> */}
				</div>
			)}
		</div>
	);
}
