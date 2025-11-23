
import React, { useState } from 'react';
import { Search, LayoutGrid, Image as ImageIcon, Globe, Video, User, Lightbulb, Github, Instagram, Linkedin } from 'lucide-react';
import { XP_ICONS } from '../../constants';

const PROJECTS = [
  {
    id: 1,
    title: "Vaani Setu",
    category: "Start Up",
    image: XP_ICONS.vaaniSetu,
    count: "v1.0",
    color: "bg-[#0b0b0b]"
  },
  {
    id: 2,
    title: "Keep The Score",
    category: "Client Work • Web",
    image: "https://i.ibb.co/W2Y4qjL/Mitch-Pixel-Flag.png", 
    count: "Live",
    color: "bg-[#1e4fb8]"
  },
  {
    id: 3,
    title: "Game Day Graphics",
    category: "Personal Work • Image",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
    count: "4 Items",
    color: "bg-[#e75a25]"
  },
  {
    id: 4,
    title: "AareevSrin XP",
    category: "Personal Work • Web",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c9?auto=format&fit=crop&w=400&q=80",
    count: "5 Items",
    color: "bg-[#2aa01b]"
  }
];

const SidebarItem = ({ icon: Icon, label, isActive = false }: { icon: any, label: string, isActive?: boolean }) => (
  <div className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${isActive ? 'text-white bg-white/10 border-l-2 border-red-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
    <Icon size={18} />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const ProjectCard = ({ project, onClick }: { project: any, onClick?: () => void }) => (
  <div onClick={onClick} className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-all cursor-pointer group">
    {/* Card Image Area */}
    <div className={`h-[160px] w-full ${project.color} relative overflow-hidden flex items-center justify-center`}>
      <img src={project.image} className="h-[60%] w-auto object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" alt={project.title} />
      
      {/* Badge */}
      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm border border-white/10">
        {project.count}
      </div>
    </div>
    
    {/* Card Footer */}
    <div className="p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
            <img src="https://i.ibb.co/Mxys1Yqw/Aareev-Professional-Pic.png" className="w-full h-full object-cover" alt="Author" />
        </div>
        <div className="flex flex-col">
            <span className="text-white text-sm font-bold">{project.title}</span>
            <span className="text-gray-500 text-xs">{project.category}</span>
        </div>
    </div>
  </div>
);

interface MyProjectsProps {
  onOpenProject?: (url: string, title: string) => void;
}

const MyProjects: React.FC<MyProjectsProps> = ({ onOpenProject }) => {
  const [activeTab, setActiveTab] = useState('All');

  const handleVaaniClick = () => {
    if (onOpenProject) {
      onOpenProject('https://vaani-setu-website.vercel.app/', 'Vaani Setu');
    }
  };

  return (
    <div className="flex h-full w-full bg-black text-white font-sans">
      
      {/* Sidebar */}
      <div className="w-[200px] bg-[#0f0f0f] flex flex-col border-r border-gray-800 pt-6 shrink-0">
         <SidebarItem icon={LayoutGrid} label="All" isActive={activeTab === 'All'} />
         <SidebarItem icon={ImageIcon} label="Image" />
         <SidebarItem icon={Globe} label="Web" />
         <SidebarItem icon={Video} label="Video" />
         <SidebarItem icon={User} label="Client" />
         <SidebarItem icon={Lightbulb} label="Personal" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#000000] overflow-hidden">
        
        {/* Top Bar */}
        <div className="h-[70px] border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-2">
                <div className="bg-red-600 p-1.5 rounded-lg">
                    <User size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">MyProjects</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="bg-[#1a1a1a] border border-gray-700 rounded-full pl-10 pr-4 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-gray-500 w-[240px]"
                    />
                </div>
                <div className="flex items-center gap-3 border-l border-gray-700 pl-4">
                    <Linkedin className="text-gray-400 hover:text-white cursor-pointer" size={20} />
                    <Instagram className="text-gray-400 hover:text-white cursor-pointer" size={20} />
                    <Github className="text-gray-400 hover:text-white cursor-pointer" size={20} />
                </div>
            </div>
        </div>

        {/* Hero / Featured Area */}
        <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Featured Item 1 (Vaani Setu) */}
                 <div 
                    className="bg-[#0b0b0b] rounded-xl p-1 border border-gray-800 relative overflow-hidden group cursor-pointer aspect-video shadow-lg"
                    onClick={handleVaaniClick}
                 >
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#000000]">
                        <img src={XP_ICONS.vaaniSetu} className="w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500" alt="Vaani Setu" />
                        <span className="absolute bottom-8 text-white font-bold text-2xl tracking-tight">Vaani Setu</span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs font-mono border border-purple-500/30">Start Up</div>
                 </div>

                 {/* Featured Item 2 (Promo) */}
                 <div className="bg-gradient-to-br from-[#1a0b4b] to-[#4a1b9b] rounded-xl p-8 border border-gray-800 relative flex flex-col justify-center shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">Bridging communication gaps with AI</h2>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        Vaani Setu leverages advanced generative models to create seamless voice-to-voice interactions, breaking down language barriers in real-time.
                    </p>
                    <button 
                      onClick={handleVaaniClick}
                      className="bg-[#00c853] text-white font-bold py-2 px-6 rounded w-max hover:bg-[#00e676] transition-colors text-sm shadow-md"
                    >
                        View Project &gt;
                    </button>
                 </div>
            </div>

            {/* Grid of other projects */}
            <div className="mt-8">
                <h3 className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-4">Recent Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {PROJECTS.map(p => (
                        <ProjectCard 
                          key={p.id} 
                          project={p} 
                          onClick={p.title === "Vaani Setu" ? handleVaaniClick : undefined}
                        />
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default MyProjects;