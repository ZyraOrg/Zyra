const ETH_ADDRESS_REGEX = /^0x[0-9a-fA-F]{40}$/;

export function validateWalletAddress(address) {
  if (!address) return 'Wallet address is required';
  if (!ETH_ADDRESS_REGEX.test(address)) {
    return 'Invalid wallet address — must be a valid Ethereum address (0x followed by 40 hex characters)';
  }
  return null;
}

export default function WalletAddressInput({ value, onChange, error, onError }) {
  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    if (onError) onError(validateWalletAddress(val));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-200 mb-2">
        Receiving wallet address
      </label>
      <input
        value={value}
        onChange={handleChange}
        required
        type="text"
        placeholder="0x..."
        className={`w-full rounded-lg border bg-[#010410] px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
          error ? 'border-red-500 focus:border-red-500' : 'border-[#1a2b6b] focus:border-[#0A36F7]'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
