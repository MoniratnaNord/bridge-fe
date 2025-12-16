import { useQuery } from "@tanstack/react-query";

const useGetTransaction = (orderHash: string) => {
	return useQuery({
		queryKey: ["txn"],
		queryFn: () => getTxn(orderHash),
		// staleTime: Infinity,
		refetchOnWindowFocus: false,
		enabled: !!orderHash,
	});
};

const getTxn = async (orderHash: string) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/transaction/order/${orderHash}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
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

export default useGetTransaction;
