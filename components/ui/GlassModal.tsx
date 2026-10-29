"use client";
import ClientOnly from "@/app/_components/ClientOnly";
import { cn } from "@/lib/utils";
import { useEffect,useRef } from "react";
import { createPortal } from "react-dom";

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function GlassModal({ isOpen, onClose, children, className }: GlassModalProps) {
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const elements = dialog.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, textarea, select, [tabindex="0"]');
        if (!elements?.length) { event.preventDefault(); return; }
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return <ClientOnly><Portal><div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 sm:p-6" onClick={onClose}>
    <div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Place details" onClick={(event) => event.stopPropagation()} className={cn("relative w-full overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl", className)}>{children}</div>
  </div></Portal></ClientOnly>;
}
function Portal({ children }: { children: React.ReactNode }) { return createPortal(children, document.body); }
export default GlassModal;
