import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  MapPin,
  CheckCircle,
  Terminal,
  AlertCircle,
  Loader,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Valid email is required';
    if (!form.message.trim() || form.message.length < 10)
      errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('sending');
    // Simulate async send — replace with Formspree/EmailJS in production
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const socials = [
    {
      id: 'contact-github',
      label: 'GitHub',
      href: 'https://github.com/Krishna-cell-12',
      icon: GithubIcon,
      color: '#e6edf3',
      bg: '#21262d',
    },
    {
      id: 'contact-linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/krishna-abhang-917910327/',
      icon: LinkedinIcon,
      color: '#0a66c2',
      bg: '#0a66c215',
    },
    {
      id: 'contact-email',
      label: 'Email',
      href: 'mailto:krishna.full24@gmail.com',
      icon: Mail,
      color: '#00d4ff',
      bg: '#00d4ff12',
    },
  ];

  const inputClass = (field) =>
    `w-full bg-cyber-surface border rounded-xl px-4 py-3 text-sm text-cyber-text font-mono placeholder-cyber-muted/50 transition-all duration-200 ${
      errors[field]
        ? 'border-red-500/50 focus:border-red-400'
        : 'border-cyber-border focus:border-cyber-accent/60'
    }`;

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-cyber-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-heading">
            Let's{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-cyber-muted mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Open to internship opportunities, open-source collaborations, and interesting
            engineering conversations. Reach out anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glass-card rounded-2xl p-6 border border-cyber-border">
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={16} className="text-cyber-accent" />
                <h3 className="font-mono font-semibold text-cyber-text text-sm">Quick Info</h3>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-cyber-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-cyber-muted text-xs uppercase tracking-widest mb-0.5">Location</p>
                    <p className="text-cyber-text">India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={14} className="text-cyber-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-cyber-muted text-xs uppercase tracking-widest mb-0.5">Email</p>
                    <a
                      href="mailto:krishna.full24@gmail.com"
                      className="text-cyber-text hover:text-cyber-accent transition-colors"
                    >
                      krishna.full24@gmail.com
                    </a>
                  </div>
                </div>
                <div className="pt-2 border-t border-cyber-border">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse-slow" />
                    <span className="text-cyber-green text-xs">Available for opportunities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {socials.map(({ id, label, href, icon: Icon, color, bg }) => (
                <motion.a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 border border-cyber-border hover:border-cyber-accent/30 transition-all duration-300 group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <span className="font-mono text-sm font-medium text-cyber-muted group-hover:text-cyber-text transition-colors">
                    {label}
                  </span>
                  <span className="ml-auto text-cyber-muted/30 group-hover:text-cyber-accent/60 transition-colors text-xs">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyber-border">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="w-16 h-16 rounded-full bg-cyber-green/15 border border-cyber-green/30 flex items-center justify-center"
                  >
                    <CheckCircle size={28} className="text-cyber-green" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-cyber-text">Message Sent!</h3>
                  <p className="text-cyber-muted text-sm max-w-xs">
                    Thanks for reaching out. I'll get back to you as soon as possible!
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-secondary text-sm mt-2"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-cyber-muted uppercase tracking-widest mb-1.5">
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClass('name')}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.name}
                        </p>
                      )}
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-cyber-muted uppercase tracking-widest mb-1.5">
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass('email')}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono text-cyber-muted uppercase tracking-widest mb-1.5">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className={inputClass('subject')}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-cyber-muted uppercase tracking-widest mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell me about your project or opportunity..."
                      className={`${inputClass('message')} resize-none`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-cyber-border text-center"
        >
          <p className="text-cyber-muted text-xs font-mono">
            © {new Date().getFullYear()}{' '}
            <span className="text-cyber-accent">Krishna Abhang</span> — Built with React,
            Tailwind CSS & Framer Motion.{' '}
            <span className="text-cyber-muted/50">All rights reserved.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
