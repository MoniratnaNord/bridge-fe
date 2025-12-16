interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  balance: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function AmountInput({
  value,
  onChange,
  balance,
  disabled = false,
  placeholder = '0.0',
}: AmountInputProps) {
  const handleMaxClick = () => {
    onChange(balance);
  };

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-slate-400">Amount</label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Balance: {balance}</span>
          <button
            onClick={handleMaxClick}
            disabled={disabled || parseFloat(balance) === 0}
            className="px-2 py-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            MAX
          </button>
        </div>
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        step="0.000001"
        min="0"
        className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white text-lg placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}
