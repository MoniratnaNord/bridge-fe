type TxHashLinkProps = {
	hash: string;
	explorerUrl: string;
};

const TxnHashLink = ({ hash, explorerUrl }: TxHashLinkProps) => {
	if (!hash) return null;
	const truncateHash = (hash: string, start = 6, end = 4) => {
		if (!hash) return "";
		return `${hash.slice(0, start)}...${hash.slice(-end)}`;
	};
	return (
		<a
			href={`${explorerUrl}/${hash}`}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline transition"
		>
			<span className="font-medium">{truncateHash(hash)}</span>

			{/* External link icon (Tailwind + SVG only) */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="w-4 h-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M14 3h7m0 0v7m0-7L10 14"
				/>
			</svg>
		</a>
	);
};
export default TxnHashLink;
