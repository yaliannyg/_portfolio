import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IconX } from "@tabler/icons-react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  subtitle?: string;
  title: string;
  onClose: () => void;
}

export default function Modal({
  children,
  isOpen,
  subtitle,
  title,
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/5 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 rounded-xl bg-slate-800 p-7 shadow-xl w-md text-white ">
        {/* Header */}
        <div className="flex flex-col mb-3.5 relative gap-1.5">
          <p className="text-[10px] text-[#ffffff4d] uppercase">{subtitle}</p>
          <h2 className="text-base font-semibold text-primary">{title}</h2>

          <button
            onClick={onClose}
            className="-top-4 -right-2 absolute rounded-lg p-1.5 bg-primary/20 transition-colors text-primary"
          >
            <IconX size={16} />
          </button>
        </div>

        <div className="text-gray-600">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
