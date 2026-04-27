import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
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
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const SCENE_URL = 'https://prod.spline.design/9Gn1j7uSxAqhQhxm/scene.splinecode';

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

const floatingBadges = [
  { icon: Terminal, label: 'Kernel Dev', color: '#00d4ff', delay: 0 },
  { icon: Cpu, label: 'Systems', color: '#a855f7', delay: 1.2 },
  { icon: Shield, label: 'Security', color: '#39d353', delay: 2.4 },
  { icon: Zap, label: 'AI/ML', color: '#f472b6', delay: 0.6 },
];

export default function Hero() {
  const typed = useTypingEffect(TYPING_STRINGS);
  const [splineReady, setSplineReady] = useState(false);

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

          {/* ── RIGHT: Spline 3D Widget ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="hero-spline-col"
          >
            {/* Floating skill badges */}
            {floatingBadges.map(({ icon: Icon, label, color, delay }, i) => (
              <motion.div
                key={i}
                className="hero-float-badge"
                style={{
                  '--badge-color': color,
                  top: i < 2 ? `${10 + i * 22}%` : 'auto',
                  bottom: i >= 2 ? `${10 + (i - 2) * 22}%` : 'auto',
                  left: i % 2 === 0 ? '-18px' : 'auto',
                  right: i % 2 === 1 ? '-18px' : 'auto',
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
              >
                <Icon size={14} style={{ color }} />
                <span>{label}</span>
              </motion.div>
            ))}

            {/* Spline container */}
            <div className="hero-spline-frame">
              {/* Glow ring */}
              <div className="hero-spline-glow-ring" />

              {/* Skeleton shimmer while loading */}
              {!splineReady && (
                <div className="hero-spline-skeleton">
                  <div className="hero-spline-skeleton-logo">K</div>
                  <p className="hero-spline-skeleton-text">Loading 3D Scene…</p>
                  <div className="hero-spline-skeleton-bar">
                    <div className="hero-spline-skeleton-fill" />
                  </div>
                </div>
              )}

              <Spline
                scene={SCENE_URL}
                onLoad={() => setSplineReady(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: splineReady ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              />

              {/* Corner decorations */}
              <div className="hero-spline-corner hero-spline-corner-tl" />
              <div className="hero-spline-corner hero-spline-corner-tr" />
              <div className="hero-spline-corner hero-spline-corner-bl" />
              <div className="hero-spline-corner hero-spline-corner-br" />

              {/* Label strip */}
              <div className="hero-spline-label">
                <span className="hero-spline-label-dot" />
                <span>Interactive 3D · Powered by Spline</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
