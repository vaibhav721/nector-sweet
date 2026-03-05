export const LoadingState = ({ label = 'Loading...' }: { label?: string }) => {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6 text-center text-sm text-neutral-500 shadow-soft">
      {label}
    </div>
  );
};
