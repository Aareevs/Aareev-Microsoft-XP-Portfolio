

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

  const computeScale = () => {
    if (!viewportRef.current) return 1;
    const { clientWidth, clientHeight } = viewportRef.current;
    // A4 dimensions in pixels (at 96 DPI) approx 794x1123
    // But we defined the paper as 210mm x 297mm
    // Let's assume the paper's natural size is what it renders at (approx 794px width)

    // We want to fit the paper into the viewport with a small margin
    const paperWidth = paperRef.current?.offsetWidth || 794;
    const paperHeight = paperRef.current?.offsetHeight || 1123;

    const scaleX = (clientWidth - 40) / paperWidth; // 40px margin
    const scaleY = (clientHeight - 40) / paperHeight;

    // Fit to whichever dimension is more constrained
    const scale = Math.min(scaleX, scaleY);

    // Don't scale up too much (max 1.5x), don't scale down to invisible (min 0.2x)
    return Math.min(1.5, Math.max(0.2, scale));
  };

  const updateScale = () => {
    const newScale = computeScale();
    setScale(newScale);
  };

  React.useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);

    // Also use ResizeObserver for the container itself
    const observer = new ResizeObserver(updateScale);
    if (viewportRef.current) {
      observer.observe(viewportRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      observer.disconnect();
    };
  }, []);

  const handleZoomClick = () => {
    setScale(prev => (prev === 1 ? computeScale() : 1));
  };

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
      <div ref={viewportRef} className="flex-1 overflow-hidden relative bg-[#525252] flex items-center justify-center">

        {/* Wrapper for scaling */}
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* A4 Paper */}
          <div
            ref={paperRef}
            className="w-[210mm] min-h-[297mm] bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden relative"
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
    </div>
  );
};

export default MyResume;