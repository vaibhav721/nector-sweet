import type { PropsWithChildren } from 'react';

export const Modal = ({
  open,
  onClose,
  title,
  children
}: PropsWithChildren<{ open: boolean; onClose: () => void; title: string }>) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-soft">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-heading text-xl">{title}</h3>
          <button onClick={onClose} className="text-sm text-neutral-500">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
