
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { COLORS, TEXT } from '../../constants';
import { XPLogo } from '../XPIcons';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Simulate boot time
    const timer = setTimeout(() => {
      onComplete();
    }, 3500); // 3.5 seconds boot time

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white select-none relative overflow-hidden">
      <div className="flex flex-col items-center w-full max-w-2xl p-4 pb-20">
        
        {/* Main Logo Area */}
        <div className="flex items-center justify-center mb-16 scale-110 sm:scale-125">
          <XPLogo className="w-20 h-20 sm:w-24 sm:h-24 mr-4" />
          <div className="flex flex-col leading-none select-none">
            <h1 className="font-bold text-4xl sm:text-6xl tracking-tight font-sans">
              {TEXT.name}
              <sup 
                className="text-2xl sm:text-3xl ml-1 top-[-1.2em]" 
                style={{ color: COLORS.orangeAccent }}
              >
                xp
              </sup>
            </h1>
            <span className="text-lg sm:text-xl italic font-light text-gray-200 ml-1 mt-1">
              {TEXT.role}
            </span>
          </div>
        </div>

        {/* XP Boot Progress Bar Container */}
        <div className="w-[280px] sm:w-[320px] h-[18px] border-[2px] border-[#b2b2b2] rounded-[4px] p-[2px] relative overflow-hidden bg-black">
           
           {/* The Marching Blue Squares Group */}
           <motion.div 
             className="absolute top-[2px] bottom-[2px] flex gap-[2px]"
             initial={{ x: -100 }}
             animate={{ x: 350 }}
             transition={{ 
               repeat: Infinity, 
               duration: 2.5, 
               ease: "linear",
             }}
           >
             {/* 3 Blue Squares */}
             {[0, 1, 2].map((i) => (
               <div 
                 key={i}
                 className="w-[16px] h-full rounded-[2px] shadow-[inset_0_0_2px_rgba(0,0,0,0.5)]"
                 style={{
                    background: 'linear-gradient(to bottom, #5d94fb 0%, #1e4db7 100%)',
                    boxShadow: 'inset 0px 1px 2px rgba(255,255,255,0.4), 0 0 2px rgba(0,0,0,0.5)'
                 }}
               />
             ))}
           </motion.div>

        </div>

        {/* Footer Text */}
        <div className="absolute bottom-8 flex justify-between w-full max-w-4xl px-8 text-xs sm:text-sm text-gray-400 font-sans">
             <span className="opacity-0">.</span> {/* Spacer */}
            <span className="italic">{TEXT.brand} &reg;</span>
        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;
