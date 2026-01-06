import "./config/web3";
// import BridgeInterface from "./components/BridgeInterface";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import BridgeInterface from "./components/BridgeInterfaceDemo";
const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
				<BridgeInterface />
				<ToastContainer
					position="bottom-right"
					autoClose={false}
					newestOnTop={false}
					closeOnClick
					closeButton={({ closeToast }) => (
						<button
							onClick={closeToast}
							className="absolute top-3 right-3 text-white hover:text-slate-300 transition"
						>
							✕
						</button>
					)}
					rtl={false}
					pauseOnFocusLoss
					draggable
					theme="light"
					// transition={ToastTransition.Slide}
				/>
			</div>
		</QueryClientProvider>
	);
}

export default App;
