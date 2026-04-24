import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  GitFork,
  ExternalLink,
  Code2,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

const GITHUB_USERNAME = 'Krishna-cell-12';

const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  C: '#555555',
  'C++': '#f34b7d',
  Rust: '#dea584',
  Go: '#00ADD8',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
  Assembly: '#6E4C13',
  default: '#8b949e',
};

function LanguageDot({ language }) {
  const color = LANGUAGE_COLORS[language] || LANGUAGE_COLORS.default;
  return (
    <span
      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
      style={{ backgroundColor: color }}
    />
  );
}

function RepoCard({ repo, index }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      id={`repo-${repo.name}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl p-5 flex flex-col gap-3 border border-cyber-border hover:border-cyber-accent/30 transition-all duration-300 group cursor-pointer"
      style={{}}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,212,255,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Code2 size={15} className="text-cyber-accent flex-shrink-0" />
          <span className="font-mono font-semibold text-cyber-text text-sm truncate group-hover:text-cyber-accent transition-colors">
            {repo.name}
          </span>
        </div>
        <ExternalLink
          size={13}
          className="text-cyber-muted group-hover:text-cyber-accent transition-colors flex-shrink-0 mt-0.5"
        />
      </div>

      {/* Description */}
      <p className="text-xs text-cyber-muted leading-relaxed line-clamp-2 flex-1">
        {repo.description || 'No description provided.'}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          {repo.language && (
            <span className="flex items-center gap-1.5 text-xs text-cyber-muted">
              <LanguageDot language={repo.language} />
              {repo.language}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-cyber-muted">
            <Star size={11} />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1 text-xs text-cyber-muted">
            <GitFork size={11} />
            {repo.forks_count}
          </span>
        </div>
      </div>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-cyber-border/50">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 rounded text-xs font-mono bg-cyber-accent/8 text-cyber-accent/70 border border-cyber-accent/15"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </motion.a>
  );
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const [repoRes, profileRes] = await Promise.all([
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`,
          { headers: { Accept: 'application/vnd.github+json' } }
        ),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers: { Accept: 'application/vnd.github+json' },
        }),
      ]);

      if (!repoRes.ok) throw new Error(`GitHub API error: ${repoRes.status}`);

      const allRepos = await repoRes.json();
      const profileData = await profileRes.json();

      // Filter: not a fork, sort by stars then pushed_at
      const filtered = allRepos
        .filter((r) => !r.fork)
        .sort((a, b) => {
          if (b.stargazers_count !== a.stargazers_count)
            return b.stargazers_count - a.stargazers_count;
          return new Date(b.pushed_at) - new Date(a.pushed_at);
        })
        .slice(0, 9);

      setRepos(filtered);
      setProfile(profileData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <section id="github" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Open Source</span>
          <h2 className="section-heading">
            GitHub{' '}
            <span className="gradient-text-green">Repositories</span>
          </h2>
          <p className="text-cyber-muted mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Live feed from GitHub — non-fork repos sorted by stars and recent activity.
          </p>
        </motion.div>

        {/* Profile card */}
        {profile && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-5 border border-cyber-border"
          >
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-16 h-16 rounded-full border-2 border-cyber-accent/30"
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-cyber-text">{profile.name}</h3>
              <p className="text-xs font-mono text-cyber-muted">@{profile.login}</p>
              {profile.bio && (
                <p className="text-sm text-cyber-muted mt-1">{profile.bio}</p>
              )}
            </div>
            <div className="flex gap-6">
              {[
                { label: 'Repos', value: profile.public_repos },
                { label: 'Followers', value: profile.followers },
                { label: 'Following', value: profile.following },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-xl font-black gradient-text-green">{value}</div>
                  <div className="text-xs font-mono text-cyber-muted uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs flex items-center gap-2"
            >
              <GithubIcon size={14} />
              Profile
            </a>
          </motion.div>
        )}

        {/* States */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw size={28} className="text-cyber-accent" />
            </motion.div>
            <p className="text-cyber-muted font-mono text-sm">
              Fetching repositories from GitHub...
            </p>
          </div>
        )}

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card rounded-xl p-8 text-center border border-red-500/20"
          >
            <AlertCircle size={32} className="text-red-400 mx-auto mb-3" />
            <p className="text-red-400 font-mono text-sm mb-4">{error}</p>
            <button
              onClick={fetchRepos}
              className="btn-secondary text-xs flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={13} />
              Retry
            </button>
          </motion.div>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-16 text-cyber-muted font-mono text-sm">
            No public repositories found.
          </div>
        )}
      </div>
    </section>
  );
}
