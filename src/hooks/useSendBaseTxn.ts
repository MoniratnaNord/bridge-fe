import { useMutation } from "@tanstack/react-query";

const useSendBaseTxn = () => {
	return useMutation({
		mutationKey: ["send-txn"], // ✅ FIXED
		mutationFn: async ({ amount }: { amount: string }) => {
			return sendTxn(amount);
		},
	});
};

const sendTxn = async (amount: string) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/v2/convert`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"ngrok-skip-browser-warning": "true",
				},
				body: JSON.stringify({
					amount: amount,
				}),
			},
		);
		const res_data = await response.json();
		return res_data;
	} catch (error: any) {
		console.error("send txn failed:", error);
		throw new Error(error);
	}
};

export default useSendBaseTxn;
