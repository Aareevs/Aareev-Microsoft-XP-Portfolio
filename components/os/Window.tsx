

import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Square, ArrowLeft, ArrowRight, Search, ChevronDown } from 'lucide-react';
import { XP_ICONS } from '../../constants';

interface WindowProps {
  title: string;
  icon: string;
  onClose: () => void;
  onMinimize: () => void;
  isFocused: boolean;
  onFocus: () => void;
  zIndex: number;
  children: React.ReactNode;
  address?: string;
  hideToolbar?: boolean;
  initialWidth?: string | number;
  initialHeight?: string | number;
  initialTop?: string | number;
  initialLeft?: string | number;
  initiallyMaximized?: boolean;
  isMinimized?: boolean;
}

const Window: React.FC<WindowProps> = ({
  title,
  icon,
  onClose,
  onMinimize,
  isFocused,
  onFocus,
  zIndex,
  children,
  address = "C:\\",
  hideToolbar = false,
  initialWidth = '800px',
  initialHeight = '600px',
  initialTop = '10%',
  initialLeft = '15%',
  initiallyMaximized = false,
  isMinimized = false
}) => {
  const [isMaximized, setIsMaximized] = useState(initiallyMaximized);
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  // Convert initial dimensions to numbers if they are strings containing 'px'
  const parseDimension = (dim: string | number) => {
    if (typeof dim === 'number') return dim;
    const parsed = parseInt(dim.toString().replace('px', ''), 10);
    return isNaN(parsed) ? 600 : parsed; // fallback
  };

  const [customWidth, setCustomWidth] = useState<number>(parseDimension(initialWidth));
  const [customHeight, setCustomHeight] = useState<number>(parseDimension(initialHeight));
  const [isResizing, setIsResizing] = useState(false);

  // Convert numbers to pixel strings for framer-motion position
  const top = typeof initialTop === 'number' ? `${initialTop}px` : initialTop;
  const left = typeof initialLeft === 'number' ? `${initialLeft}px` : initialLeft;

  // Resize logic
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isResizing || !windowRef.current) return;
      
      const rect = windowRef.current.getBoundingClientRect();
      const newWidth = Math.max(300, e.clientX - rect.left);
      const newHeight = Math.max(200, e.clientY - rect.top);
      
      setCustomWidth(newWidth);
      setCustomHeight(newHeight);
    };

    const handlePointerUp = () => {
      if (isResizing) {
        setIsResizing(false);
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto'; // Re-enable selection
      }
    };

    if (isResizing) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      document.body.style.cursor = 'se-resize';
      document.body.style.userSelect = 'none'; // Prevent selection while dragging
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (isResizing) {
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
      }
    };
  }, [isResizing]);

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized}
      dragMomentum={false}
      dragListener={false} // Disables dragging from anywhere except controls
      dragControls={dragControls}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        width: isMaximized ? '100%' : `${customWidth}px`,
        height: isMaximized ? '100%' : `${customHeight}px`,
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
        top: isMaximized ? 0 : top,
        left: isMaximized ? 0 : left
      }}
      style={{
        zIndex,
        position: 'absolute',
        display: isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        // Remove constraints to ensure exact sizing as requested
        maxHeight: 'none',
        maxWidth: 'none'
      }}
      className={`
        outline-none focus:outline-none bg-transparent shadow-none rounded-none overflow-hidden
      `}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`
          h-[30px] flex items-center justify-between px-2 select-none
          ${isFocused
            ? 'bg-gradient-to-b from-[#0058ee] via-[#3593ff] to-[#288eff]' // Active Blue
            : 'bg-gradient-to-b from-[#7697c7] via-[#8ba7d1] to-[#7697c7]' // Inactive Grayish
          }
        `}
        onPointerDown={(e) => {
          if (!isMaximized) dragControls.start(e);
        }}
      >
        <div className="flex items-center gap-2 text-white font-bold shadow-sm pointer-events-none">
          <img src={icon} alt="" className="w-4 h-4 drop-shadow-md" />
          <span className="text-xs tracking-wide drop-shadow-md truncate max-w-[200px]">{title}</span>
        </div>

        <div className="flex items-center gap-1" onPointerDown={(e) => e.stopPropagation()}>
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-[21px] h-[21px] bg-[#288eff] rounded-[3px] flex items-center justify-center border border-white/40 hover:bg-[#4a9eff] active:bg-[#196ebf]">
            <Minus color="white" size={12} strokeWidth={4} className="mt-2" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }} className="w-[21px] h-[21px] bg-[#288eff] rounded-[3px] flex items-center justify-center border border-white/40 hover:bg-[#4a9eff] active:bg-[#196ebf]">
            <Square color="white" size={10} strokeWidth={3} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-[21px] h-[21px] bg-[#e81123] rounded-[3px] flex items-center justify-center border border-white/40 hover:bg-[#f4606c] active:bg-[#bf0e1d]">
            <X color="white" size={14} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="h-[24px] bg-[#ece9d8] flex items-center px-1 text-xs border-b border-gray-300 select-none">
        <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">File</span>
        <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Edit</span>
        <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">View</span>
        <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Favorites</span>
        <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Tools</span>
        <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help</span>
        <div className="ml-auto flex items-center pr-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Microsoft_logo_%282000-2012%29.svg" className="h-3 opacity-50" alt="Windows" />
        </div>
      </div>

      {/* Toolbar - Standard Explorer Navigation */}
      {!hideToolbar && (
        <div className="bg-[#ece9d8] px-2 py-1 border-b border-gray-400 flex flex-col gap-1 shadow-[inset_0_-2px_2px_rgba(0,0,0,0.05)]">

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0">
              <button className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-black/5 disabled:opacity-50">
                <div className="bg-[#3e9c42] rounded-full p-1 shadow-sm border border-white/30"><ArrowLeft size={14} color="white" /></div>
                <span className="text-xs">Back</span>
                <ChevronDown size={10} />
              </button>
              <button className="p-1 hover:bg-black/5 rounded-full disabled:opacity-50"><div className="bg-[#3e9c42] rounded-full p-1 shadow-sm border border-white/30"><ArrowRight size={14} color="white" /></div></button>
            </div>

            <div className="w-[1px] h-6 bg-gray-400 mx-1" />

            <button className="p-1 hover:bg-black/5 rounded"><img src={XP_ICONS.recent} className="w-6 h-6" alt="folders" /></button>
            <button className="p-1 hover:bg-black/5 rounded"><div className="bg-white border border-gray-400 p-0.5 rounded"><Search size={16} className="text-gray-600" /></div></button>
          </div>

          {/* Address Bar */}
          <div className="flex items-center gap-2 pb-1">
            <span className="text-xs text-gray-500">Address</span>
            <div className="flex-1 bg-white border border-[#7f9db9] h-[22px] flex items-center px-1 shadow-inner">
              <img src={icon} className="w-3 h-3 mr-2 opacity-70" alt="icon" />
              <span className="text-xs flex-1 truncate">{address}</span>
              <ChevronDown size={12} className="text-gray-500" />
            </div>
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1 px-2 bg-[#ece9d8] border border-gray-400 hover:border-black text-xs h-[22px] rounded-[2px]">
                <span className="text-green-600 font-bold">Go</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 bg-transparent overflow-hidden relative flex flex-col min-h-0">
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize z-[9999] flex items-end justify-end p-[2px]"
          style={{ touchAction: 'none' }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFocus();
            setIsResizing(true);
          }}
        >
          {/* XP style resize grabber dots */}
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <g fill="#aabce2">
              <rect x="10" y="10" width="2" height="2" />
              <rect x="6" y="10" width="2" height="2" />
              <rect x="10" y="6" width="2" height="2" />
              <rect x="2" y="10" width="2" height="2" />
              <rect x="6" y="6" width="2" height="2" />
              <rect x="10" y="2" width="2" height="2" />
            </g>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default Window;