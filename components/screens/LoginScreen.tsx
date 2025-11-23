import React, { useState } from 'react';
import { COLORS, ASSETS, TEXT } from '../../constants';
import { XPLogo } from '../XPIcons';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [status, setStatus] = useState<'idle' | 'logging-in'>('idle');

  const playLoginSound = () => {
    try {
      const audio = new Audio(ASSETS.soundLogin);
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio autoplay prevented'));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = () => {
    if (status === 'logging-in') return;
    
    // 1. Immediate visual feedback
    setStatus('logging-in');
    
    // 2. Play Sound
    playLoginSound();

    // 3. Wait briefly for effect, then trigger app state change
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#6fa1ea] font-sans overflow-hidden">
      
      {/* Top Decoration Bar */}
      <div className="h-[90px] w-full relative shrink-0" style={{ backgroundColor: COLORS.loginTop }}>
        <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#eef6ff]/40"></div>
      </div>

      {/* Main Body */}
      <div className="flex-1 w-full flex relative">
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ background: `linear-gradient(to bottom, #6fa1ea 0%, #3d74c7 100%)` }}
        />

        {/* Center Content Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center h-full pb-20">
          
          {/* Left: System Logo */}
          <div className="flex-1 flex flex-col items-center md:items-end md:pr-12 mb-12 md:mb-0">
             <div className="flex items-center">
               <XPLogo className="w-20 h-20 md:w-28 md:h-28 drop-shadow-2xl" />
               <div className="ml-4 text-white drop-shadow-md">
                 <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                   {TEXT.name}<sup className="text-2xl text-orange-400">xp</sup>
                 </h1>
                 <p className="text-xl md:text-2xl italic opacity-90">{TEXT.brand}</p>
               </div>
             </div>
             <p className="text-white/70 text-lg mt-4 hidden md:block text-right">
               To begin, click your user name
             </p>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[1px] h-[350px] bg-gradient-to-b from-transparent via-white/50 to-transparent shadow-[1px_0_0_rgba(0,0,0,0.1)]"></div>

          {/* Right: User Tile (The Clickable Part) */}
          <div className="flex-1 flex flex-col items-center md:items-start md:pl-12 w-full">
            
            {/* User Card */}
            <div 
              onClick={handleClick}
              className={`
                group relative flex items-center p-3 pr-8 rounded-xl cursor-pointer transition-all duration-200
                ${status === 'idle' ? 'hover:bg-white/10 hover:shadow-lg border border-transparent hover:border-white/30' : ''}
                ${status === 'logging-in' ? 'opacity-100 scale-100' : ''}
              `}
            >
              {/* Avatar Box */}
              <div className="w-24 h-24 bg-white rounded-[4px] p-1 shadow-lg relative overflow-hidden border-[2px] border-[#e1e1e1]">
                <img 
                  src={ASSETS.avatar} 
                  alt="User" 
                  className="w-full h-full object-cover rounded-[2px]" 
                />
                {/* Gloss effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Text Info */}
              <div className="ml-5 flex flex-col">
                <span className="text-white text-2xl md:text-3xl font-medium drop-shadow-md">
                  {TEXT.name}
                </span>
                
                {status === 'idle' ? (
                  <span className="text-blue-100 text-sm md:text-base italic group-hover:text-white transition-colors">
                    {TEXT.role}
                  </span>
                ) : (
                  <span className="text-white text-sm md:text-base font-bold animate-pulse mt-1">
                    Loading your personal settings...
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="h-[70px] bg-gradient-to-t from-[#194090] to-[#1e4fb8] border-t border-white/30 flex items-center justify-between px-8 relative z-20 shrink-0">
         <div 
           className="flex items-center gap-3 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
           onClick={() => window.location.reload()}
         >
           <div className="w-8 h-8 bg-[#e75a25] rounded-sm flex items-center justify-center border border-white/20 shadow-md">
             <div className="w-1 h-3 bg-white rounded-full"></div>
           </div>
           <span className="text-white font-medium text-shadow">Turn off computer</span>
         </div>

         <div className="text-white/60 text-sm">
           After you log on, you can add or remove accounts.
         </div>
      </div>

    </div>
  );
};

export default LoginScreen;