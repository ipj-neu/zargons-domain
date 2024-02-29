import React from "react";

interface HeroModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const HeroModal: React.FC<HeroModalProps> = ({
    isOpen,
    onClose,
    children,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[90] overflow-auto flex text-black cursor-pointer" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
            <div className="relative z-[80] bg-slate-100 w-fit m-auto flex-row flex rounded-lg cursor-default" onClick={(e) => e.stopPropagation()}>
                <span className="absolute top-[-15px] right-[-15px] px-3 py-1 rounded-lg bg-red-500 text-white transition hover:bg-red-800 cursor-pointer" onClick={onClose}>
                    X
                </span>
                {children}
            </div>
        </div>
    );
};

export default HeroModal;
