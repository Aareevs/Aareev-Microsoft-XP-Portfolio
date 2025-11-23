import React, { useEffect, useState } from 'react';
import { StartLogo } from '../XPIcons';
import { XPWindow } from '../../types';
import { Info, ShieldCheck, Monitor, Maximize, Minimize } from 'lucide-react';

interface TaskbarProps {
  onToggleStart: () => void;
  isStartOpen: boolean;
  openWindows: XPWindow[];
  onWindowClick: (id: string) => void;
  onToggleWelcome: () => void;
  onToggleCrt: () => void;
  isCrtEnabled: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  onToggleStart, 
  isStartOpen, 
  openWindows, 
  onWindowClick,
  onToggleWelcome,
  onToggleCrt,
  isCrtEnabled
}) => {
  const [time, setTime] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen for native fullscreen changes to update state if user presses F11
  useEffect(() => {
    const handleFsChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  };

  const TrayIcon = ({ icon: Icon, onClick, title, active = false, color = "text-white" }: { icon: any, onClick: () => void, title: string, active?: boolean, color?: string }) => (
    <button 
      onClick={onClick} 
      title={title}
      className={`
        w-5 h-5 flex items-center justify-center rounded-[2px] hover:bg-[#1941a5]/50 transition-colors cursor-pointer focus:outline-none
        ${active ? 'bg-[#1941a5]/30' : ''}
      `}
    >
       <Icon size={14} className={`${color} drop-shadow-sm`} />
    </button>
  );

  return (
    <div 
      className="fixed bottom-0 left-0 w-full h-[30px] z-[100] select-none flex items-center justify-between shadow-[0_-2px_4px_rgba(0,0,0,0.4)]"
      style={{
        background: `linear-gradient(to bottom, #245edb 0%, #3f8cf3 9%, #245edb 18%, #245edb 92%, #1941a5 100%)`,
        borderTop: '1px solid rgba(255,255,255,0.3)'
      }}
      onClick={(e) => e.stopPropagation()} // Prevent clicks on taskbar from closing things inappropriately
    >
      {/* Start Button */}
      <div className="h-full pl-0.5 py-0.5 sm:w-auto shrink-0">
        <button 
          onClick={onToggleStart}
          className={`
            h-full px-3 sm:pr-6 sm:pl-2 rounded-[0px_12px_12px_0px] 
            flex items-center gap-2 text-white font-bold italic text-shadow shadow-lg
            transition-all hover:brightness-110
            group
            ${isStartOpen ? 'brightness-90 bg-[#2b692e]' : ''}
          `}
          style={{
            background: isStartOpen 
              ? `linear-gradient(to bottom, #2b692e 0%, #4caf50 100%)` // Pressed look
              : `linear-gradient(to bottom, #388e3c 0%, #66bb6a 8%, #388e3c 100%)`, // Default Green
            boxShadow: isStartOpen 
              ? 'inset 1px 1px 3px rgba(0,0,0,0.6)'
              : 'inset 0px 1px 0px rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.6)',
            textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
          }}
        >
          <div className="bg-white rounded-full p-[2px] shadow-inner">
             <StartLogo />
          </div>
          <span className="text-base sm:text-lg tracking-tight group-hover:text-white">start</span>
        </button>
      </div>

      {/* Window List */}
      <div className="flex-1 px-2 flex items-center gap-1 overflow-hidden h-full py-0.5">
         {openWindows.map((win) => (
             <div 
                key={win.id}
                onClick={() => onWindowClick(win.id)}
                className={`
                   w-[160px] h-full rounded-[2px] px-2 flex items-center gap-2 cursor-pointer
                   ${!win.isMinimized 
                      ? 'bg-[#1e50ad] shadow-[inset_1px_2px_4px_rgba(0,0,0,0.4)] border border-[#103475]' // Active/Pressed
                      : 'bg-[#3c81f3] hover:bg-[#5392f5] shadow-[1px_1px_2px_rgba(0,0,0,0.5)] border border-[#103475]'} 
                `}
             >
                <img src={win.icon} alt="" className="w-4 h-4" />
                <span className="text-white text-xs truncate drop-shadow-md">{win.title}</span>
             </div>
         ))}
      </div>

      {/* System Tray */}
      <div 
        className="h-full bg-[#0b70ce] border-l border-[#123d88] shadow-[inset_1px_2px_3px_rgba(0,0,0,0.2)] flex items-center px-3 gap-3 text-white text-xs font-normal shrink-0"
        style={{ background: 'linear-gradient(to bottom, #1290e8 0%, #0b70ce 10%, #0b70ce 100%)' }}
      >
        {/* Tray Icons */}
        <div className="flex gap-1 items-center mr-2">
           <TrayIcon 
             icon={Info} 
             onClick={onToggleWelcome} 
             title="About this interface" 
             color="text-[#67cbf7]" 
           />
           <TrayIcon 
             icon={ShieldCheck} 
             onClick={onToggleCrt} 
             title="Toggle CRT Effect" 
             active={isCrtEnabled} 
             color={isCrtEnabled ? "text-[#4ade80]" : "text-gray-300"} 
           />
           <TrayIcon 
             icon={isFullscreen ? Minimize : Monitor} 
             onClick={handleFullScreen} 
             title="Toggle Fullscreen" 
           />
        </div>
        
        <span className="drop-shadow-md whitespace-nowrap cursor-default">{time}</span>
      </div>
    </div>
  );
};

export default Taskbar;