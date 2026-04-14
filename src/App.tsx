import "./config/web3";
// import BridgeInterface from "./components/BridgeInterface";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BridgeInterface from "./components/BridgeInterfaceDemo";
import BridgeInterfaceStable from "./components/BridgeInterfaceStableDemo";
const queryClient = new QueryClient();

function BridgePage() {
	return (
		<div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
			<BridgeInterface />
			<ToastContainer
				position="bottom-right"
				autoClose={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				theme="light"
				// transition={ToastTransition.Slide}
			/>
		</div>
	);
}
function BridgePageStable() {
	return (
		<div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
			<BridgeInterfaceStable />
			<ToastContainer
				position="bottom-right"
				autoClose={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				theme="light"
				// transition={ToastTransition.Slide}
			/>
		</div>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<BridgePage />} />
					<Route path="/stable" element={<BridgePageStable />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
