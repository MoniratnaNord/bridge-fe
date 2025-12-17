import { useQuery } from "@tanstack/react-query";

const useGetTransaction = (orderHash: string) => {
	return useQuery({
		queryKey: ["txn", orderHash], // ✅ FIXED
		queryFn: () => getTxn(orderHash),
		enabled: !!orderHash,
		refetchOnWindowFocus: false,

		refetchInterval: (data: any) => {
			console.log("Refetching status...", data.state.data);
			if (!data.state) return 30000; // initial fetch
			if (!data.state.data) return 30000; // keep polling until data arrives
			if (data.state.data.status === "completed") return false; // stop polling when completed
			if (data.state.data.status === "failed") return false; // stop polling when failed

			return 30000; // otherwise, poll every 30 seconds
		},
	});
};

const getTxn = async (orderHash: string) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/transaction/tx/${orderHash}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"ngrok-skip-browser-warning": "true",
				},
				body: JSON.stringify({}),
			}
		);
		const res_data = await response.json();
		return res_data.transaction;
	} catch (error: any) {
		console.error("Fetch thread list failed:", error);
		throw new Error(error);
	}
};

export default useGetTransaction;
