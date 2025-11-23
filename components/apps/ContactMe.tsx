
import React, { useState } from 'react';
import { Send, Mail, Scissors, Copy, Clipboard, Linkedin } from 'lucide-react';
import { TEXT } from '../../constants';

const ToolbarSeparator = () => (
  <div className="w-[1px] h-[22px] bg-[#aca899] mx-1 shadow-[1px_0_0_white]" />
);

const ToolbarButton = ({ icon: Icon, label, onClick, className = "" }: { icon: any, label?: string, onClick?: () => void, className?: string }) => (
  <button 
    onClick={onClick}
    className={`
      flex items-center gap-1.5 px-1.5 py-1 rounded-[2px] group transition-all select-none
      hover:bg-[#ffffe1] hover:border-[#cecece] border border-transparent 
      active:bg-[#cecece] active:shadow-inner
      ${className}
    `}
    title={label}
  >
    <Icon size={18} className="text-gray-600 group-hover:text-black" />
    {label && <span className="text-xs text-black">{label}</span>}
  </button>
);

const ContactMe = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [fromEmail, setFromEmail] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    // Opens default mail client with pre-filled info
    window.open(`mailto:aareevs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`);
  };

  const handleLinkedIn = () => {
    window.open('https://linkedin.com', '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] font-sans">
       {/* Custom Toolbar */}
       <div className="flex items-center px-2 py-1 border-b border-[#aca899] shadow-[0_1px_0_white] mb-2 select-none">
          <ToolbarButton icon={Send} label="Send Message" onClick={handleSend} />
          <ToolbarButton icon={Mail} label="New Message" onClick={() => {setSubject(''); setMessage(''); setFromEmail('');}} />
          <div className="mx-1"></div>
          <ToolbarSeparator />
          <div className="flex gap-0 mx-1">
             <ToolbarButton icon={Scissors} onClick={() => {}} />
             <ToolbarButton icon={Copy} onClick={() => {}} />
             <ToolbarButton icon={Clipboard} onClick={() => {}} />
          </div>
          <ToolbarSeparator />
          <button 
            onClick={handleLinkedIn}
            className="flex items-center gap-1.5 px-1.5 py-1 rounded-[2px] hover:bg-[#ffffe1] hover:border-[#cecece] border border-transparent ml-1"
          >
             <Linkedin size={18} className="text-[#0077b5] fill-current" />
             <span className="text-xs text-black font-bold">LinkedIn</span>
          </button>
       </div>

       {/* Form Area */}
       <div className="px-4 py-2 flex flex-col gap-3 flex-1">
          
          {/* Header Inputs */}
          <div className="grid grid-cols-[60px_1fr] gap-y-3 items-center">
             
             {/* TO */}
             <div className="flex items-center justify-end">
                <div className="bg-[#ece9d8] border border-[#aca899] px-2 text-xs text-gray-600 py-0.5 mr-2 shadow-sm rounded-[2px]">
                   To:
                </div>
             </div>
             <div className="border border-[#7f9db9] bg-[#f5f5f5] px-2 py-1 text-sm text-black shadow-[inset_1px_1px_1px_rgba(0,0,0,0.1)] select-text font-medium flex items-center">
                {TEXT.name} &lt;aareevs@gmail.com&gt;
             </div>

             {/* FROM */}
             <div className="flex items-center justify-end">
                <div className="bg-[#ece9d8] border border-[#aca899] px-2 text-xs text-gray-600 py-0.5 mr-2 shadow-sm rounded-[2px]">
                   From:
                </div>
             </div>
             <input 
                className="border border-[#7f9db9] px-2 py-1 text-sm shadow-[inset_1px_1px_1px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-1 focus:ring-[#0058ee] bg-white"
                placeholder="Your email address"
                value={fromEmail}
                onChange={e => setFromEmail(e.target.value)}
             />

             {/* SUBJECT */}
             <div className="flex items-center justify-end">
                <div className="bg-[#ece9d8] border border-[#aca899] px-2 text-xs text-gray-600 py-0.5 mr-2 shadow-sm rounded-[2px]">
                   Subject:
                </div>
             </div>
             <input 
                className="border border-[#7f9db9] px-2 py-1 text-sm shadow-[inset_1px_1px_1px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-1 focus:ring-[#0058ee] bg-white"
                placeholder="Subject of your message"
                value={subject}
                onChange={e => setSubject(e.target.value)}
             />
          </div>

          {/* Separator */}
          <div className="h-[2px] border-t border-[#aca899] border-b border-white my-1"></div>

          {/* Body */}
          <div className="flex-1 flex flex-col relative bg-white border border-[#7f9db9] shadow-[inset_1px_1px_1px_rgba(0,0,0,0.1)]">
              <div className="h-[24px] bg-[#ece9d8] flex items-center px-2 border-b border-[#aca899] select-none">
                  <span className="text-[11px] text-gray-500 font-bold">Arial</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-[11px] text-gray-500 font-bold">10pt</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <div className="flex gap-2">
                      <span className="font-bold text-gray-800">B</span>
                      <span className="italic text-gray-800 font-serif">I</span>
                      <span className="underline text-gray-800">U</span>
                  </div>
              </div>
              <textarea 
                className="flex-1 resize-none p-3 text-sm font-sans focus:outline-none w-full h-full"
                placeholder="Write your message here..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
          </div>
       </div>

       {/* Status Bar */}
       <div className="h-[24px] border-t border-[#aca899] bg-[#ece9d8] flex items-center px-2 text-xs text-gray-600 shadow-[inset_0_1px_0_white] select-none">
          Compose a message to {TEXT.name.split(' ')[0]}
       </div>
    </div>
  );
}

export default ContactMe;
