import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Shield, GitBranch } from 'lucide-react';

const skillGroups = [
  {
    category: 'Low-Level & Systems',
    icon: Cpu,
    color: '#00d4ff',
    colorName: 'cyber',
    skills: [
      'OS Fundamentals',
      'Kernel Development',
      '8086 Architecture',
      'ARM Architecture',
      'Bare Metal Development',
      'Memory Management',
      'x86 Assembly',
    ],
  },
  {
    category: 'Full-Stack & UI',
    icon: Globe,
    color: '#a855f7',
    colorName: 'purple',
    skills: [
      'React',
      'Node.js',
      'Vite',
      'Flutter',
      'Dart',
      'Spline 3D UI',
      'REST APIs',
    ],
  },
  {
    category: 'Cybersecurity & AI',
    icon: Shield,
    color: '#f472b6',
    colorName: 'pink',
    skills: [
      'Threat Intelligence',
      'Digital Forensics',
      'Groq API (LLM)',
      'Image Tampering Detection',
      'Data Integrity',
      'LLM Integration',
    ],
  },
  {
    category: 'Open Source Tools',
    icon: GitBranch,
    color: '#39d353',
    colorName: 'green',
    skills: [
      'Git',
      'GitHub PR Workflows',
      'Open Source Contribution',
      'Code Review',
      'sktime',
      'CRIU',
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Technical Expertise</span>
          <h2 className="section-heading">
            Skills &{' '}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-cyber-muted mt-3 max-w-xl mx-auto text-sm sm:text-base">
            From bare-metal programming to modern cloud-connected UIs — a diverse
            toolkit built through projects and open-source contributions.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillGroups.map(({ category, icon: Icon, color, skills }) => (
            <motion.div
              key={category}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 transition-all duration-300 cursor-default"
              style={{
                borderColor: `${color}20`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${color}40`;
                e.currentTarget.style.boxShadow = `0 0 30px ${color}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${color}20`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-cyber-text text-sm">{category}</h3>
                  <span className="text-xs font-mono text-cyber-muted">
                    {skills.length} technologies
                  </span>
                </div>
              </div>

              {/* Tags */}
              <motion.div
                className="flex flex-wrap gap-2"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariants}
                    className="tag-glow px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyber-muted border border-cyber-border bg-cyber-surface cursor-default"
                    style={{ '--tag-color': color }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { label: 'Projects Built', value: '10+' },
            { label: 'Open Source PRs', value: '15+' },
            { label: 'Hackathons', value: '3' },
            { label: 'Study Groups Led', value: '1' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-black gradient-text">{value}</span>
              <span className="text-xs font-mono text-cyber-muted uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
