import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

interface GlassModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export function GlassModal({ isOpen, onClose, children, className }: GlassModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Wait for transition
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted || !isVisible) return null;

    return createPortal(
        <div className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300",
            isOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0 pointer-events-none"
        )}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={cn(
                    "relative w-full overflow-hidden rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md shadow-2xl transition-all duration-300 ease-out transform",
                    isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0",
                    className
                )}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}

export default GlassModal;
