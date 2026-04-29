export default function BlurLock({ children }: any) {
  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none">{children}</div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
          🔒 Premium
        </span>
      </div>
    </div>
  );
}
