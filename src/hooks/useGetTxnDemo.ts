import { useQuery } from "@tanstack/react-query";

const useGetTxnDemo = (orderId: string) => {
	return useQuery({
		queryKey: ["txn-demo", orderId], // ✅ FIXED
		queryFn: () => getTxn(orderId),
		enabled: !!orderId,
		refetchOnWindowFocus: false,

		refetchInterval: (data: any) => {
			console.log("Refetching status...", data.state.data);
			if (!data.state) return 5000; // initial fetch
			if (!data.state.data) return 5000; // keep polling until data arrives
			if (data.state.data.overallStatus === "completed") return false; // stop polling when completed
			if (data.state.data.overallStatus === "failed") return false; // stop polling when failed
			if (data.state.data.overallStatus === "refunded") return false; // stop polling when failed

			return 5000; // otherwise, poll every 30 seconds
		},
	});
};

const getTxn = async (orderid: string) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/transaction/${orderid}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"ngrok-skip-browser-warning": "true",
				},
			}
		);
		const res_data = await response.json();
		return res_data.transaction;
	} catch (error: any) {
		console.error("Fetch thread list failed:", error);
		throw new Error(error);
	}
};

export default useGetTxnDemo;
