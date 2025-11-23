import React from 'react';
import { motion } from 'framer-motion';
import { XPLogo } from '../XPIcons';
import { XP_ICONS, TEXT } from '../../constants';

interface ShutdownModalProps {
  onRestart: () => void;
  onLogOff: () => void;
  onCancel: () => void;
}

const ModalButton = ({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center group gap-1 outline-none"
  >
    <div className="w-[34px] h-[34px] sm:w-[42px] sm:h-[42px] relative flex items-center justify-center rounded-[2px] transition-all duration-100 group-hover:brightness-110 group-active:translate-y-[1px]">
       <img src={icon} alt={label} className="w-full h-full object-contain drop-shadow-md" />
    </div>
    <span className="text-white text-xs sm:text-sm font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] bg-[#316ac5] px-2 py-0.5 rounded-[2px] group-hover:bg-[#e59637] transition-colors border border-transparent group-hover:border-white/30">
      {label}
    </span>
  </button>
);

const ShutdownModal: React.FC<ShutdownModalProps> = ({ onRestart, onLogOff, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay is handled by parent with grayscale, but we add a dim layer here too just in case */}
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="relative w-[320px] sm:w-[380px] overflow-hidden rounded-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.6)] z-10 font-sans select-none"
      >
        {/* Header */}
        <div className="h-[42px] flex items-center justify-between px-3 relative overflow-hidden">
           <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0f2668] via-[#1d459f] to-[#0f2668]"></div>
           <div className="relative z-10 text-white font-bold text-lg drop-shadow-md flex items-center">
             Log Off {TEXT.name.split(' ')[0]} XP
           </div>
           <div className="relative z-10 opacity-90">
             <XPLogo className="w-8 h-8" />
           </div>
        </div>

        {/* Body */}
        <div className="bg-gradient-to-b from-[#6591d6] to-[#0e3396] p-6 border-t border-[#8bb2ea]">
            <div className="flex items-center justify-center gap-10 sm:gap-16 py-4">
                <ModalButton icon={XP_ICONS.restart} label="Restart" onClick={onRestart} />
                <ModalButton icon={XP_ICONS.logoff} label="Log Off" onClick={onLogOff} />
            </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0f2668] h-[50px] flex items-center justify-end px-4 border-t border-[#2f5cb5]">
            <button 
               onClick={onCancel}
               className="px-4 py-1 bg-white rounded-[3px] text-black text-xs hover:bg-gray-100 active:bg-gray-300 shadow-sm border border-white/50 font-normal"
            >
               Cancel
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ShutdownModal;