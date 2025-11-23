










import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS, TEXT, XP_ICONS } from '../../constants';
import { ChevronRight } from 'lucide-react';

// Recently Used Items configuration
const RECENT_ITEMS = [
  { label: 'Adobe After Effects', icon: XP_ICONS.adobeAe },
  { label: 'Adobe Illustrator', icon: XP_ICONS.adobeAi },
  { label: 'Adobe InDesign', icon: XP_ICONS.adobeId },
  { label: 'Adobe Photoshop', icon: XP_ICONS.adobePs },
  { label: 'Adobe Premiere Pro', icon: XP_ICONS.adobePr },
  { label: 'Blender', icon: XP_ICONS.blender },
  { label: 'ChatGPT', icon: XP_ICONS.chatgpt },
  { label: 'Gemini', icon: XP_ICONS.gemini },
  { label: 'Trae', icon: XP_ICONS.trae },
  { label: 'Davinci Resolve', icon: XP_ICONS.davinci },
  { label: 'Antigravity', icon: XP_ICONS.antigravity },
  { label: 'GitHub CoPilot', icon: XP_ICONS.copilot },
  { label: 'OBS Studio', icon: XP_ICONS.obs },
  { label: 'Wordpress', icon: XP_ICONS.wordpress },
];

interface StartMenuItemProps {
  icon: string;
  label: string;
  subLabel?: string;
  isBold?: boolean;
  hasArrow?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const StartMenuItem: React.FC<StartMenuItemProps> = ({ icon, label, subLabel, isBold, hasArrow, onClick, onMouseEnter, onMouseLeave }) => (
  <div 
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="flex items-center px-2 py-1 cursor-default text-black hover:bg-[#316ac5] hover:text-white group transition-colors duration-75 relative"
  >
    <img src={icon} alt={label} className="w-8 h-8 mr-2 object-contain drop-shadow-sm" />
    <div className="flex flex-col justify-center">
      <span className={`${isBold ? 'font-bold' : 'font-normal'} text-sm leading-tight`}>
        {label}
      </span>
      {subLabel && (
        <span className="text-[10px] text-gray-500 group-hover:text-blue-100 leading-tight">
          {subLabel}
        </span>
      )}
    </div>
    {hasArrow && <ChevronRight className="ml-auto text-gray-400 group-hover:text-white w-4 h-4" />}
  </div>
);

const StartMenuRightItem: React.FC<StartMenuItemProps> = ({ icon, label, isBold, hasArrow, onClick, onMouseEnter, onMouseLeave }) => (
  <div 
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="flex items-center px-2 py-[3px] cursor-default hover:bg-[#316ac5] hover:text-white group transition-colors duration-75 relative"
  >
    <img src={icon} alt={label} className="w-6 h-6 mr-2 object-contain" />
    <span className={`text-sm ${isBold ? 'font-bold text-[#00135c] group-hover:text-white' : 'text-[#00135c] group-hover:text-white'}`}>
      {label}
    </span>
    {hasArrow && <ChevronRight className="ml-auto text-[#00135c] group-hover:text-white w-4 h-4" />}
  </div>
);

const AllProgramsItem: React.FC<{ icon: string, label: string, hasArrow?: boolean, onMouseEnter?: () => void, onClick?: () => void }> = ({ icon, label, hasArrow, onMouseEnter, onClick }) => (
  <div 
    className="flex items-center px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer text-xs text-black group relative"
    onMouseEnter={onMouseEnter}
    onClick={onClick}
  >
    <img src={icon} alt={label} className="w-4 h-4 mr-2 object-contain" />
    <span>{label}</span>
    {hasArrow && <ChevronRight className="ml-auto w-3 h-3 text-black group-hover:text-white" />}
  </div>
);

const RecentItem: React.FC<{ icon: string, label: string }> = ({ icon, label }) => (
  <div className="flex items-center px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer text-[11px] text-black group">
    <img src={icon} alt={label} className="w-3.5 h-3.5 mr-2 object-contain opacity-90" />
    <span className="truncate">{label}</span>
  </div>
);

interface StartMenuProps {
  onItemClick?: (id: string) => void;
  onShutdownClick?: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onItemClick, onShutdownClick }) => {
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [activeProgramFolder, setActiveProgramFolder] = useState<string | null>(null);

  const handleClick = (id: string) => {
    if (onItemClick) {
      onItemClick(id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-[30px] left-0 w-[380px] sm:w-[420px] rounded-tl-lg rounded-tr-lg shadow-[4px_4px_8px_rgba(0,0,0,0.5)] overflow-visible flex flex-col font-sans select-none z-[60]"
      style={{ 
        background: '#fff',
        border: '1px solid #316ac5',
        borderBottom: 'none'
      }}
    >
      {/* Header */}
      <div 
        className="h-[60px] relative flex items-center px-2 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.3)] rounded-tl-[5px] rounded-tr-[5px]"
        style={{ background: 'linear-gradient(to bottom, #1e52b7 0%, #2a6bd9 4%, #1647a7 100%)' }}
      >
         <div className="w-12 h-12 rounded-[4px] border-[2px] border-white/60 bg-white overflow-hidden shadow-sm relative z-10">
           <img src={ASSETS.avatar} alt="User" className="w-full h-full object-cover" />
         </div>
         <span className="text-white font-bold text-lg ml-3 drop-shadow-md truncate">
           {TEXT.name}
         </span>
         {/* Header Top Highlight Line */}
         <div className="absolute top-0 left-0 w-full h-[2px] bg-orange-400/50 opacity-50"></div>
      </div>

      {/* Body */}
      <div className="flex flex-1 h-full border-t border-[#e58945] relative">
        
        {/* Left Column (White) */}
        <div className="flex-1 bg-white flex flex-col py-2 pl-1 pr-1 min-h-[360px]">
          <StartMenuItem 
            icon={XP_ICONS.projects} 
            label="Internet Explorer" 
            subLabel="View my work"
            isBold 
            onClick={() => handleClick('projects')}
          />
          <StartMenuItem 
            icon={XP_ICONS.contact} 
            label="Contact Me" 
            subLabel="Send me a message"
            isBold 
            onClick={() => handleClick('contact')}
          />
          
          <div className="my-1 mx-2 border-b border-gray-200" />
          
          <StartMenuItem icon={XP_ICONS.aboutMe} label="About Me" onClick={() => handleClick('aboutme')} />
          <StartMenuItem icon={XP_ICONS.gemini} label="Gemini" onClick={() => handleClick('gemini')} />
          
          <div className="my-1 mx-2 border-b border-gray-200" />

          <StartMenuItem icon={XP_ICONS.mediaPlayer} label="Windows Media Player" />
          <StartMenuItem icon={XP_ICONS.paint} label="Paint" />
          <StartMenuItem icon={XP_ICONS.music} label="Music Player" onClick={() => handleClick('music')} />

          {/* All Programs Button Area */}
          <div className="mt-auto flex justify-center pt-2 pb-1 relative">
             <div 
               className={`
                 w-full flex items-center justify-center px-2 py-1 cursor-pointer group z-20 relative
                 ${showAllPrograms ? 'bg-[#316ac5] text-white' : 'hover:bg-[#316ac5] hover:text-white text-gray-700'}
               `}
               onClick={() => setShowAllPrograms(!showAllPrograms)}
               onMouseEnter={() => setShowAllPrograms(true)}
             >
               <span className={`font-bold text-xs ${showAllPrograms ? 'text-white' : 'group-hover:text-white'}`}>All Programs</span>
               <div 
                 className={`ml-2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] 
                   ${showAllPrograms ? 'border-l-white' : 'border-l-green-600 group-hover:border-l-white'}`}
               ></div>
             </div>

             {/* All Programs Popup Menu */}
             <AnimatePresence>
               {showAllPrograms && (
                 <motion.div 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -10 }}
                   transition={{ duration: 0.1 }}
                   className="absolute bottom-[-2px] left-[100%] ml-[-5px] w-[200px] bg-white border border-[#316ac5] shadow-[4px_4px_8px_rgba(0,0,0,0.3)] py-1 z-50 flex flex-col gap-0.5"
                   onMouseLeave={() => {
                       setShowAllPrograms(false);
                       setActiveProgramFolder(null);
                   }}
                 >
                    <div className="bg-[#ece9d8] px-2 py-1 font-bold text-xs text-gray-500 border-b border-gray-300 mb-1">AareevSrin XP</div>
                    
                    <AllProgramsItem icon={XP_ICONS.folder} label="Accessories" hasArrow onMouseEnter={() => setActiveProgramFolder('accessories')} />
                    
                    {/* Games Folder with Interaction */}
                    <div className="relative">
                        <AllProgramsItem 
                            icon={XP_ICONS.folder} 
                            label="Games" 
                            hasArrow 
                            onMouseEnter={() => setActiveProgramFolder('games')} 
                        />
                         {/* Recursive Sub-menu for Games */}
                         <AnimatePresence>
                            {activeProgramFolder === 'games' && (
                                <motion.div
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="absolute top-0 left-[100%] ml-[-2px] w-[180px] bg-white border border-[#316ac5] shadow-[2px_2px_5px_rgba(0,0,0,0.3)] py-1 z-[55] flex flex-col"
                                >
                                     <AllProgramsItem 
                                        icon={XP_ICONS.smashkarts} 
                                        label="Smash Karts" 
                                        onClick={() => handleClick('game-smashkarts')} 
                                     />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Startup Folder with Interaction */}
                    <div className="relative">
                        <AllProgramsItem 
                            icon={XP_ICONS.folder} 
                            label="Startup" 
                            hasArrow 
                            onMouseEnter={() => setActiveProgramFolder('startup')} 
                        />
                        {/* Recursive Sub-menu for Startup */}
                        <AnimatePresence>
                            {activeProgramFolder === 'startup' && (
                                <motion.div
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="absolute top-0 left-[100%] ml-[-2px] w-[180px] bg-white border border-[#316ac5] shadow-[2px_2px_5px_rgba(0,0,0,0.3)] py-1 z-[55] flex flex-col"
                                >
                                     <AllProgramsItem 
                                        icon={XP_ICONS.vaaniSetu} 
                                        label="Vaani Setu" 
                                        onClick={() => handleClick('vaani-setu')} 
                                     />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <AllProgramsItem icon={XP_ICONS.projects} label="Internet Explorer" onMouseEnter={() => setActiveProgramFolder(null)} />
                    <AllProgramsItem icon={XP_ICONS.contact} label="Outlook Express" onMouseEnter={() => setActiveProgramFolder(null)} />
                    <AllProgramsItem icon={XP_ICONS.mediaPlayer} label="Windows Media Player" onMouseEnter={() => setActiveProgramFolder(null)} />
                    <AllProgramsItem icon={XP_ICONS.msn} label="Windows Messenger" onMouseEnter={() => setActiveProgramFolder(null)} />
                    <AllProgramsItem icon={XP_ICONS.notepad} label="Notepad" onMouseEnter={() => setActiveProgramFolder(null)} />
                    <AllProgramsItem icon={XP_ICONS.calc} label="Calculator" onMouseEnter={() => setActiveProgramFolder(null)} />
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>

        {/* Right Column (Light Blue) */}
        <div className="w-[180px] bg-[#d3e5fa] border-l border-[#9cbce8] flex flex-col py-2 px-1 text-[#00135c] relative">
           <StartMenuRightItem icon={XP_ICONS.instagram} label="Instagram" isBold onClick={() => window.open('https://instagram.com', '_blank')} />
           <StartMenuRightItem icon={XP_ICONS.github} label="Github" isBold onClick={() => window.open('https://github.com', '_blank')} />
           <StartMenuRightItem icon={XP_ICONS.linkedin} label="LinkedIn" isBold onClick={() => window.open('https://linkedin.com', '_blank')} />
           
           <div className="my-1 mx-2 border-b border-[#aebcd8]" />

           {/* Recently Used with Submenu */}
           <div 
             className="relative"
             onMouseEnter={() => setShowRecent(true)}
             onMouseLeave={() => setShowRecent(false)}
           >
              <StartMenuRightItem 
                 icon={XP_ICONS.recent} 
                 label="Recently Used" 
                 hasArrow
              />
              
              <AnimatePresence>
                {showRecent && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.1 }}
                    // Positioned to the LEFT of the Start Menu
                    className="absolute top-[-40px] right-[100%] mr-[5px] w-[220px] bg-white border border-[#316ac5] shadow-[4px_4px_8px_rgba(0,0,0,0.3)] py-0.5 z-50 flex flex-col"
                  >
                    {RECENT_ITEMS.map((item, idx) => (
                       <RecentItem key={idx} icon={item.icon} label={item.label} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
           
           <div className="my-1 mx-2 border-b border-[#aebcd8]" />
           
           <StartMenuRightItem icon={XP_ICONS.cmd} label="Command Prompt" />
           <StartMenuRightItem icon={XP_ICONS.imageViewer} label="Image Viewer" />
           <StartMenuRightItem icon={XP_ICONS.resume} label="My Resume" onClick={() => handleClick('resume')} />
        </div>

      </div>

      {/* Footer */}
      <div 
        className="h-[40px] flex items-center justify-end px-3 gap-3 text-white text-sm shadow-[inset_0_3px_3px_rgba(0,0,0,0.1)]"
        style={{ background: 'linear-gradient(to bottom, #4282d6 0%, #316ac5 100%)' }}
      >
         <div 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onShutdownClick}
         >
            <img src={XP_ICONS.logoff} alt="Log Off" className="w-5 h-5 bg-[#e59637] rounded-[2px] p-[1px] border border-white/30" />
            <span className="drop-shadow-sm">Log Off</span>
         </div>
         
         <div 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity ml-2"
            onClick={onShutdownClick}
         >
            <img src={XP_ICONS.shutdown} alt="Shut Down" className="w-5 h-5 bg-[#cd381a] rounded-[2px] p-[1px] border border-white/30" />
            <span className="drop-shadow-sm">Shut Down</span>
         </div>
      </div>
    </motion.div>
  );
};

export default StartMenu;
