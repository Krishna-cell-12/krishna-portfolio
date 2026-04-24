import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Brain,
  Search,
  Cpu,
  ChevronRight,
  Star,
  Zap,
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

const projects = [
  {
    id: 'darkintel',
    name: 'DarkIntel-AI',
    tagline: 'Threat Intelligence Dashboard',
    description:
      'A threat intelligence dashboard developed for HackUp 2026. Led the integration of LLMs using the Groq API and designed the 3D user interface using Spline. Features real-time threat data visualization and AI-powered analysis of security events.',
    tags: ['React', 'Spline 3D', 'Groq API', 'Node.js', 'LLM Integration'],
    icon: Brain,
    color: '#00d4ff',
    gradient: 'from-cyan-500/20 to-blue-600/10',
    borderGradient: 'rgba(0,212,255,0.3)',
    glowColor: 'rgba(0,212,255,0.15)',
    badge: 'HackUp 2026',
    badgeColor: '#00d4ff',
    githubUrl: 'https://github.com/Krishna-cell-12',
    featured: true,
  },
  {
    id: 'kernelstream',
    name: 'Kernel-Stream',
    tagline: 'Linux Observability Pipeline',
    description:
      'A full-stack Linux observability pipeline that uses eBPF to capture kernel-level events with minimal overhead, gRPC for high-performance telemetry transport, and a React dashboard for real-time visualization of system metrics and traces.',
    tags: ['eBPF', 'gRPC', 'React', 'Linux Kernel', 'JavaScript', 'Observability'],
    icon: Cpu,
    color: '#a855f7',
    gradient: 'from-purple-500/20 to-pink-600/10',
    borderGradient: 'rgba(168,85,247,0.3)',
    glowColor: 'rgba(168,85,247,0.15)',
    badge: 'Systems Engineering',
    badgeColor: '#a855f7',
    githubUrl: 'https://github.com/Krishna-cell-12/Kernel-Stream',
    featured: true,
  },
  {
    id: 'visionsync',
    name: 'Vision-Sync',
    tagline: 'AI Assistive System · <500ms Latency',
    description:
      'A real-time, low-latency (<500ms) AI assistive system for the visually impaired. Uses YOLOv8 for object detection and WebRTC for live video streaming, mapping visual environments into 3D spatial audio fields to enable independent navigation.',
    tags: ['YOLOv8', 'WebRTC', 'Python', 'Spatial Audio', 'AI', 'Computer Vision'],
    icon: Search,
    color: '#39d353',
    gradient: 'from-green-500/20 to-emerald-600/10',
    borderGradient: 'rgba(57,211,83,0.3)',
    glowColor: 'rgba(57,211,83,0.15)',
    badge: 'AI & Accessibility',
    badgeColor: '#39d353',
    githubUrl: 'https://github.com/Krishna-cell-12/Vision-Sync',
    featured: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Projects() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="projects" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyber-accent/3 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Featured Work</span>
          <h2 className="section-heading">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-cyber-muted mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Handpicked highlights spanning threat intelligence, kernel observability, and
            AI-powered assistive tech — each tackling a real engineering problem.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => {
            const { id, name, tagline, description, tags, icon: Icon, color, borderGradient, glowColor, badge, badgeColor, githubUrl } = project;
            const isHovered = hoveredId === id;

            return (
              <motion.div
                key={id}
                id={`project-${id}`}
                variants={cardVariants}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                className="project-card glass-card rounded-2xl overflow-hidden flex flex-col"
                style={{
                  border: `1px solid ${isHovered ? borderGradient : 'rgba(33,38,45,0.6)'}`,
                  boxShadow: isHovered ? `0 20px 60px ${glowColor}, 0 0 0 1px ${borderGradient}` : 'none',
                }}
              >
                {/* Top banner */}
                <div
                  className="relative h-32 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: `${color}08` }}
                >
                  {/* Grid lines */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(${color}08 1px, transparent 1px), linear-gradient(90deg, ${color}08 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                  {/* Icon */}
                  <motion.div
                    animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, border: `1px solid ${color}40` }}
                  >
                    <Icon size={28} style={{ color }} />
                  </motion.div>

                  {/* Featured star */}
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <Star size={10} style={{ color }} fill={color} />
                    <span className="text-xs font-mono" style={{ color }}>Featured</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Badge */}
                  <div className="mb-3">
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-medium"
                      style={{
                        backgroundColor: `${badgeColor}12`,
                        color: badgeColor,
                        border: `1px solid ${badgeColor}25`,
                      }}
                    >
                      <Zap size={10} />
                      {badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-cyber-text mb-1 font-mono">{name}</h3>
                  <p className="text-xs text-cyber-muted font-mono mb-3">{tagline}</p>

                  <p className="text-sm text-cyber-muted leading-relaxed flex-1 mb-5">
                    {description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs font-mono text-cyber-muted border border-cyber-border bg-cyber-surface"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-auto">
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`project-${id}-github`}
                      className="flex items-center gap-1.5 text-xs font-mono text-cyber-muted hover:text-cyber-text transition-colors"
                    >
                      <GithubIcon size={14} />
                      Source Code
                    </a>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`project-${id}-live`}
                      className="ml-auto flex items-center gap-1.5 text-xs font-mono font-medium transition-all duration-200 hover:-translate-y-0.5"
                      style={{ color }}
                    >
                      View Project
                      <ChevronRight size={13} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/Krishna-cell-12"
            target="_blank"
            rel="noopener noreferrer"
            id="all-projects-link"
            className="btn-secondary inline-flex items-center gap-2 text-sm"
          >
            <GithubIcon size={16} />
            View All on GitHub
            <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
