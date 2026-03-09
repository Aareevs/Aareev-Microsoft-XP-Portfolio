import React, { useState, useEffect } from 'react';
import { ASSETS, XP_ICONS } from '../../constants';
import { User, GraduationCap, Code2, Github, MapPin, Mail, Linkedin, ExternalLink, Award, Monitor, Server, Star, GitFork, Activity } from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Profile', icon: <User size={16} /> },
  { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
  { id: 'technologies', label: 'Technologies', icon: <Code2 size={16} /> },
  { id: 'github', label: 'GitHub Stats', icon: <Github size={16} /> },
];

const AboutMe = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', backgroundColor: '#1e1e20', color: '#e5e5e5', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>

      {/* Left Sidebar */}
      <div style={{ width: 220, flexShrink: 0, backgroundColor: '#252528', borderRight: '1px solid #3a3a3c', display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
        <div style={{ padding: '0 16px 16px 16px', fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          ABOUT ME
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                fontSize: 14,
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? '#60a5fa' : '#9ca3af',
                backgroundColor: activeTab === tab.id ? '#2a3a50' : 'transparent',
                border: 'none',
                borderLeft: activeTab === tab.id ? '3px solid #60a5fa' : '3px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                width: '100%',
              }}
              onMouseEnter={(e) => { if (activeTab !== tab.id) { (e.target as HTMLElement).style.backgroundColor = '#2c2c30'; (e.target as HTMLElement).style.color = '#d1d5db'; }}}
              onMouseLeave={(e) => { if (activeTab !== tab.id) { (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = '#9ca3af'; }}}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="dark-scrollbar" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', items: 'center', padding: '40px 32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Avatar */}
              <div style={{ position: 'relative', marginBottom: 24 }}>
                <div style={{ width: 140, height: 140, borderRadius: '50%', overflow: 'hidden', border: '4px solid #3a4a5c', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                  <img
                    src={ASSETS.avatar}
                    alt="Aareev Srinivasan"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Online indicator */}
                <div style={{ position: 'absolute', bottom: 8, right: 8, width: 18, height: 18, borderRadius: '50%', backgroundColor: '#22c55e', border: '3px solid #1e1e20' }} />
              </div>

              {/* Name & Title */}
              <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4, color: '#ffffff', letterSpacing: '-0.02em' }}>Aareev Srinivasan</h1>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#60a5fa', marginBottom: 8 }}>Full Stack Developer</p>
              <p style={{ fontSize: 14, color: '#6b7280', fontStyle: 'italic', marginBottom: 12 }}>"Building beautiful, performant web experiences"</p>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9ca3af', fontSize: 14, marginBottom: 24 }}>
                <MapPin size={14} />
                <span>Pune, Maharashtra, India</span>
              </div>

              {/* Social Buttons */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
                <a href="https://github.com/aareevv" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 24px', borderRadius: 8, border: '1px solid #4b5563', backgroundColor: '#2c2c30', color: '#e5e5e5', fontSize: 14, fontWeight: 500, textDecoration: 'none', cursor: 'pointer', transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', gap: 6 }}>
                  GitHub
                </a>
                <a href="https://linkedin.com/in/aareev-srinivasan" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 24px', borderRadius: 8, border: '1px solid #4b5563', backgroundColor: '#2c2c30', color: '#e5e5e5', fontSize: 14, fontWeight: 500, textDecoration: 'none', cursor: 'pointer', transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', gap: 6 }}>
                  LinkedIn
                </a>
                <a href="mailto:aareevs@gmail.com" style={{ padding: '8px 24px', borderRadius: 8, border: '1px solid #4b5563', backgroundColor: '#2c2c30', color: '#e5e5e5', fontSize: 14, fontWeight: 500, textDecoration: 'none', cursor: 'pointer', transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Email
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* About Section */}
              <div style={{ width: '100%', maxWidth: 600, border: '1px solid #3a3a3c', borderRadius: 12, padding: 24, backgroundColor: '#252528' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <User size={18} className="text-blue-400" />
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff' }}>About</h2>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#9ca3af' }}>
                  Hey, I am Aareev, a student at Vedam School of Technology pursuing B.Tech in Computer Science and AI. Excited to learn more. I am extremely passionate about building and testing websites. While Front-End is more of my specialty I enjoy coding Back-End as well.
                </p>
              </div>

              {/* Skills Section */}
              <div style={{ width: '100%', maxWidth: 600, border: '1px solid #3a3a3c', borderRadius: 12, padding: 24, backgroundColor: '#252528', marginTop: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <Code2 size={18} className="text-green-400" />
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff' }}>Skills</h2>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Web Design', 'UI/UX Design', 'Frontend Development', 'React', 'TypeScript', 'Tailwind CSS'].map(skill => (
                    <span key={skill} style={{ padding: '6px 14px', borderRadius: 6, backgroundColor: '#2c2c30', border: '1px solid #3a3a3c', color: '#d1d5db', fontSize: 13 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div style={{ padding: '40px 32px', maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <GraduationCap size={28} className="text-green-400" />
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#ffffff' }}>Education & Certifications</h2>
            </div>

            {/* Education Box */}
            <div style={{ border: '1px solid #3a3a3c', borderRadius: 12, padding: 20, backgroundColor: '#252528', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: '#2f4f3a', padding: 12, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={24} className="text-green-400" />
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>Bachelor of Technology in Science in Computer Science & AI</h3>
                  <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 4 }}>Vedam School of Technology</p>
                  <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Aug 2025 - Present • Pune, India</p>
                  <ul style={{ margin: 0, paddingLeft: 20, color: '#d1d5db', fontSize: 14, lineHeight: 1.6 }}>
                    <li>Technical Lead of the Entrepreneurship Club.</li>
                    <li>Helped organise and host Tech fests.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ border: '1px solid #3a3a3c', borderRadius: 12, padding: 20, backgroundColor: '#252528', marginBottom: 40 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: '#1c2e4a', padding: 12, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>High School Diploma</h3>
                  <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 4 }}>Boston World School</p>
                  <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>July 2019 - Mar 2024</p>
                  <ul style={{ margin: 0, paddingLeft: 20, color: '#d1d5db', fontSize: 14, lineHeight: 1.6 }}>
                    <li>Completed Examinations of IGCSE, AS & A2 Levels of Cambridge Examinations.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <Award size={24} className="text-yellow-400" />
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#ffffff' }}>Certifications</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Cert 1 */}
              <div style={{ border: '1px solid #3a3a3c', borderRadius: 12, padding: 20, backgroundColor: '#252528' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: '#4f402f', padding: 12, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={24} className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>Certification of Career Essentials in Gen AI</h3>
                    <p style={{ fontSize: 15, color: '#9ca3af' }}>Gotten through Microsoft & LinkedIn Learning</p>
                  </div>
                </div>
              </div>

              {/* Cert 2 */}
              <div style={{ border: '1px solid #3a3a3c', borderRadius: 12, padding: 20, backgroundColor: '#252528' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: '#4f402f', padding: 12, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={24} className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>Learning Github</h3>
                    <p style={{ fontSize: 15, color: '#9ca3af' }}>Gotten through LinkedIn Learning</p>
                  </div>
                </div>
              </div>

              {/* Cert 3 */}
              <div style={{ border: '1px solid #3a3a3c', borderRadius: 12, padding: 20, backgroundColor: '#252528' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: '#4f402f', padding: 12, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={24} className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>Introduction to Web Designing</h3>
                    <p style={{ fontSize: 15, color: '#9ca3af' }}>Gotten through freeCodeCamp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Technologies Tab */}
        {activeTab === 'technologies' && (
          <div style={{ padding: '40px 32px', maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <Code2 size={28} className="text-purple-400" />
              <h2 style={{ fontSize: 26, fontWeight: 700, color: '#ffffff' }}>Tech Stack</h2>
            </div>

            {/* Frontend */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <Monitor size={20} className="text-white" />
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff' }}>Frontend</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { name: 'HTML/CSS', percent: 85, color: '#e34c26', bg: '#3b2520' },
                  { name: 'JavaScript', percent: 75, color: '#f7df1e', bg: '#403c20' },
                  { name: 'React', percent: 70, color: '#61dafb', bg: '#203940' },
                  { name: 'React Native', percent: 65, color: '#61dafb', bg: '#203940' },
                  { name: 'TypeScript', percent: 65, color: '#3178c6', bg: '#202a40' },
                  { name: 'Kotlin', percent: 50, color: '#7F52FF', bg: '#2a1b55' },
                ].map(tech => (
                  <div key={tech.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 14, color: '#e5e5e5' }}>{tech.name}</span>
                      <span style={{ fontSize: 13, color: '#6b7280' }}>{tech.percent}%</span>
                    </div>
                    <div style={{ width: '100%', height: 8, backgroundColor: '#2c2c30', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${tech.percent}%`, height: '100%', backgroundColor: tech.color, borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <Server size={20} className="text-white" />
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff' }}>Backend</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { name: 'Java', percent: 70, color: '#f89820', bg: '#3d2c1c' },
                  { name: 'Node.js', percent: 60, color: '#3c873a', bg: '#1f301e' },
                  { name: 'Python', percent: 55, color: '#3776ab', bg: '#1c2833' },
                ].map(tech => (
                  <div key={tech.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 14, color: '#e5e5e5' }}>{tech.name}</span>
                      <span style={{ fontSize: 13, color: '#6b7280' }}>{tech.percent}%</span>
                    </div>
                    <div style={{ width: '100%', height: 8, backgroundColor: '#2c2c30', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${tech.percent}%`, height: '100%', backgroundColor: tech.color, borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & DevOps */}
            <div style={{ marginTop: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <Code2 size={20} className="text-white" />
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff' }}>Tools & DevOps</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
                {[
                  { name: 'Git', icon: XP_ICONS.git },
                  { name: 'GitHub', icon: XP_ICONS.github },
                  { name: 'Android Studio', icon: XP_ICONS.androidStudio },
                  { name: 'VS Code', icon: XP_ICONS.vscode },
                  { name: 'Antigravity', icon: XP_ICONS.antigravity },
                ].map(tool => (
                  <div key={tool.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, backgroundColor: '#252528', border: '1px solid #3a3a3c' }}>
                    <img src={tool.icon} alt={tool.name} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                    <span style={{ fontSize: 13, color: '#d1d5db' }}>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructure */}
            <div style={{ marginTop: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <Server size={20} className="text-white" />
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff' }}>Infrastructure</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
                {[
                  { name: 'Vercel', icon: XP_ICONS.vercel },
                  { name: 'Supabase', icon: XP_ICONS.supabase },
                ].map(tool => (
                  <div key={tool.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, backgroundColor: '#252528', border: '1px solid #3a3a3c' }}>
                    <img src={tool.icon} alt={tool.name} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                    <span style={{ fontSize: 13, color: '#d1d5db' }}>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* GitHub Stats Tab */}
        {activeTab === 'github' && (
          <div style={{ padding: '40px 32px', maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <Github size={28} className="text-white" />
              <h2 style={{ fontSize: 26, fontWeight: 700, color: '#ffffff' }}>GitHub Statistics</h2>
            </div>

            {/* Live GitHub Readme Stats Cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 32, justifyContent: 'center' }}>
              <img 
                src="https://github-readme-stats-eight-theta.vercel.app/api?username=Aareevs&show_icons=true&theme=radical&hide_border=true&bg_color=1c1c1e&include_all_commits=true" 
                alt="Aareev's GitHub Stats" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 12, border: '1px solid #3a3a3c' }}
              />
              <img 
                src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=Aareevs&theme=radical&hide_border=true&bg_color=1c1c1e" 
                alt="Top Languages" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 12, border: '1px solid #3a3a3c' }}
              />
            </div>

            {/* View Full Profile Button */}
            <a 
              href="https://github.com/Aareevs" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px', borderRadius: 12, backgroundColor: '#2c2c30', border: '1px solid #3a3a3c', color: '#ffffff', fontSize: 15, fontWeight: 500, textDecoration: 'none', transition: 'background-color 0.2s', maxWidth: 400, margin: '0 auto' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#3f3f46'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2c2c30'}
            >
              <Github size={18} />
              View Full Profile on GitHub
              <ExternalLink size={16} className="text-gray-400 border-none" />
            </a>

          </div>
        )}

      </div>
    </div>
  );
};

export default AboutMe;