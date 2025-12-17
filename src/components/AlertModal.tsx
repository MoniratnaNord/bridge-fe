import BottomRightModal from "./BottomRightModal";

type AlertModalProps = {
	isOpen: boolean;
	onClose: () => void;
	message: string;
};

const AlertModal = ({ isOpen, onClose, message }: AlertModalProps) => {
	return (
		<BottomRightModal
			isOpen={isOpen}
			onClose={onClose}
			title="Transaction Failed"
		>
			<p className="text-red-600">{message}</p>
		</BottomRightModal>
	);
};
export default AlertModal;
