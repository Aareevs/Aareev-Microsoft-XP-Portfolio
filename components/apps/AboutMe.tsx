

import React, { useState } from 'react';
import { ASSETS, XP_ICONS } from '../../constants';
import { ChevronUp } from 'lucide-react';

const SidebarSection = ({ title, children, isOpen = true }: { title: string, children: React.ReactNode, isOpen?: boolean }) => {
  const [expanded, setExpanded] = useState(isOpen);

  return (
    <div className="mb-3 w-full">
      {/* Header */}
      <div 
        className="relative h-[25px] rounded-t-[3px] overflow-hidden cursor-pointer select-none group"
        onClick={() => setExpanded(!expanded)}
      >
          {/* Background Gradient - Positioned absolutely within the relative parent */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#215dc6] to-[#90b6ea] z-0 group-hover:brightness-110"></div>
          
          {/* Content - Positioned on top with z-10 */}
          <div className="relative z-10 flex items-center justify-between px-3 h-full">
              <span className="font-bold text-white text-[11px] drop-shadow-sm">{title}</span>
              <div className="w-[18px] h-[18px] bg-white/20 rounded-full flex items-center justify-center border border-white/40 shadow-sm transition-opacity group-hover:bg-white/30">
                 <ChevronUp 
                    size={14} 
                    className={`text-white stroke-[3] transition-transform duration-200 ${expanded ? '' : 'rotate-180'}`} 
                 />
              </div>
          </div>
      </div>
      
      {/* Body */}
      <div className={`bg-[#d6dff7] border-l border-r border-b border-white p-3 text-[11px] flex flex-col gap-1.5 transition-all ${!expanded ? 'hidden' : 'block'}`}>
        {children}
      </div>
    </div>
  );
};

const AboutMe = () => {
  const SOFTWARE_ITEMS = [
    { name: 'Adobe CC', icon: XP_ICONS.adobeCc },
    { name: 'Antigravity', icon: XP_ICONS.antigravity },
    { name: 'Trae', icon: XP_ICONS.trae },
    { name: 'Gemini', icon: XP_ICONS.gemini },
    { name: 'ChatGPT', icon: XP_ICONS.chatgpt },
    { name: 'Git/GitHub Copilot', icon: XP_ICONS.copilot },
    { name: 'Figma', icon: XP_ICONS.figma },
    { name: 'WP (Elementor)', icon: XP_ICONS.wordpress },
    { name: 'Blender', icon: XP_ICONS.blender },
  ];

  return (
    <div className="flex h-full w-full bg-[#f6f6f6] overflow-hidden font-sans">
      {/* Blue Sidebar (Left) */}
      <div className="w-[200px] bg-gradient-to-b from-[#748ec2] to-[#627dbe] p-3 overflow-y-auto shrink-0">
        <SidebarSection title="Social Links">
            <div 
                className="flex items-center gap-2 cursor-pointer hover:underline p-1 rounded group"
                onClick={() => window.open('https://instagram.com', '_blank')}
            >
                <img src={XP_ICONS.instagram} className="w-4 h-4 object-contain" /> 
                <span className="text-[#003399] cursor-pointer">Instagram</span>
            </div>
            <div 
                className="flex items-center gap-2 cursor-pointer hover:underline p-1 rounded group"
                onClick={() => window.open('https://github.com', '_blank')}
            >
                <img src={XP_ICONS.github} className="w-4 h-4 object-contain" /> 
                <span className="text-[#003399] cursor-pointer">Github</span>
            </div>
            <div 
                className="flex items-center gap-2 cursor-pointer hover:underline p-1 rounded group"
                onClick={() => window.open('https://linkedin.com', '_blank')}
            >
                <img src={XP_ICONS.linkedin} className="w-4 h-4 object-contain" /> 
                <span className="text-[#003399] cursor-pointer">LinkedIn</span>
            </div>
        </SidebarSection>

        <SidebarSection title="Skills">
             {[
                'Graphic Design', 'Web Design', 'Social Graphics', 
                'Video Production', 'UX/UI Design', 'Attention to Detail', 
                'Creative Thinking', 'Problem Solving'
             ].map(s => (
                 <div key={s} className="flex items-start gap-2 text-[#003399] pl-1">
                    <div className="w-1 h-1 bg-[#003399] rounded-full mt-1.5 shrink-0"></div>
                    <span className="leading-tight">{s}</span>
                 </div>
             ))}
        </SidebarSection>

        <SidebarSection title="Software">
            {SOFTWARE_ITEMS.map(item => (
                 <div key={item.name} className="flex items-center gap-2 text-[#003399] pl-1 cursor-default group">
                    <img src={item.icon} className="w-4 h-4 object-contain drop-shadow-sm" alt={item.name} />
                    <span>{item.name}</span>
                 </div>
             ))}
        </SidebarSection>
      </div>

      {/* Main Content (Right) */}
      <div className="flex-1 bg-white overflow-y-auto">
         {/* Header Area */}
         <div className="bg-gradient-to-r from-[#628ad7] to-[#f6f6f6] p-6 flex items-center justify-between mb-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-white drop-shadow-md">About Me</h1>
            <img src={XP_ICONS.aboutMe} className="w-12 h-12 drop-shadow-md opacity-80" />
         </div>
         
         {/* Body Content */}
         <div className="px-8 pb-12 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
                <div className="shrink-0">
                    <img src="https://i.ibb.co/Fqg16Xn/Mitch-Pixel-Wave.png" alt="Mitch Waving" className="w-32 h-32 object-contain" />
                </div>
                <div className="text-sm leading-relaxed text-gray-800 pt-2">
                    <p className="mb-4">
                        I'm Aareev, a visual designer from Brisbane, Australia. I tackle diverse design challenges and focus on bringing ideas to life, whether that's solving problems for clients or exploring ambitious concepts like recreating an entire operating system in a browser. My foundation started at Brisbane Boys' College, where rugby and academics taught me about discipline, teamwork, and working toward something bigger than yourself.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0 order-1 md:order-2">
                   <img src="https://i.ibb.co/W2Y4qjL/Mitch-Pixel-Flag.png" alt="Mitch Flag" className="w-32 h-32 object-contain" />
                </div>
                <div className="text-sm leading-relaxed text-gray-800 pt-2 order-2 md:order-1">
                    <p className="mb-4">
                        Growing up in New Zealand, I saw how powerful design could be through sport, particularly with rugby and the All Blacks. Every jersey, every logo, every piece of visual identity carried the weight of a nation's pride. It showed me that great design doesn't just communicate, it creates belonging and stirs something deep in people.
                    </p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AboutMe;