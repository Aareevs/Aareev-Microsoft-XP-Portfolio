import React, { useState } from 'react';
import { Search, LayoutGrid, List, Star, Globe, Github, Monitor, Smartphone, Cpu, ExternalLink, Instagram } from 'lucide-react';
import { XP_ICONS } from '../../constants';

// --- User's Projects Data ---
const PROJECTS = [
  {
    id: 1,
    title: "Vaani Setu",
    category: "Web & Mobile",
    image: "/vaani-setu-logo.png",
    description: "Vaani Setu is a personalized platform connecting voices across borders. It features an interactive dashboard UI and real-time data visualization built with a modern web stack.",
    problemSolved: "Bridging communication gaps by providing an intuitive, seamless platform for cross-border voice connections with a premium user experience.",
    architecture: [
      "Interactive dashboard UI with glassmorphism",
      "Real-time data visualization and analytics",
      "Seamless backend integration for voice data",
      "Deployed for high performance and accessibility"
    ],
    techStack: ["TypeScript", "React", "Kotlin", "Android"],
    websiteTechStack: ["TypeScript", "React", "CSS", "HTML", "JavaScript", "PostgreSQL (PL/pgSQL)"],
    appTechStack: ["Kotlin", "Android", "HTML"],
    highlights: [
      { icon: <Globe size={14} />, text: "Live production deployment" },
      { icon: <Monitor size={14} />, text: "Modern interactive UI" },
      { icon: <Smartphone size={14} />, text: "Mobile app available" }
    ],
    status: "Completed",
    isFeatured: true,
    isStartup: true,
    demoUrl: "https://vaani-setu-website.vercel.app/",
    githubUrl: "https://github.com/Aareevs/Vaani-Setu-Website", 
    backendUrl: "https://github.com/Aareevs/Vaani-Setu-Mobile-App",
    instagramUrl: "https://www.instagram.com/vaani_setu/"
  },
  {
    id: 2,
    title: "VSX: Buy or Bail",
    category: "Web",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
    description: "A Stock Simulation Event platform for the NOESIS Tech Fest held by Vedam School of Technology. Features real-time stock value updates.",
    architecture: [
      "Real-time stock value engine",
      "Authentication and Event Management"
    ],
    techStack: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Python"],
    status: "Completed",
    isFeatured: true,
    isStartup: false,
    demoUrl: "https://vsx-buy-or-bail.vercel.app/",
    githubUrl: "https://github.com/Aareevs/Stock-Website"
  },
  {
    id: 3,
    title: "VPL-Auction-Website",
    category: "Web",
    image: "/vpl-logo.png",
    description: "An IPL Auction Style area where website contains a dashboard and squad list for teams to see and an admin panel for admin to add players up for auction.",
    architecture: [
      "Interactive Dashboard & Squad List",
      "Admin Panel for Auction Management"
    ],
    techStack: ["TypeScript", "React", "Node.js", "HTML/CSS", "Python"],
    status: "Completed",
    isFeatured: false,
    isStartup: false,
    demoUrl: "https://vedam-premier-league-vpl.vercel.app/",
    githubUrl: "https://github.com/Aareevs/VPL-Auction-Website"
  },
  {
    id: 4,
    title: "AareevSrin XP",
    category: "Web",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c9?auto=format&fit=crop&w=400&q=80",
    description: "A faithful Windows XP-inspired interface custom-built to showcase my work and attention to detail.",
    architecture: [
      "Framer Motion for dragging and animations",
      "React context for window management"
    ],
    techStack: ["React", "TailwindCSS", "Framer Motion"],
    status: "Completed",
    isFeatured: true,
    isStartup: false
  },
  {
    id: 5,
    title: "MacOS-Recreation",
    category: "Web",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    description: "A recreation of the MacOS System that is Interactive and realistic. Inspired by Mitch Ivin.",
    architecture: [
      "Interactive Component Architecture",
      "Realistic OS behaviors & logic"
    ],
    techStack: ["TypeScript", "React", "HTML/CSS", "Framer Motion"],
    isFeatured: false,
    isStartup: false,
    demoUrl: "https://macos-recreation.vercel.app/",
    githubUrl: "https://github.com/Aareevs/MacOS-Recreation"
  },
  {
    id: 6,
    title: "ChronoTask",
    category: "Web",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80",
    description: "The ultimate student productivity hub featuring smart dashboards, task management, focus timers, and community collaboration.",
    architecture: [
      "Smart Dashboards",
      "Task & Schedule Management"
    ],
    techStack: ["TypeScript", "React"],
    status: "Completed",
    isFeatured: false,
    isStartup: false,
    demoUrl: "https://chronotask-phi.vercel.app/#",
    githubUrl: "https://github.com/Aareevs/InnoVedam-Hackathon-Youva"
  },
  {
    id: 7,
    title: "Focus-Time",
    category: "Extension",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
    description: "Focus Time is a browser extension to help you focus on education and priorities. Compatible with Google Chrome, Edge, Brave, Opera, etc.",
    architecture: [
      "Browser Extension APIs",
      "Focus Mode & Tracking"
    ],
    techStack: ["JavaScript", "HTML", "CSS"],
    status: "Completed",
    isFeatured: false,
    isStartup: false,
    githubUrl: "https://github.com/Aareevs/Focus-Time-Extension"
  }
];

interface MyProjectsProps {
  onOpenProject?: (url: string, title: string, width?: number, height?: number) => void;
}

const MyProjects: React.FC<MyProjectsProps> = ({ onOpenProject }) => {
  const [activeTab, setActiveTab] = useState('My Projects');
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const featuredProject = PROJECTS.find(p => p.id === 1);
  const gridProjects = PROJECTS.filter(p => p.id !== 1);
  const shouldShowCompletedCheck = (projectTitle: string) =>
    projectTitle === 'VSX: Buy or Bail' || projectTitle === 'Focus-Time';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#1c1c1e', color: 'white', fontFamily: 'Inter, sans-serif', overflow: 'hidden', userSelect: 'none' }}>

      {/* Main App Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        
        {/* Navigation Tabs - Stationary */}
        <div className="flex-shrink-0 flex items-center px-6 pt-4 border-b border-[#3a3a3c]">
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('My Projects')}
              className={`px-3 py-2 text-[13px] font-medium rounded-t-lg transition-colors ${activeTab === 'My Projects' ? 'bg-[#2c2c2e] text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-[#2c2c2e]/50'}`}
            >
              My Projects
            </button>
            <button 
              onClick={() => setActiveTab('GitHub Repos')}
              className={`px-3 py-2 text-[13px] font-medium rounded-t-lg transition-colors ${activeTab === 'GitHub Repos' ? 'bg-[#2c2c2e] text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-[#2c2c2e]/50'}`}
            >
              GitHub Repos
            </button>
          </div>
        </div>

        {/* Toolbar (Search & Filters) - Stationary */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-[#1c1c1e]">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder={activeTab === 'My Projects' ? "Search projects..." : "Search repositories..."}
              className="w-full bg-[#2c2c2e] border border-[#3a3a3c] rounded-[6px] pl-9 pr-4 py-1.5 text-[13px] text-gray-300 focus:outline-none focus:border-[#5a5a5c] placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Filter Pills (My Projects Only) */}
            {activeTab === 'My Projects' && (
              <div className="flex items-center bg-[#2c2c2e] rounded-md p-1 border border-[#3a3a3c]">
                {['All', 'Featured', '🚀 Startup', 'Web'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 text-[12px] font-medium rounded-[4px] transition-colors ${filter === f ? 'bg-[#4a4a4c] text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
            
            {activeTab === 'My Projects' && <div className="w-[1px] h-5 bg-[#3a3a3c]"></div>}

            {/* View Toggles */}
            <div className="flex items-center bg-[#2c2c2e] rounded-md p-1 border border-[#3a3a3c]">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-[4px] transition-colors ${viewMode === 'grid' ? 'bg-[#4a4a4c] text-white' : 'text-gray-400 hover:text-gray-200'}`}
              >
                <LayoutGrid size={14} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-[4px] transition-colors ${viewMode === 'list' ? 'bg-[#4a4a4c] text-white' : 'text-gray-400 hover:text-gray-200'}`}
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Scrollable Area */}
        {activeTab === 'My Projects' ? (
          <div className="dark-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px 24px', minHeight: 0 }}>
          
          {/* Featured Hero Project */}
          {featuredProject && (
            <div className="mb-8 rounded-xl bg-[#20293a] border border-[#3a445c] flex flex-col xl:flex-row shadow-lg shrink-0 overflow-hidden relative">
              
              {/* Left Side: Image */}
              <div className="w-full xl:w-[45%] relative p-0 xl:p-8 lg:p-6 flex items-center justify-center bg-black/10">
                <div className="absolute top-4 left-4 xl:top-6 xl:left-6 bg-[#fb923c] text-black text-[11px] uppercase font-bold px-3 py-1.5 rounded flex items-center gap-1.5 z-10 shadow-sm cursor-default">
                  <Star size={12} fill="currentColor" />
                  Featured Startup Project
                </div>
                <div className="w-full max-w-[400px] h-[220px] xl:h-[300px] p-4 xl:p-0 flex items-center justify-center">
                  <img 
                    src={featuredProject.image} 
                    alt={featuredProject.title} 
                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full xl:w-[55%] p-6 xl:p-8 xl:pl-6 flex flex-col justify-center pb-24 xl:pb-24">
                
                {/* Title */}
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-[28px] font-bold text-white tracking-tight">{featuredProject.title}</h2>
                  <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 2.5h3L11 22l2-2.5h-3L13 2z"/></svg>
                </div>
                
                {/* Description */}
                <p className="text-[#a0afc0] text-[15px] leading-relaxed mb-6 font-light">
                  {featuredProject.description}
                </p>

                {/* Problem Solved Block */}
                <div className="bg-[#2a364a] border border-[#374151] rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-2 text-[#60a5fa] font-medium mb-2 text-[13px]">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                    Problem Solved
                  </div>
                  <p className="text-[#9ca3af] text-[13px] leading-relaxed">
                    {featuredProject.problemSolved}
                  </p>
                </div>

                {/* Architecture Checkmarks */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-[#34d399] font-medium mb-3 text-[13px]">
                    <Monitor size={14} className="opacity-80" />
                    Architecture
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {featuredProject.architecture.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[#e5e7eb] text-[13px]">
                        <svg className="w-4 h-4 text-[#10b981] shrink-0 mt-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Website + App Stack Breakdown */}
                {(featuredProject.websiteTechStack || featuredProject.appTechStack) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {featuredProject.websiteTechStack && (
                      <div className="bg-[#2a364a]/70 border border-[#374151] rounded-lg p-4">
                        <div className="flex items-center gap-2 text-[#93c5fd] font-medium mb-3 text-[12px] uppercase tracking-wide">
                          <Globe size={13} />
                          Website Stack
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {featuredProject.websiteTechStack.map((tech, idx) => (
                            <span key={`website-${tech}-${idx}`} className="bg-[#1f2937]/60 border border-[#4b5563] text-[#dbeafe] text-[11px] px-2.5 py-1 rounded-md cursor-default">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {featuredProject.appTechStack && (
                      <div className="bg-[#2a364a]/70 border border-[#374151] rounded-lg p-4">
                        <div className="flex items-center gap-2 text-[#86efac] font-medium mb-3 text-[12px] uppercase tracking-wide">
                          <Smartphone size={13} />
                          App Stack
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {featuredProject.appTechStack.map((tech, idx) => (
                            <span key={`app-${tech}-${idx}`} className="bg-[#1f2937]/60 border border-[#4b5563] text-[#dcfce7] text-[11px] px-2.5 py-1 rounded-md cursor-default">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-8 xl:mb-0">
                  {featuredProject.techStack.map((tech, idx) => (
                    <span key={idx} className="bg-[#374151]/60 border border-[#4b5563] text-[#d1d5db] text-[12px] px-3 py-1 rounded-md cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Feature Bar Restored */}
              <div className="absolute bottom-0 left-0 w-full bg-[#18212f]/80 backdrop-blur-md border-t border-[#3a445c] p-4 flex flex-col sm:flex-row items-center justify-between px-6 xl:px-8 shrink-0">
                {/* Action Buttons (Left) */}
                <div className="flex flex-wrap gap-3 mb-3 sm:mb-0">
                  <button 
                    onClick={() => {
                      if (featuredProject.demoUrl) {
                        window.open(featuredProject.demoUrl, '_blank');
                      }
                    }}
                    className="bg-[#24a0ed] hover:bg-[#1a88ce] text-white text-[13px] font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md"
                  >
                    <Globe size={14} />
                    View Live Demo
                    <ArrowRight size={14} className="ml-1" />
                  </button>
                  {featuredProject.githubUrl && featuredProject.githubUrl !== '#' && (
                    <button 
                      onClick={() => window.open(featuredProject.githubUrl, '_blank')}
                      className="bg-[#4b5563] hover:bg-[#6b7280] text-white text-[13px] font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors border border-transparent"
                    >
                      <Github size={14} />
                      Website Repo
                    </button>
                  )}
                  {featuredProject.backendUrl && featuredProject.backendUrl !== '#' && (
                    <button 
                      onClick={() => window.open(featuredProject.backendUrl, '_blank')}
                      className="bg-[#4b5563] hover:bg-[#6b7280] text-white text-[13px] font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors border border-transparent"
                    >
                      <Smartphone size={14} />
                      App Repo
                    </button>
                  )}
                  {/* NEW INSTAGRAM BUTTON */}
                  {featuredProject.instagramUrl && (
                    <button 
                      onClick={() => window.open(featuredProject.instagramUrl, '_blank')}
                      className="bg-[#e1306c] hover:bg-[#c13584] text-white text-[13px] font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-md border border-transparent"
                    >
                      <Instagram size={14} />
                      Instagram
                    </button>
                  )}
                </div>
                
                {/* Highlights (Right) */}
                <div className="hidden xl:flex items-center gap-6">
                  {featuredProject.highlights?.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#9ca3af] text-[12px]">
                      <span className="text-yellow-500/80">{hl.icon}</span>
                      {hl.text}
                    </div>
                  ))}
                  {shouldShowCompletedCheck(featuredProject.title) && (
                    <div className="flex items-center gap-2 text-[#10b981] font-medium text-[12px]">
                      Status: <span className="text-[#34d399] drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Grid Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
            {gridProjects.map(project => (
              <div key={project.id} className="bg-[#242426] border border-[#3a3a3c] hover:border-[#5a5a5c] rounded-xl overflow-hidden flex flex-col group transition-all duration-300">
                
                {/* Image Container */}
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute top-4 left-4 bg-yellow-500/90 text-black text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 z-10 backdrop-blur-sm">
                    <Star size={10} fill="currentColor" />
                    Featured
                  </div>
                  {shouldShowCompletedCheck(project.title) && (
                    <div className="absolute top-4 right-4 bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/30 text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 z-10 backdrop-blur-sm">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      completed
                    </div>
                  )}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-5 backdrop-blur-[2px]">
                    {project.githubUrl && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, '_blank');
                        }}
                        className="bg-[#f3f4f6] text-black text-[16px] font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-white transition-all shadow-xl hover:scale-105"
                      >
                        <Github size={20} />
                        Code
                      </button>
                    )}
                    {project.demoUrl && (
                      <button 
                        className="bg-[#3b82f6] text-white text-[16px] font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-[#2563eb] transition-all shadow-xl hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demoUrl, '_blank');
                        }}
                      >
                        <ExternalLink size={20} />
                        Demo
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer">{project.title}</h3>
                    <span className="bg-[#3a3a3c] text-gray-300 text-[10px] px-2 py-0.5 rounded border border-[#4a4a4c] uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-[13px] line-clamp-2 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-col gap-2 mb-6 mt-auto">
                    {project.architecture.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-gray-400 text-[12px]">
                        <svg className="w-3.5 h-3.5 text-[#34d399] shrink-0 mt-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[#3a3a3c]">
                    {project.techStack.map((tech, idx) => (
                      <span key={tech} className="bg-[#2c2c2e] border border-[#3a3a3c] text-gray-300 text-[11px] px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="bg-[#2c2c2e] border border-[#3a3a3c] text-gray-400 text-[11px] px-2 py-0.5 rounded">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
        ) : (
          <GitHubRepos />
        )}

      </div>

      {/* Footer Area */}
      <div style={{ flexShrink: 0, height: 32, backgroundColor: '#222224', borderTop: '1px solid #3a3a3c', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', fontSize: 12, color: '#9ca3af' }}>
        <span>{activeTab === 'My Projects' ? PROJECTS.length + ' projects' : 'Repositories'}</span>
        <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
          <Star size={12} className="text-yellow-500" />
          <span>stars</span>
        </div>
      </div>
      
    </div>
  );
};

const GitHubRepos: React.FC = () => {
  const [repos, setRepos] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://api.github.com/users/Aareevs/repos?sort=updated&per_page=100')
      .then(res => res.json())
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching repos:", err);
        setLoading(false);
      });
  }, []);

  const getLanguageColor = (lang: string) => {
    switch (lang) {
      case 'TypeScript': return 'bg-[#3178c6]';
      case 'JavaScript': return 'bg-[#f1e05a]';
      case 'Java': return 'bg-[#b07219]';
      case 'HTML': return 'bg-[#e34c26]';
      case 'CSS': return 'bg-[#563d7c]';
      case 'Python': return 'bg-[#3572A5]';
      default: return 'bg-gray-500';
    }
  };

  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const msDiff = now.getTime() - date.getTime();
    const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  return (
    <div className="dark-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px 24px', minHeight: 0 }}>
      {loading ? (
        <div className="flex items-center justify-center p-12 text-gray-400">Loading repositories...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-20">
          {repos.map(repo => (
            <div key={repo.id} className="bg-[#242426] border border-[#3a3a3c] hover:border-[#5a5a5c] rounded-xl p-5 flex flex-col group cursor-pointer transition-colors" onClick={() => window.open(repo.html_url, '_blank')}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2.5 text-white font-semibold text-[15px] group-hover:text-blue-400 transition-colors">
                  <Github size={18} className="shrink-0 mt-0.5" />
                  <span className="truncate block pr-2 overflow-hidden" title={repo.name}>{repo.name}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-[12px] shrink-0">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#3b82f6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>
                    {repo.forks_count}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 text-[13px] line-clamp-2 mb-6 min-h-[40px]">
                {repo.description || 'No description available'}
              </p>
              
              <div className="flex justify-between items-center mt-auto text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`}></span>
                  {repo.language || 'Unknown'}
                </div>
                <span>{timeAgo(repo.updated_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Arrow Right Icon component
const ArrowRight = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default MyProjects;