import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Terminal,
  Cpu,
  Shield,
  ChevronRight,
  Zap,
  Code2,
  Layers,
  GitBranch,
  Star,
  Coffee,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const TYPING_STRINGS = [
  'Systems Engineer',
  'Full-Stack Developer',
  'OS Enthusiast',
  'Kernel Hacker',
  'AI Integrator',
];

function useTypingEffect(strings, speed = 80, pause = 1800) {
  const [display, setDisplay] = React.useState('');
  const [strIdx, setStrIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = strings[strIdx];
    let timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setStrIdx((s) => (s + 1) % strings.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, strIdx, strings, speed, pause]);

  return display;
}

const stats = [
  { label: 'Projects', value: '12+', icon: Layers },
  { label: 'Technologies', value: '20+', icon: Code2 },
  { label: 'Open Source', value: '5+', icon: Terminal },
];

const techStack = [
  { name: 'Rust', color: '#f97316', bg: 'rgba(249,115,22,0.12)', letter: 'Rs' },
  { name: 'C/C++', color: '#00d4ff', bg: 'rgba(0,212,255,0.12)', letter: 'C++' },
  { name: 'Python', color: '#f7df1e', bg: 'rgba(247,223,30,0.10)', letter: 'Py' },
  { name: 'React', color: '#61dafb', bg: 'rgba(97,218,251,0.10)', letter: 'Re' },
  { name: 'Linux', color: '#a855f7', bg: 'rgba(168,85,247,0.12)', letter: 'Lx' },
  { name: 'AI/ML', color: '#f472b6', bg: 'rgba(244,114,182,0.12)', letter: 'AI' },
];

const activityDots = Array.from({ length: 52 }, (_, i) => ({
  id: i,
  level: Math.floor(Math.random() * 5),
}));

function ActivityGraph() {
  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
  return (
    <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
      {activityDots.map((dot) => (
        <div
          key={dot.id}
          style={{
            width: 10,
            height: 10,
            borderRadius: 2,
            background: colors[dot.level],
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const typed = useTypingEffect(TYPING_STRINGS);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-gradient grid-bg"
    >
      {/* Ambient glow orbs */}
      <div className="hero-orb hero-orb-cyan" />
      <div className="hero-orb hero-orb-purple" />
      <div className="hero-orb hero-orb-green" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="hero-split">

          {/* ── LEFT: Text Content ── */}
          <div className="hero-text-col">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-status-badge"
            >
              <span className="hero-status-dot" />
              <span>Available for Internships &amp; Open Source</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="hero-name"
            >
              <span className="hero-name-primary">Krishna</span>
              <br />
              <span className="gradient-text">Abhang</span>
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="hero-typing-row"
            >
              <span className="hero-typing-prompt">&gt;_</span>
              <span className="hero-typing-text cursor-blink">{typed}</span>
            </motion.div>

            {/* Sub-label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="hero-sublabel"
            >
              B.Tech Computer Science Engineering · 2nd Year
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="hero-desc"
            >
              Passionate about low-level systems engineering, operating system fundamentals,
              and building high-performance prototypes. Bridging the gap between{' '}
              <span className="hero-highlight-cyan">core kernel development</span>,
              modern full-stack architectures, and{' '}
              <span className="hero-highlight-purple">AI integration</span>.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hero-stats"
            >
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="hero-stat">
                  <Icon size={14} className="hero-stat-icon" />
                  <span className="hero-stat-value">{value}</span>
                  <span className="hero-stat-label">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="hero-cta-row"
            >
              <a href="#projects" id="hero-view-projects" className="btn-primary flex items-center gap-2 text-sm">
                View Projects
                <ChevronRight size={16} />
              </a>
              <a href="#contact" id="hero-contact" className="btn-secondary flex items-center gap-2 text-sm">
                Contact Me
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Krishna-cell-12"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-github"
                  className="w-10 h-10 rounded-lg border border-cyber-border bg-cyber-card hover:border-cyber-accent hover:text-cyber-accent text-cyber-muted flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/krishna-abhang-917910327/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-linkedin"
                  className="w-10 h-10 rounded-lg border border-cyber-border bg-cyber-card hover:border-blue-400 hover:text-blue-400 text-cyber-muted flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.a
              href="#skills"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="inline-flex items-center gap-2 text-cyber-muted hover:text-cyber-accent transition-colors group mt-10"
            >
              <span className="text-xs font-mono tracking-widest uppercase">Scroll Down</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowDown size={16} className="group-hover:text-cyber-accent" />
              </motion.div>
            </motion.a>
          </div>

          {/* ── RIGHT: Professional Profile Card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="hero-profile-col"
          >
            {/* Main profile card */}
            <div className="hero-profile-card">
              {/* Glow ring */}
              <div className="hero-spline-glow-ring" />

              {/* Avatar section */}
              <div className="hero-avatar-section">
                <div className="hero-avatar-ring">
                  <div className="hero-avatar">
                    <span style={{
                      fontSize: 52,
                      fontWeight: 900,
                      fontFamily: 'Inter, sans-serif',
                      background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>KA</span>
                  </div>
                  {/* Online indicator */}
                  <div className="hero-avatar-status" />
                </div>

                <div className="hero-profile-info">
                  <h3 style={{ color: '#e6edf3', fontWeight: 700, fontSize: 18, margin: 0, lineHeight: 1.2 }}>
                    Krishna Abhang
                  </h3>
                  <p style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 12, margin: '4px 0 0', letterSpacing: '0.06em' }}>
                    @krishna-cell-12
                  </p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <span className="hero-profile-tag" style={{ '--tag-color': '#00d4ff' }}>Systems</span>
                    <span className="hero-profile-tag" style={{ '--tag-color': '#a855f7' }}>Open Source</span>
                    <span className="hero-profile-tag" style={{ '--tag-color': '#39d353' }}>AI/ML</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(33,38,45,0.8)', margin: '0 0 16px' }} />

              {/* Quick metrics */}
              <div className="hero-metrics">
                <div className="hero-metric-item">
                  <GitBranch size={13} style={{ color: '#39d353' }} />
                  <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 11 }}>Commits this year</span>
                  <span style={{ color: '#39d353', fontFamily: 'monospace', fontSize: 12, fontWeight: 700, marginLeft: 'auto' }}>250+</span>
                </div>
                <div className="hero-metric-item">
                  <Star size={13} style={{ color: '#f7df1e' }} />
                  <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 11 }}>GitHub Stars</span>
                  <span style={{ color: '#f7df1e', fontFamily: 'monospace', fontSize: 12, fontWeight: 700, marginLeft: 'auto' }}>45+</span>
                </div>
                <div className="hero-metric-item">
                  <Coffee size={13} style={{ color: '#f97316' }} />
                  <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 11 }}>Hours Coding</span>
                  <span style={{ color: '#f97316', fontFamily: 'monospace', fontSize: 12, fontWeight: 700, marginLeft: 'auto' }}>1,200+</span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(33,38,45,0.8)', margin: '4px 0 16px' }} />

              {/* Tech stack */}
              <div style={{ marginBottom: 16 }}>
                <p style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Tech Stack
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {techStack.map(({ name, color, bg, letter }) => (
                    <motion.div
                      key={name}
                      whileHover={{ scale: 1.08, y: -2 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '5px 10px',
                        borderRadius: 6,
                        background: bg,
                        border: `1px solid ${color}33`,
                        cursor: 'default',
                      }}
                    >
                      <span style={{
                        fontFamily: 'monospace',
                        fontSize: 10,
                        fontWeight: 700,
                        color,
                        minWidth: 20,
                      }}>{letter}</span>
                      <span style={{ color: '#8b949e', fontSize: 11 }}>{name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(33,38,45,0.8)', margin: '0 0 14px' }} />

              {/* Activity graph */}
              <div>
                <p style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Activity
                </p>
                <ActivityGraph />
              </div>

              {/* Corner decorations */}
              <div className="hero-spline-corner hero-spline-corner-tl" />
              <div className="hero-spline-corner hero-spline-corner-tr" />
              <div className="hero-spline-corner hero-spline-corner-bl" />
              <div className="hero-spline-corner hero-spline-corner-br" />
            </div>

            {/* Floating accent badges */}
            <motion.div
              className="hero-float-badge"
              style={{
                '--badge-color': '#39d353',
                top: '10%',
                left: '-18px',
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Terminal size={13} style={{ color: '#39d353' }} />
              <span>Kernel Dev</span>
            </motion.div>

            <motion.div
              className="hero-float-badge"
              style={{
                '--badge-color': '#a855f7',
                top: '32%',
                right: '-18px',
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <Cpu size={13} style={{ color: '#a855f7' }} />
              <span>Systems</span>
            </motion.div>

            <motion.div
              className="hero-float-badge"
              style={{
                '--badge-color': '#00d4ff',
                bottom: '28%',
                left: '-18px',
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <Shield size={13} style={{ color: '#00d4ff' }} />
              <span>Security</span>
            </motion.div>

            <motion.div
              className="hero-float-badge"
              style={{
                '--badge-color': '#f472b6',
                bottom: '8%',
                right: '-18px',
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <Zap size={13} style={{ color: '#f472b6' }} />
              <span>AI/ML</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
