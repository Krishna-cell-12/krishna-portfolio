import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubRepos from './components/GitHubRepos';
import Experience from './components/Experience';
import Contact from './components/Contact';
import SplineLanding from './components/SplineLanding';

// Loader screen
function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const doneCalledRef = useRef(false);

  const handleDone = useCallback(() => {
    if (!doneCalledRef.current) {
      doneCalledRef.current = true;
      onDone();
    }
  }, [onDone]);

  useEffect(() => {
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 15 + 5;
      if (prog >= 100) {
        prog = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(handleDone, 600);
      } else {
        setProgress(prog);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line

  const lines = [
    '> Initializing portfolio...',
    '> Loading kernel modules...',
    '> Mounting file systems...',
    '> Establishing connections...',
    '> All systems nominal.',
  ];

  const visibleLines = Math.min(Math.ceil((progress / 100) * lines.length), lines.length);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: '#010409' }}
    >
      <div style={{ width: 360 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              border: '1px solid rgba(0,212,255,0.3)',
              background: 'rgba(0,212,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#00d4ff', fontFamily: 'monospace', fontWeight: 900, fontSize: 20 }}>K</span>
          </div>
          <div>
            <p style={{ color: '#e6edf3', fontFamily: 'monospace', fontWeight: 700, fontSize: 13, margin: 0 }}>Krishna Abhang</p>
            <p style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 11, margin: 0 }}>Portfolio v2.0</p>
          </div>
        </div>

        {/* Terminal lines */}
        <div
          style={{
            background: '#0d1117',
            border: '1px solid #21262d',
            borderRadius: 12,
            padding: 16,
            minHeight: 130,
            fontFamily: 'monospace',
            fontSize: 12,
            marginBottom: 16,
          }}
        >
          {lines.slice(0, visibleLines).map((line, i) => (
            <p
              key={i}
              style={{
                margin: '0 0 6px 0',
                color: i < visibleLines - 1 ? '#39d353' : '#00d4ff',
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Progress bar */}
        <div
          style={{
            background: '#0d1117',
            border: '1px solid #21262d',
            borderRadius: 999,
            height: 4,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: 999,
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
              transition: 'width 0.1s ease-out',
              boxShadow: '0 0 8px rgba(0,212,255,0.5)',
            }}
          />
        </div>
        <p style={{ textAlign: 'right', color: '#8b949e', fontFamily: 'monospace', fontSize: 11, marginTop: 6 }}>
          {Math.min(Math.round(progress), 100)}%
        </p>
      </div>
    </div>
  );
}

// Scroll to top button
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      id="scroll-to-top"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-cyber-card border border-cyber-accent/30 flex items-center justify-center text-cyber-accent hover:bg-cyber-accent hover:text-cyber-dark transition-all duration-300"
      style={{ fontFamily: 'monospace', fontSize: 16 }}
    >
      ↑
    </motion.button>
  );
}

export default function App() {
  // Phase 1: Spline landing
  const [landingDone, setLandingDone] = useState(false);

  // ── Phase 1: Spline Landing ──
  if (!landingDone) {
    return <SplineLanding onEnter={() => setLandingDone(true)} />;
  }

  // ── Phase 2: Full Portfolio (direct, no loader) ──
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Scan line effect */}
      <div className="scan-line" />

      <Navbar />

      <main>
        <Hero />

        <div className="h-px bg-gradient-to-r from-transparent via-cyber-accent/30 to-transparent mx-8" />

        <Skills />

        <div className="h-px bg-gradient-to-r from-transparent via-cyber-purple/30 to-transparent mx-8" />

        <Projects />

        <div className="h-px bg-gradient-to-r from-transparent via-cyber-green/20 to-transparent mx-8" />

        <GitHubRepos />

        <div className="h-px bg-gradient-to-r from-transparent via-cyber-accent/20 to-transparent mx-8" />

        <Experience />

        <div className="h-px bg-gradient-to-r from-transparent via-cyber-purple/20 to-transparent mx-8" />

        <Contact />
      </main>

      <ScrollToTop />
    </motion.div>
  );
}
