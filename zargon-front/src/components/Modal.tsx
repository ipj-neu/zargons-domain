import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect, HTMLAttributes } from "react";

export function useCloseModal() {
  const router = useRouter();
  return useCallback(() => {
    router.back();
  }, [router]);
}

export default function SlotModal({ children, className }: { children: React.ReactNode; className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = useCloseModal();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div
      onClick={handleCloseModal}
      className={`fixed inset-0 flex items-center justify-center z-50 transform transition-all duration-300 ${isOpen ? "scale-100" : "scale-0"}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={className}>
        {children}
      </div>
    </div>
  );
}
