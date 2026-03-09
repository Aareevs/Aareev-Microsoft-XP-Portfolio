import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TEXT } from '../../constants';

type TerminalLineTone =
  | 'input'
  | 'output'
  | 'hint'
  | 'error'
  | 'command'
  | 'name'
  | 'role'
  | 'quote'
  | 'section'
  | 'muted'
  | 'helpHeader'
  | 'helpItem';

interface TerminalLine {
  id: number;
  text: string;
  tone: TerminalLineTone;
  command?: string;
  description?: string;
}

interface TerminalCommand {
  name: string;
  description: string;
}

const COMMANDS: TerminalCommand[] = [
  { name: 'whoami', description: 'Display my profile' },
  { name: 'skills', description: 'List my technical skills' },
  { name: 'projects', description: 'View my projects' },
  { name: 'startup', description: 'Learn about my startup (Vaani Setu)' },
  { name: 'experience', description: 'Show my experience' },
  { name: 'education', description: 'Show my education' },
  { name: 'contact', description: 'Get my contact info' },
  { name: 'social', description: 'Show social links' },
  { name: 'github', description: 'Open my GitHub profile' },
  { name: 'linkedin', description: 'Open my LinkedIn profile' },
  { name: 'resume', description: 'Download my resume' },
  { name: 'stats', description: 'Show quick stats' },
  { name: 'clear', description: 'Clear the terminal' },
  { name: 'exit', description: 'Close terminal' }
];

const ASCII_NAME = 'AAREEV';
const TERMINAL_HANDLE = 'aareev';
const PROMPT = '➜ ~';
const TERMINAL_FONT = '"JetBrains Mono", "IBM Plex Mono", "Fira Code", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
const ANSI_SHADOW_AAREEV = [
  ' █████╗  █████╗ ██████╗ ███████╗███████╗██╗   ██╗',
  '██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝██║   ██║',
  '███████║███████║██████╔╝█████╗  █████╗  ██║   ██║',
  '██╔══██║██╔══██║██╔══██╗██╔══╝  ██╔══╝  ╚██╗ ██╔╝',
  '██║  ██║██║  ██║██║  ██║███████╗███████╗ ╚████╔╝ ',
  '╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝  ╚═══╝  '
].join('\n');
const PROFILE_LOCATION = 'Pune, Maharashtra, India';
const PROFILE_QUOTE = '"Building beautiful, performant web experiences"';
const PROFILE_ABOUT =
  'I am Aareev, a Computer Science and AI student focused on building polished, performant web products and practical full-stack experiences.';
const SKILLS = {
  frontend: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
  backend: ['Java', 'Node.js', 'Python', 'REST APIs', 'Spring Boot'],
  tools: ['Git', 'GitHub', 'VS Code', 'Android Studio'],
  infra: ['Vercel', 'Supabase']
};
const PROJECTS = [
  { name: 'Vaani Setu', type: 'Web + Mobile', url: 'https://vaani-setu-website.vercel.app/' },
  { name: 'VSX: Buy or Bail', type: 'Web', url: 'https://vsx-buy-or-bail.vercel.app/' },
  { name: 'VPL Auction Website', type: 'Web', url: 'https://vedam-premier-league-vpl.vercel.app/' },
  { name: 'MacOS-Recreation', type: 'Web', url: 'https://macos-recreation.vercel.app/' },
  { name: 'ChronoTask', type: 'Web', url: 'https://chronotask-phi.vercel.app/#' }
];

interface TerminalAppProps {
  onExit?: () => void;
}

const TerminalApp: React.FC<TerminalAppProps> = ({ onExit }) => {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(1);

  const normalizedInput = useMemo(() => input.trim().replace(/^\/+/, '').toLowerCase(), [input]);

  const suggestions = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith('/') && !normalizedInput) return COMMANDS;
    return COMMANDS.filter(command => command.name.startsWith(normalizedInput));
  }, [input, normalizedInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  const pushLines = (newLines: Array<Omit<TerminalLine, 'id'>>) => {
    setLines(prev => [
      ...prev,
      ...newLines.map(line => ({
        ...line,
        id: lineIdRef.current++
      }))
    ]);
  };

  const runCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    pushLines([{ text: `${PROMPT} ${trimmed}`, tone: 'input' }]);

    const command = trimmed.replace(/^\/+/, '').toLowerCase();

    if (command === 'clear') {
      setLines([]);
      return;
    }

    if (command === 'help') {
      pushLines([
        { text: 'Available Commands:', tone: 'helpHeader' },
        ...COMMANDS.map(item => ({
          text: '',
          tone: 'helpItem' as TerminalLineTone,
          command: item.name,
          description: item.description
        }))
      ]);
      return;
    }

    if (command === 'projects') {
      pushLines([
        { text: 'Featured projects:', tone: 'section' },
        ...PROJECTS.map(project => ({
          text: `${project.name} [${project.type}] - ${project.url}`,
          tone: 'output' as TerminalLineTone
        })),
        { text: 'Open "My Projects" from Start Menu for full details.', tone: 'muted' }
      ]);
      return;
    }

    if (command === 'contact') {
      pushLines([
        { text: 'Contact links:', tone: 'section' },
        { text: 'Email: aareevs@gmail.com', tone: 'output' },
        { text: 'GitHub: https://github.com/Aareevs', tone: 'output' },
        { text: 'LinkedIn: https://linkedin.com/in/aareev-srinivasan', tone: 'output' }
      ]);
      return;
    }

    if (command === 'resume') {
      pushLines([{ text: 'Opening resume...', tone: 'output' }]);
      window.open('/Resume_Aareev.pdf', '_blank', 'noopener,noreferrer');
      return;
    }

    if (command === 'skills') {
      pushLines([
        { text: 'Frontend:', tone: 'section' },
        { text: SKILLS.frontend.join(', '), tone: 'output' },
        { text: 'Backend:', tone: 'section' },
        { text: SKILLS.backend.join(', '), tone: 'output' },
        { text: 'Tools:', tone: 'section' },
        { text: SKILLS.tools.join(', '), tone: 'output' },
        { text: 'Infrastructure:', tone: 'section' },
        { text: SKILLS.infra.join(', '), tone: 'output' }
      ]);
      return;
    }

    if (command === 'whoami') {
      pushLines([
        { text: TEXT.name, tone: 'name' },
        { text: TEXT.role, tone: 'role' },
        { text: PROFILE_QUOTE, tone: 'quote' },
        { text: PROFILE_ABOUT, tone: 'output' },
        { text: `📍 ${PROFILE_LOCATION}`, tone: 'muted' }
      ]);
      return;
    }

    if (command === 'startup') {
      pushLines([
        { text: 'Vaani Setu (Startup)', tone: 'name' },
        { text: 'Founder & Full Stack Developer', tone: 'role' },
        { text: 'Building a personalized platform connecting voices across borders.', tone: 'output' },
        { text: 'Interactive dashboard + real-time data + web + mobile delivery.', tone: 'output' },
        { text: 'Live: https://vaani-setu-website.vercel.app/', tone: 'output' },
        { text: 'Instagram: https://www.instagram.com/vaani_setu/', tone: 'muted' }
      ]);
      return;
    }

    if (command === 'experience') {
      pushLines([
        { text: '📅 1+ year of building projects', tone: 'section' },
        { text: '2024 - Present', tone: 'name' },
        { text: 'Founder & Full Stack Developer', tone: 'output' },
        { text: 'Vaani Setu (Startup)', tone: 'muted' },
        { text: 'Building full-stack products with TypeScript/React and backend APIs.', tone: 'output' },
        { text: 'Tech: TypeScript, React, JavaScript, Python, PostgreSQL, Android', tone: 'muted' },
        { text: '2024 - Present', tone: 'name' },
        { text: 'Personal Projects Developer', tone: 'output' },
        { text: 'Self-Employed', tone: 'muted' },
        { text: 'Building portfolio products and event platforms to demonstrate practical engineering skills.', tone: 'output' },
        { text: 'Tech: React, TypeScript, JavaScript, TailwindCSS, Framer Motion', tone: 'muted' },
        { text: 'Technical Lead - Entrepreneurship Club, Vedam School of Technology', tone: 'output' }
      ]);
      return;
    }

    if (command === 'education') {
      pushLines([
        { text: 'Education:', tone: 'section' },
        { text: 'B.Tech CSE (AI), Vedam School of Technology (2025 - Present)', tone: 'output' },
        { text: 'High School Diploma, Boston World School (2019 - 2024)', tone: 'output' }
      ]);
      return;
    }

    if (command === 'social') {
      pushLines([
        { text: 'Social Links:', tone: 'section' },
        { text: 'GitHub: https://github.com/Aareevs', tone: 'output' },
        { text: 'LinkedIn: https://linkedin.com/in/aareev-srinivasan', tone: 'output' },
        { text: 'Instagram: https://www.instagram.com/vaani_setu/', tone: 'output' }
      ]);
      return;
    }

    if (command === 'github') {
      pushLines([{ text: 'Opening GitHub profile...', tone: 'output' }]);
      window.open('https://github.com/Aareevs', '_blank', 'noopener,noreferrer');
      return;
    }

    if (command === 'linkedin') {
      pushLines([{ text: 'Opening LinkedIn profile...', tone: 'output' }]);
      window.open('https://linkedin.com/in/aareev-srinivasan', '_blank', 'noopener,noreferrer');
      return;
    }

    if (command === 'stats') {
      pushLines([
        { text: 'Quick Stats:', tone: 'section' },
        { text: `Projects shipped: ${PROJECTS.length}`, tone: 'output' },
        { text: `Frontend skills listed: ${SKILLS.frontend.length}`, tone: 'output' },
        { text: `Backend skills listed: ${SKILLS.backend.length}`, tone: 'output' },
        { text: 'Primary stack: React + TypeScript + Node + Python', tone: 'output' }
      ]);
      return;
    }

    if (command === 'exit') {
      pushLines([{ text: 'Closing terminal...', tone: 'muted' }]);
      onExit?.();
      return;
    }

    pushLines([{ text: `Command not found: ${trimmed}. Type /help`, tone: 'error' }]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    setInputHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    runCommand(trimmed);
    setInput('');
  };

  const applySuggestion = (name: string) => {
    const withSlash = input.trim().startsWith('/') ? `/${name}` : name;
    setInput(withSlash);
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab' && suggestions.length > 0) {
      event.preventDefault();
      applySuggestion(suggestions[0].name);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (inputHistory.length === 0) return;
      const nextIndex = historyIndex < 0 ? inputHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(inputHistory[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (inputHistory.length === 0 || historyIndex < 0) return;
      const nextIndex = Math.min(inputHistory.length - 1, historyIndex + 1);
      if (nextIndex === historyIndex) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(inputHistory[nextIndex]);
      }
    }
  };

  const getLineColor = (tone: TerminalLineTone) => {
    if (tone === 'input') return '#4ADE80';
    if (tone === 'command') return '#4ADE80';
    if (tone === 'hint') return '#FACC15';
    if (tone === 'error') return '#ff8f8f';
    if (tone === 'name') return '#4ADE80';
    if (tone === 'role') return '#60A5FA';
    if (tone === 'quote') return '#FACC15';
    if (tone === 'section') return '#60A5FA';
    if (tone === 'muted') return '#9CA3AF';
    if (tone === 'helpHeader') return '#60A5FA';
    return '#E5E7EB';
  };

  return (
    <div
      className="w-full h-full p-3 sm:p-4"
      style={{
        backgroundColor: '#020617',
        fontFamily: TERMINAL_FONT,
        letterSpacing: '0.01em'
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-full h-full max-w-[1200px] mx-auto rounded-[14px] overflow-hidden border border-[#1F2937] bg-[#0B1220] shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_0_40px_rgba(34,197,94,0.08)] flex flex-col">
        <div className="h-11 px-4 border-b border-[#1F2937] bg-[#111827] flex items-center shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-4 h-4 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
            <span className="text-[13px] text-[#9CA3AF] truncate">{`${TERMINAL_HANDLE}@portfolio ~ %`}</span>
          </div>
        </div>

        <div ref={terminalBodyRef} className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-5 py-4 sm:py-5">
          <div className="min-h-full border-l border-[#1F2937] pl-3 sm:pl-4">
            <pre
              aria-label={`${ASCII_NAME} ANSI shadow header`}
              className="mb-4 sm:mb-5 max-w-full overflow-hidden text-[#4ADE80] text-[8px] sm:text-[clamp(10px,1.2vw,13px)] leading-[1.08] whitespace-pre"
              style={{
                fontFamily: TERMINAL_FONT,
                letterSpacing: '0.02em',
                textShadow: '1px 1px 0 #22C55E'
              }}
            >
              {ANSI_SHADOW_AAREEV}
            </pre>

            <p className="text-[#E5E7EB] text-[12px] sm:text-[18px] leading-[1.35] mb-1">Welcome to my interactive terminal portfolio!</p>
            <p className="text-[#9CA3AF] text-[12px] sm:text-[17px] leading-[1.35] mb-4 sm:mb-5">
              Type <span className="text-[#FACC15] font-semibold">help</span> to see available commands.
            </p>

            <div role="log" aria-live="polite" aria-relevant="additions text" className="space-y-3">
              {lines.map(line =>
                line.tone === 'helpItem' ? (
                  <p key={line.id} className="text-[13px] sm:text-[15px] leading-[1.6]">
                    <span className="text-[#FACC15]">{line.command}</span>
                    <span className="text-[#E5E7EB]"> - </span>
                    <span className="text-[#b9c1ce]">{line.description}</span>
                  </p>
                ) : (
                  <p
                    key={line.id}
                    className="text-[13px] sm:text-[15px] leading-[1.6]"
                    style={{
                      color: getLineColor(line.tone),
                      whiteSpace: 'pre-wrap',
                      fontStyle: line.tone === 'quote' ? 'italic' : 'normal',
                      fontWeight: line.tone === 'name' || line.tone === 'section' || line.tone === 'helpHeader' ? 700 : 400
                    }}
                  >
                    {line.text}
                  </p>
                )
              )}
            </div>

            <div className="mt-3 sm:mt-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3 text-[20px] sm:text-[28px] leading-none">
                <span className="text-[#4ADE80]">➜</span>
                <span className="text-[#7DD3FC]">~</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="flex-1 min-w-0 bg-transparent outline-none border-none text-[#E5E7EB] placeholder:text-[#6b7280] caret-[#4ADE80] text-[20px] sm:text-[28px] leading-none"
                  placeholder=""
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal command input"
                />
                <span
                  className={`terminal-cursor-block ${isInputFocused ? 'opacity-100' : 'opacity-40'}`}
                  aria-hidden="true"
                />
              </form>

              {suggestions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestions.slice(0, 8).map(command => (
                    <button
                      key={command.name}
                      type="button"
                      onMouseDown={event => {
                        event.preventDefault();
                        applySuggestion(command.name);
                      }}
                      className="px-2 py-1 rounded border border-[#1F2937] bg-[#0f172a] text-[#4ADE80] text-[13px] hover:bg-[#111f36]"
                      title={command.description}
                    >
                      {command.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-9 border-t border-[#1F2937] bg-[#111827] px-4 flex items-center justify-between text-[13px] text-[#6B7280]">
          <span>zsh</span>
          <span>Type 'help' for commands</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalApp;
