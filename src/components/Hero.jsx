import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Terminal,
  Cpu,
  Shield,
  ChevronRight,
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
  const [display, setDisplay] = useState('');
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
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

const floatingIcons = [
  { Icon: Terminal, x: '10%', y: '20%', delay: 0, color: '#00d4ff' },
  { Icon: Cpu, x: '85%', y: '15%', delay: 1, color: '#a855f7' },
  { Icon: Shield, x: '80%', y: '70%', delay: 2, color: '#39d353' },
];

export default function Hero() {
  const typed = useTypingEffect(TYPING_STRINGS);
  const canvasRef = useRef(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((q) => {
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient grid-bg"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay, color }, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex items-center justify-center w-12 h-12 rounded-xl border"
          style={{
            left: x,
            top: y,
            borderColor: `${color}30`,
            backgroundColor: `${color}08`,
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5 + delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          }}
        >
          <Icon size={20} style={{ color }} />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-accent/20 bg-cyber-accent/5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse-slow" />
          <span className="text-xs font-mono text-cyber-muted tracking-widest uppercase">
            Available for Internships & Open Source
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-none tracking-tight"
        >
          <span className="text-cyber-text">Krishna</span>{' '}
          <span className="gradient-text">Abhang</span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center justify-center gap-2 mb-6 h-10"
        >
          <span className="text-cyber-muted font-mono text-sm">&gt;_</span>
          <span className="text-cyber-accent font-mono text-xl sm:text-2xl font-semibold cursor-blink">
            {typed}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-sm font-mono text-cyber-muted tracking-widest uppercase mb-6"
        >
          B.Tech Computer Science Engineering · 2nd Year
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="max-w-2xl mx-auto text-cyber-muted text-base sm:text-lg leading-relaxed mb-12"
        >
          Passionate about low-level systems engineering, operating system fundamentals,
          and building high-performance prototypes. Bridging the gap between{' '}
          <span className="text-cyber-accent font-medium">core kernel development</span>,
          modern full-stack architectures, and{' '}
          <span className="text-cyber-purple font-medium">AI integration</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            id="hero-view-projects"
            className="btn-primary flex items-center gap-2 text-sm"
          >
            View Projects
            <ChevronRight size={16} />
          </a>
          <a
            href="#contact"
            id="hero-contact"
            className="btn-secondary flex items-center gap-2 text-sm"
          >
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

        {/* Scroll indicator */}
        <motion.a
          href="#skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="inline-flex flex-col items-center gap-2 text-cyber-muted hover:text-cyber-accent transition-colors group"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll Down</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown size={16} className="group-hover:text-cyber-accent" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
