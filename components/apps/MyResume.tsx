

import React, { useRef, useState } from 'react';
import { ZoomIn, Save, Printer, Mail, MapPin, User, Briefcase, Globe } from 'lucide-react';
import { TEXT, ASSETS, COLORS } from '../../constants';

const ToolbarButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => (
  <button 
    className="flex flex-col items-center justify-center px-3 py-1 hover:bg-[#b6bdd2] active:bg-[#8592b5] border border-transparent hover:border-[#0a246a]/30 active:border-[#0a246a]/50 rounded-[2px] group"
    onClick={onClick}
  >
    <Icon size={20} className="text-gray-700 group-hover:text-black mb-0.5" />
    <span className="text-[10px] text-gray-600 group-hover:text-black leading-none">{label}</span>
  </button>
);

const ResumeSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="font-serif text-xl italic text-black border-b border-black/20 pb-1 mb-3 flex items-center gap-2">
      <span className="h-[1px] flex-1 bg-black/20 hidden"></span>
      {title}
      <span className="h-[1px] flex-1 bg-black/20"></span>
    </h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const JobItem = ({ role, company, date, children }: { role: string, company: string, date: string, children: React.ReactNode }) => (
  <div className="mb-4">
    <div className="flex justify-between items-baseline mb-1">
      <h4 className="font-bold text-sm text-black">{role}</h4>
      <span className="text-xs text-gray-600 font-mono">{date}</span>
    </div>
    <div className="text-xs text-gray-700 font-semibold mb-2">{company}</div>
    <ul className="list-disc list-outside ml-4 text-[11px] text-gray-600 space-y-1 leading-relaxed">
      {children}
    </ul>
  </div>
);

const MyResume = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [hover, setHover] = useState(false);
  const [pageSize, setPageSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const computeFitScale = () => {
    if (!viewportRef.current || !paperRef.current) return 1;
    const styles = window.getComputedStyle(viewportRef.current);
    const padX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    const padY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    const vw = viewportRef.current.clientWidth - padX;
    const vh = viewportRef.current.clientHeight - padY;
    const pw = pageSize.w || paperRef.current.offsetWidth;
    const ph = pageSize.h || paperRef.current.offsetHeight;
    const fit = Math.min(vw / pw, vh / ph);
    return Math.min(1, Math.max(0.1, fit));
  };

  const handleZoomClick = () => {
    const fit = computeFitScale();
    setScale(prev => (prev === 1 ? fit : 1));
  };

  React.useLayoutEffect(() => {
    const applySizes = () => {
      if (paperRef.current) {
        const rect = paperRef.current.getBoundingClientRect();
        setPageSize({ w: paperRef.current.offsetWidth, h: paperRef.current.offsetHeight });
      }
    };
    const applyFit = () => setScale(computeFitScale());
    applySizes();
    applyFit();
    window.addEventListener('resize', applyFit);
    return () => window.removeEventListener('resize', applyFit);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#525252] font-sans select-text">
      {/* Custom Toolbar for Resume App */}
      <div className="h-[50px] bg-[#ece9d8] border-b border-[#aca899] flex items-center px-2 gap-1 shrink-0 shadow-[inset_0_1px_0_white]">
         <ToolbarButton icon={ZoomIn} label="Zoom" />
         <ToolbarButton icon={Save} label="Save" onClick={() => window.print()} />
         <ToolbarButton icon={Printer} label="Print" onClick={() => window.print()} />
         <div className="w-[1px] h-[30px] bg-[#aca899] mx-1"></div>
         <ToolbarButton icon={Mail} label="Contact Me" onClick={() => window.open('mailto:aareevs@gmail.com')} />
      </div>

      {/* Content Area - Gray Background */}
      <div ref={viewportRef} className={`flex-1 ${scale === 1 ? 'overflow-y-auto' : 'overflow-hidden'} p-8 flex justify-center bg-[#525252]`}>
        
        {/* A4 Paper */}
        <div 
          ref={paperRef}
          className="w-[210mm] min-h-[297mm] bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden relative"
          style={{ transform: `scale(${scale})`, transformOrigin: 'top center', margin: '0 auto' }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
            
            {/* Left Sidebar (Black) */}
            <div className="w-full md:w-[240px] bg-[#1a1a1a] text-gray-300 p-6 flex flex-col shrink-0 border-r border-gray-200">
                
                {/* Avatar */}
                <div className="w-[120px] h-[120px] rounded-[4px] border-4 border-[#333] overflow-hidden mx-auto mb-6 shadow-lg">
                   <img src={ASSETS.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>

                <div className="mb-8">
                    <h3 className="text-[#4ade80] font-bold uppercase tracking-wider text-xs mb-4 border-b border-gray-700 pb-1">About Me</h3>
                    <div className="space-y-3 text-[11px]">
                        <div className="flex items-center gap-2">
                            <MapPin size={12} className="text-gray-500" />
                            <span>Pune, India</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={12} className="text-gray-500" />
                            <span className="truncate">aareevs@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe size={12} className="text-gray-500" />
                            <span>www.aareevsrin.com</span>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-[#4ade80] font-bold uppercase tracking-wider text-xs mb-4 border-b border-gray-700 pb-1">Software / Tools</h3>
                    <div className="space-y-1 text-[11px] text-gray-400">
                        <div>Adobe Photoshop</div>
                        <div>Adobe Illustrator</div>
                        <div>Adobe Animate</div>
                        <div>Adobe After Effects</div>
                        <div>Antigravity</div>
                        <div>Trae</div>
                        <div>Gemini</div>
                        <div>WordPress (Elementor)</div>
                        <div>Figma</div>
                    </div>
                </div>

                <div className="mt-auto">
                    <h3 className="text-[#4ade80] font-bold uppercase tracking-wider text-xs mb-4 border-b border-gray-700 pb-1">References</h3>
                    <div className="space-y-3 text-[11px]">
                        <div>
                            <div className="text-white font-bold">Greg Clark</div>
                            <div className="text-gray-500 italic">Available on request</div>
                        </div>
                        <div>
                            <div className="text-white font-bold">Rob Ellis</div>
                            <div className="text-gray-500 italic">Available on request</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Content (White) */}
            <div className="flex-1 p-8 md:p-10 text-gray-800">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-black uppercase tracking-tight mb-2">{TEXT.name.split(' ')[0]} <span className="font-light">{TEXT.name.split(' ')[1]}</span></h1>
                    <h2 className="font-serif italic text-2xl text-gray-500">{TEXT.role}</h2>
                </div>

                {/* Experience */}
                <ResumeSection title="Work Experience">
                    <JobItem role="Tech Lead – Entrepreneurship Club" company="Vedam School of Technology" date="Oct 2025 – Present">
                        <div className="text-[11px] font-semibold text-gray-500 mb-1">Pune, India</div>
                        <li>Lead UI/UX and technical development for club products and events.</li>
                        <li>Build and manage design systems, branding, and digital experiences for all Entrepreneurship Club initiatives.</li>
                        <li>Collaborate with multidisciplinary teams to design and develop innovative student-led tech solutions.</li>
                        <li>Oversee front-end implementation for prototypes and internal tools.</li>
                    </JobItem>
                </ResumeSection>

                {/* Skills */}
                <ResumeSection title="Skills">
                    <div className="grid grid-cols-2 gap-y-2 text-[11px]">
                        <div className="flex items-center gap-2"><span className="w-1 h-1 bg-black rounded-full"></span>Graphic Design</div>
                        <div className="flex items-center gap-2"><span className="w-1 h-1 bg-black rounded-full"></span>Web Design</div>
                        <div className="flex items-center gap-2"><span className="w-1 h-1 bg-black rounded-full"></span>Social Graphics</div>
                        <div className="flex items-center gap-2"><span className="w-1 h-1 bg-black rounded-full"></span>Video Production</div>
                        <div className="flex items-center gap-2"><span className="w-1 h-1 bg-black rounded-full"></span>UI/UX Design</div>
                        <div className="flex items-center gap-2"><span className="w-1 h-1 bg-black rounded-full"></span>Print Design</div>
                        <div className="flex items-center gap-2"><span className="w-1 h-1 bg-black rounded-full"></span>Creative Thinking</div>
                        <div className="flex items-center gap-2"><span className="w-1 h-1 bg-black rounded-full"></span>Problem Solving</div>
                        <div className="flex items-center gap-2"><span className="w-1 h-1 bg-black rounded-full"></span>Public Speaking</div>
                    </div>
                </ResumeSection>

                {/* Education */}
                <ResumeSection title="Education">
                    <div className="mb-3">
                        <div className="flex justify-between text-sm font-bold">
                            <span>Bachelor of Technology (Year 1)</span>
                            <span className="font-normal text-xs">2024 – Present</span>
                        </div>
                        <div className="text-xs text-gray-600">Vedam School of Technology</div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm font-bold">
                            <span>Year 12 Certificate</span>
                            <span className="font-normal text-xs">2024</span>
                        </div>
                        <div className="text-xs text-gray-600">Boston World School, Pune</div>
                    </div>
                </ResumeSection>

            </div>
        {/* Zoom Overlay */}
        <button 
          onClick={handleZoomClick}
          className={`absolute top-3 left-3 bg-[#ece9d8] border border-[#aca899] rounded-full w-9 h-9 flex items-center justify-center transition-opacity ${hover ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Zoom"
        >
          <ZoomIn size={18} className="text-[#0a246a]" />
        </button>
        </div>
        
        
      </div>
    </div>
  );
};

export default MyResume;