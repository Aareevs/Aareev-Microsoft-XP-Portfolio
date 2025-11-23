import React from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isLink?: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onClick }) => {
  return (
    <motion.div 
      className="
        group flex flex-col items-center justify-center w-[84px] py-2 
        cursor-pointer rounded-[2px] border border-transparent 
        hover:bg-white/10 hover:border-white/20 active:bg-[#004e98]/40 
        focus:bg-[#004e98]/40 transition-colors mb-2
      "
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      tabIndex={0}
    >
      <div className="filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] mb-1 transition-transform group-hover:-translate-y-0.5">
        {icon}
      </div>
      <span 
        className="
          text-white text-[12px] font-normal text-center leading-tight px-1
          drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]
          bg-transparent group-focus:bg-[#004e98] group-focus:text-white
        "
        style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.8)' }}
      >
        {label}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;