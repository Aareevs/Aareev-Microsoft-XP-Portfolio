
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS, XP_ICONS } from '../../constants';
import Taskbar from '../os/Taskbar';
import DesktopIcon from '../os/DesktopIcon';
import StartMenu from '../os/StartMenu';
import Window from '../os/Window';
import ShutdownModal from './ShutdownModal';
import { XPWindow } from '../../types';
import { Info, X } from 'lucide-react';
import MyProjects from '../apps/MyProjects';
import AboutMe from '../apps/AboutMe';
import GeminiApp from '../apps/GeminiApp';
import MyResume from '../apps/MyResume';
import ContactMe from '../apps/ContactMe';
import MusicPlayer from '../apps/MusicPlayer';

interface DesktopScreenProps {
  onRestart: () => void;
  onLogOut: () => void;
  isCrtEnabled: boolean;
  toggleCrt: () => void;
}

interface CustomWindowProps {
  initialWidth?: string | number;
  initialHeight?: string | number;
}

const DesktopScreen: React.FC<DesktopScreenProps> = ({ onRestart, onLogOut, isCrtEnabled, toggleCrt }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [showShutdownModal, setShowShutdownModal] = useState(false);
  const [windows, setWindows] = useState<(XPWindow & CustomWindowProps)[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  useEffect(() => {
    // Check if we've shown the welcome balloon in this session
    const hasSeen = sessionStorage.getItem('xp_welcome_seen');
    if (!hasSeen) {
      // Show after 1.5s
      const showTimer = setTimeout(() => {
        setShowWelcome(true);
        sessionStorage.setItem('xp_welcome_seen', 'true');
      }, 1500);

      // Hide after 8s (1.5s + 8s = 9.5s total)
      const hideTimer = setTimeout(() => {
        setShowWelcome(false);
      }, 9500);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  const openWindow = (id: string, title: string, icon: string, type: 'explorer' | 'browser' | 'system', content: React.ReactNode, hideToolbar = false, customProps: CustomWindowProps = {}) => {
    // Check if window already exists
    const existingWindow = windows.find(w => w.id === id);
    
    if (existingWindow) {
      // If minimized, restore it
      if (existingWindow.isMinimized) {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w));
        setNextZIndex(prev => prev + 1);
      } else {
        // Just focus it
        focusWindow(id);
      }
    } else {
      // Create new window
      const newWindow: XPWindow & CustomWindowProps = {
        id,
        title,
        icon,
        type,
        isOpen: true,
        isMinimized: false,
        zIndex: nextZIndex,
        content,
        ...customProps
      };
      setWindows(prev => [...prev, newWindow]);
      setNextZIndex(prev => prev + 1);
    }
    setIsStartOpen(false);
  };

  const handleOpenWebLink = (url: string, title: string) => {
    openWindow(
      `web-${title.toLowerCase().replace(/\s+/g, '-')}`, 
      title, 
      XP_ICONS.projects, 
      'browser', 
      <iframe src={url} className="w-full h-full border-none" title={title} />
    );
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
    setNextZIndex(prev => prev + 1);
  };

  const handleDesktopClick = () => {
    if (isStartOpen) setIsStartOpen(false);
  };

  const handleStartMenuItemClick = (id: string) => {
    switch (id) {
      case 'gemini':
        openWindow('gemini', 'Gemini', XP_ICONS.gemini, 'browser', <GeminiApp />);
        break;
      case 'projects':
        openWindow('projects', 'My Projects', XP_ICONS.projects, 'browser', <MyProjects onOpenProject={handleOpenWebLink} />);
        break;
      case 'aboutme':
        openWindow('aboutme', 'About Me', XP_ICONS.aboutMe, 'explorer', <AboutMe />);
        break;
      case 'resume':
        openWindow('resume', 'My Resume', XP_ICONS.resume, 'system', <MyResume />, true);
        break;
      case 'contact':
        openWindow('contact', 'Contact Me', XP_ICONS.contact, 'system', <ContactMe />, true);
        break;
      case 'music':
        openWindow(
          'music', 
          'Music Player', 
          XP_ICONS.music, 
          'system', 
          <MusicPlayer />, 
          true,
          { initialWidth: 380, initialHeight: 220 }
        );
        break;
      case 'vaani-setu':
        handleOpenWebLink('https://vaani-setu-website.vercel.app/', 'Vaani Setu');
        break;
      case 'game-smashkarts':
        openWindow(
          'game-smashkarts', 
          'Smash Karts', 
          XP_ICONS.smashkarts, 
          'browser', 
          <iframe 
            src="https://smashkarts.io/" 
            className="w-full h-full border-none" 
            title="Smash Karts"
            allow="autoplay *; fullscreen *; gyroscope; accelerometer; magnetometer; gamepad *; clipboard-write; pointer-lock"
            allowFullScreen
          />, 
          true // Hide toolbar as requested to make it look more like a game app
        );
        break;
      default:
        console.log(`App ${id} not implemented yet`);
    }
  };

  const handleShutdownClick = () => {
    setIsStartOpen(false);
    setShowShutdownModal(true);
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      
      {/* The "Gray-able" Desktop Content */}
      <div 
        className={`w-full h-full transition-all duration-500 ease-in-out xp-cursor ${showShutdownModal ? 'grayscale-[100%] pointer-events-none' : ''}`}
        onClick={handleDesktopClick}
      >
        {/* Wallpaper */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${ASSETS.wallpaper})` }}
        />
        
        {/* Pixel Grid Overlay (subtle) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '4px 4px' }}>
        </div>

        {/* Desktop Icons Area */}
        <div className="relative z-10 w-full h-full p-4 flex flex-col items-start content-start flex-wrap gap-4">
          
          <DesktopIcon 
            label="About Me" 
            icon={
              <img 
                src={XP_ICONS.aboutMe} 
                alt="About Me" 
                className="w-12 h-12 object-contain drop-shadow-md pointer-events-none" 
              />
            } 
            onClick={() => openWindow('aboutme', 'About Me', XP_ICONS.aboutMe, 'explorer', <AboutMe />)}
          />
          
          <DesktopIcon 
            label="My Resume" 
            icon={
              <img 
                src={XP_ICONS.resume} 
                alt="My Resume" 
                className="w-12 h-12 object-contain drop-shadow-md pointer-events-none" 
              />
            } 
            onClick={() => openWindow('resume', 'My Resume', XP_ICONS.resume, 'system', <MyResume />, true)}
          />
          
          <DesktopIcon 
            label="My Projects" 
            icon={
              <img 
                src={XP_ICONS.projects} 
                alt="My Projects" 
                className="w-12 h-12 object-contain drop-shadow-md pointer-events-none" 
              />
            } 
            onClick={() => openWindow('projects', 'My Projects', XP_ICONS.projects, 'browser', <MyProjects onOpenProject={handleOpenWebLink} />)}
          />
          
          <DesktopIcon 
            label="Contact Me" 
            icon={
              <img 
                src={XP_ICONS.contact} 
                alt="Contact Me" 
                className="w-12 h-12 object-contain drop-shadow-md pointer-events-none" 
              />
            } 
            onClick={() => openWindow('contact', 'Contact Me', XP_ICONS.contact, 'system', <ContactMe />, true)}
          />

        </div>

        {/* Render Windows */}
        <AnimatePresence>
          {windows.map(win => (
            <Window
              key={win.id}
              title={win.title}
              icon={win.icon}
              zIndex={win.zIndex}
              isFocused={win.zIndex === nextZIndex - 1}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
              address={
                  win.id === 'projects' ? 'https://www.myprojects.com' : 
                  win.id === 'gemini' ? 'https://gemini.google.com/app' : 
                  win.id.startsWith('web-') ? 'https://' + win.title.toLowerCase().replace(/\s/g, '') + '.com' : 
                  win.title
              }
              hideToolbar={win.id === 'resume' || win.id === 'contact' || win.id === 'game-smashkarts' || win.id === 'music'}
              initialWidth={win.initialWidth}
              initialHeight={win.initialHeight}
              isMinimized={win.isMinimized}
            >
              {win.content}
            </Window>
          ))}
        </AnimatePresence>

        {/* Welcome Balloon Notification */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              // High z-index to be above windows and taskbar elements
              className="absolute bottom-[40px] right-4 z-[500] max-w-xs bg-[#ffffe1] border border-black rounded-[6px] shadow-[2px_2px_5px_rgba(0,0,0,0.5)] text-black p-0 overflow-hidden"
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-[#3888e9] to-[#2262b8] px-2 py-1 border-b border-gray-300">
                <span className="font-bold text-white text-xs">Welcome to AareevSrin XP</span>
                <button onClick={() => setShowWelcome(false)} className="text-white/80 hover:bg-white/20 rounded p-0.5">
                  <X size={12} />
                </button>
              </div>
              <div className="p-3 flex gap-3">
                <Info size={32} className="text-blue-600 shrink-0 mt-1" />
                <div className="text-xs leading-relaxed text-gray-800">
                  <p className="font-bold mb-1">A faithful XP-inspired interface.</p>
                  <p>Custom-built to showcase my work and attention to detail.</p>
                  <div className="mt-2 flex gap-2 text-blue-700 underline cursor-pointer">
                     <span onClick={() => { setShowWelcome(false); openWindow('aboutme', 'About Me', XP_ICONS.aboutMe, 'explorer', <AboutMe />); }}>About Me</span>
                     <span onClick={() => { setShowWelcome(false); openWindow('projects', 'My Projects', XP_ICONS.projects, 'browser', <MyProjects onOpenProject={handleOpenWebLink} />); }}>My Projects</span>
                  </div>
                </div>
              </div>
              {/* Little arrow pointing down */}
              <div className="absolute -bottom-[6px] right-8 w-3 h-3 bg-[#ffffe1] border-r border-b border-black rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start Menu */}
        <AnimatePresence>
          {isStartOpen && (
             <StartMenu 
                onItemClick={handleStartMenuItemClick} 
                onShutdownClick={handleShutdownClick}
             />
          )}
        </AnimatePresence>

        {/* Taskbar */}
        <Taskbar 
          onToggleStart={() => setIsStartOpen(!isStartOpen)} 
          isStartOpen={isStartOpen}
          openWindows={windows}
          onWindowClick={(id) => {
              const win = windows.find(w => w.id === id);
              if (win?.isMinimized) {
                  focusWindow(id); 
                  setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
              } else {
                  if (win?.zIndex === nextZIndex - 1) {
                      minimizeWindow(id);
                  } else {
                      focusWindow(id);
                  }
              }
          }}
          onToggleWelcome={() => setShowWelcome(prev => !prev)}
          onToggleCrt={toggleCrt}
          isCrtEnabled={isCrtEnabled}
        />
      </div>

      {/* SHUTDOWN MODAL (Outside grayscale wrapper) */}
      <AnimatePresence>
        {showShutdownModal && (
          <ShutdownModal 
            onRestart={onRestart} 
            onLogOff={onLogOut} 
            onCancel={() => setShowShutdownModal(false)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default DesktopScreen;
