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
        <div className="fixed inset-0 z-[90] flex text-black cursor-pointer" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
            <div className="relative z-[80] w-fit h-[75%] m-auto flex-col flex cursor-default" onClick={(e) => e.stopPropagation()}>
                <span className="absolute top-[-15px] right-[-15px] px-3 py-1 rounded-lg bg-red-700 text-main-white transition hover:bg-red-900 cursor-pointer" onClick={onClose}>
                    X
                </span>
                {children}
            </div>
        </div>
    );
};

export default HeroModal;
