export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="min-h-[60vh] grid place-items-center text-white">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 rounded-full border-4 border-white/20 border-t-white animate-spin"
          aria-label={message}
          role="status"
        />
        {message && <p className="text-gray-400 text-sm">{message}</p>}
      </div>
    </div>
  );
}
