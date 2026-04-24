import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Code2,
  GitPullRequest,
  Users,
  Zap,
  Calendar,
  ExternalLink,
  BookOpen,
  ChevronRight,
  Terminal,
} from 'lucide-react';

const experiences = [
  {
    type: 'opensource',
    org: 'European Summer of Code (ESoC)',
    role: 'Open Source Contributor',
    period: '2025 – Present',
    color: '#00d4ff',
    icon: Code2,
    description:
      'Active contributor to the sktime repository — a unified Python framework for time-series machine learning. Participated in ESoC via the sktime community, submitting pull requests for feature enhancements, bug fixes, and documentation improvements.',
    highlights: ['sktime contributions', 'Time-series ML', 'PR reviews', 'Documentation'],
    link: 'https://github.com/sktime/sktime',
    linkLabel: 'sktime/sktime',
  },
  {
    type: 'opensource',
    org: 'CRIU (Checkpoint/Restore in Userspace)',
    role: 'Open Source Contributor',
    period: '2025 – Present',
    color: '#a855f7',
    icon: Terminal,
    description:
      'Contributed to CRIU — a core Linux tool enabling process checkpointing and live migration. Work spans low-level kernel interfaces, memory serialization, and process state capture — directly aligned with kernel development interests.',
    highlights: ['Linux kernel interfaces', 'Process checkpointing', 'C low-level', 'Live migration'],
    link: 'https://criu.org',
    linkLabel: 'criu.org',
  },
  {
    type: 'study',
    org: 'Bare Metal Foundation',
    role: 'Co-founder & Lead',
    period: '2025 – Present',
    color: '#39d353',
    icon: BookOpen,
    description:
      'Co-founded the Bare Metal Foundation study group focused on deep operating systems engineering and low-level roadmaps. Mentors peers in OS internals, 8086/ARM architecture, kernel development, and systems programming fundamentals.',
    highlights: ['OS Internals', 'ARM & x86 Architecture', 'Kernel Theory', 'Peer Mentoring'],
    link: null,
    linkLabel: null,
  },
];

const hackathons = [
  {
    name: 'HackUp 2026',
    project: 'DarkIntel-AI',
    color: '#00d4ff',
    description: 'Built a threat intelligence platform powered by LLMs. Led AI integration (Groq API) and 3D UI design (Spline).',
    role: 'Team Lead · AI & UI Engineer',
  },
  {
    name: 'NMIT Hacks 2026',
    project: 'Full-Stack Solution',
    color: '#f472b6',
    description: 'Participated in the NMIT national hackathon with a cross-functional team building a full-stack web solution.',
    role: 'Full-Stack Developer',
  },
  {
    name: 'GSoC Innovation Club',
    project: 'Preparation & Mentorship',
    color: '#fb923c',
    description: 'Active member of the GSoC Innovation Club at college, preparing contributions and mentoring peers on open-source workflows.',
    role: 'Member & Contributor',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Background</span>
          <h2 className="section-heading">
            Experience &{' '}
            <span className="gradient-text">Contributions</span>
          </h2>
          <p className="text-cyber-muted mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Open source involvement, hackathon wins, and academic community building.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Timeline */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono tracking-widest uppercase text-cyber-muted mb-6 flex items-center gap-2">
              <GitPullRequest size={14} className="text-cyber-accent" />
              Open Source & Leadership
            </h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-accent/60 via-cyber-purple/40 to-transparent" />

              <div className="space-y-6">
                {experiences.map((exp, i) => {
                  const Icon = exp.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="relative pl-14"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute left-2.5 top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10"
                        style={{
                          borderColor: exp.color,
                          backgroundColor: `${exp.color}15`,
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: exp.color }}
                        />
                      </div>

                      <div
                        className="glass-card rounded-xl p-5 border transition-all duration-300 hover:border-opacity-50"
                        style={{ borderColor: `${exp.color}20` }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `${exp.color}40`;
                          e.currentTarget.style.boxShadow = `0 8px 30px ${exp.color}12`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `${exp.color}20`;
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${exp.color}15`, border: `1px solid ${exp.color}30` }}
                            >
                              <Icon size={14} style={{ color: exp.color }} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-cyber-text text-sm">{exp.org}</h4>
                              <p className="text-xs text-cyber-muted font-mono">{exp.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <Calendar size={11} className="text-cyber-muted" />
                            <span className="text-xs font-mono text-cyber-muted">{exp.period}</span>
                          </div>
                        </div>

                        <p className="text-sm text-cyber-muted leading-relaxed mb-3">
                          {exp.description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {exp.highlights.map((h) => (
                            <span
                              key={h}
                              className="px-2 py-0.5 rounded text-xs font-mono border border-cyber-border bg-cyber-surface text-cyber-muted"
                            >
                              {h}
                            </span>
                          ))}
                        </div>

                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono transition-colors"
                            style={{ color: exp.color }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                          >
                            <ExternalLink size={11} />
                            {exp.linkLabel}
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: Hackathons */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono tracking-widest uppercase text-cyber-muted mb-6 flex items-center gap-2">
              <Trophy size={14} className="text-cyber-orange" />
              Hackathons & Events
            </h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-4"
            >
              {hackathons.map((h, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="glass-card rounded-xl p-4 border border-cyber-border hover:border-cyber-accent/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={13} style={{ color: h.color }} />
                    <span className="font-mono font-semibold text-sm text-cyber-text">{h.name}</span>
                  </div>
                  <p
                    className="text-xs font-mono mb-2"
                    style={{ color: h.color }}
                  >
                    {h.project}
                  </p>
                  <p className="text-xs text-cyber-muted leading-relaxed mb-2">{h.description}</p>
                  <div className="flex items-center gap-1.5">
                    <Users size={11} className="text-cyber-muted" />
                    <span className="text-xs font-mono text-cyber-muted">{h.role}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 glass-card rounded-xl p-4 border border-cyber-green/20 bg-cyber-green/5"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse-slow" />
                <span className="text-xs font-mono text-cyber-green uppercase tracking-widest">
                  Currently Active
                </span>
              </div>
              <p className="text-xs text-cyber-muted">
                Contributing to ESoC via sktime, CRIU kernel development, and leading Bare Metal Foundation study group.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
