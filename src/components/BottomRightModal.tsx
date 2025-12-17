type BaseModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
};

const BottomRightModal = ({
	isOpen,
	onClose,
	title,
	children,
}: BaseModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed bottom-4 right-4 z-50 w-96 rounded-lg border border-gray-200 bg-white shadow-xl animate-slide-in">
			<div className="flex items-center justify-between border-b px-4 py-3">
				<h3 className="text-sm font-semibold text-gray-800">{title}</h3>
				<button onClick={onClose} className="text-gray-500 hover:text-gray-700">
					✕
				</button>
			</div>

			<div className="px-4 py-3 text-sm text-gray-700">{children}</div>
		</div>
	);
};
export default BottomRightModal;
