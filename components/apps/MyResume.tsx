import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Save, Printer, Mail, Download, RotateCcw } from 'lucide-react';

const ToolbarButton = ({ icon: Icon, label, onClick, disabled = false }: { icon: any, label: string, onClick?: () => void, disabled?: boolean }) => (
  <button
    className={`flex flex-col items-center justify-center px-3 py-1 rounded-[2px] group border border-transparent ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#b6bdd2] active:bg-[#8592b5] hover:border-[#0a246a]/30 active:border-[#0a246a]/50'}`}
    onClick={disabled ? undefined : onClick}
  >
    <Icon size={20} className="text-gray-700 group-hover:text-black mb-0.5" />
    <span className="text-[10px] text-gray-600 group-hover:text-black leading-none">{label}</span>
  </button>
);

const MyResume = () => {
  const pdfUrl = '/Resume_Aareev.pdf';
  const [zoom, setZoom] = useState(1.3); // Start zoomed in

  const zoomIn = () => setZoom(prev => Math.min(3, +(prev + 0.2).toFixed(1)));
  const zoomOut = () => setZoom(prev => Math.max(0.4, +(prev - 0.2).toFixed(1)));
  const resetZoom = () => setZoom(1.3);

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#525252', fontFamily: 'sans-serif' }}>
      {/* Custom Toolbar */}
      <div className="h-[50px] bg-[#ece9d8] border-b border-[#aca899] flex items-center px-2 gap-1 shrink-0 shadow-[inset_0_1px_0_white]">
        <ToolbarButton icon={ZoomIn} label="Zoom In" onClick={zoomIn} disabled={zoom >= 3} />
        <ToolbarButton icon={ZoomOut} label="Zoom Out" onClick={zoomOut} disabled={zoom <= 0.4} />
        <ToolbarButton icon={RotateCcw} label="Reset" onClick={resetZoom} />

        {/* Zoom Percentage Display */}
        <div className="flex items-center bg-white border border-[#aca899] rounded-[2px] px-2 h-[22px] mx-1 select-none">
          <span className="text-[11px] text-gray-700 font-mono">{zoomPercent}%</span>
        </div>

        <div className="w-[1px] h-[30px] bg-[#aca899] mx-1"></div>

        <ToolbarButton icon={Download} label="Download" onClick={() => {
          const a = document.createElement('a');
          a.href = pdfUrl;
          a.download = 'Resume_Aareev.pdf';
          a.click();
        }} />
        <ToolbarButton icon={Printer} label="Print" onClick={() => window.print()} />

        <div className="w-[1px] h-[30px] bg-[#aca899] mx-1"></div>
        <ToolbarButton icon={Mail} label="Contact" onClick={() => window.open('mailto:aareevs@gmail.com')} />
      </div>

      {/* PDF Container with zoom */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto', backgroundColor: '#525252' }}>
        <div style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          width: `${100 / zoom}%`,
          height: `${100 / zoom}%`,
          margin: '0 auto',
        }}>
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            title="Resume"
          />
        </div>
      </div>
    </div>
  );
};

export default MyResume;