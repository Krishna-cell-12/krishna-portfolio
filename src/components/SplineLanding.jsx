import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Zap } from 'lucide-react';

const SCENE_URL = 'https://prod.spline.design/9Gn1j7uSxAqhQhxm/scene.splinecode';

export default function SplineLanding({ onEnter }) {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [hint, setHint] = useState(false); // show click-hint tooltip briefly
  const exitingRef = useRef(false);

  const handleEnter = () => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
    setTimeout(() => onEnter(), 750);
  };

  // Fires when user clicks any object inside the Spline scene
  const handleSplineMouseDown = (e) => {
    if (exitingRef.current) return;
    const name = (e?.target?.name || '').toLowerCase();
    // Trigger on "My Portfolio", "Click Me", "Enter", or any interactive Spline object
    if (
      name.includes('portfolio') ||
      name.includes('enter') ||
      name.includes('start') ||
      name.includes('begin') ||
      name.includes('button') ||
      name.includes('click') ||
      name.includes('arrow') ||
      name.includes('me')
    ) {
      handleEnter();
    }
  };

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="spline-landing"
          className="spline-landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* ── Spline canvas (full-screen, interactive) ── */}
          <div className="spline-canvas-wrap">
            {!splineLoaded && (
              <div className="spline-preloader">
                <div className="spline-preloader-logo">K</div>
                <p className="spline-preloader-text">Initialising 3D scene…</p>
                <div className="spline-preloader-bar">
                  <div className="spline-preloader-fill" />
                </div>
              </div>
            )}
            <Spline
              scene={SCENE_URL}
              onLoad={() => {
                setSplineLoaded(true);
                // Show the hint tooltip after a short delay
                setTimeout(() => setHint(true), 1200);
                setTimeout(() => setHint(false), 5000);
              }}
              onSplineMouseDown={handleSplineMouseDown}
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* ── Subtle vignette ── */}
          <div className="spline-vignette" />

          {/* ── Top-left branding ── */}
          <motion.div
            className="spline-brand"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: splineLoaded ? 1 : 0, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="spline-brand-icon">K</div>
            <div>
              <p className="spline-brand-name">Krishna Abhang</p>
              <p className="spline-brand-tag">Portfolio v2.0</p>
            </div>
          </motion.div>

          {/* ── Badge top-right ── */}
          <motion.div
            className="spline-badge spline-badge-top"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: splineLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Zap size={12} />
            <span>Interactive 3D Portfolio</span>
          </motion.div>

          {/* ── "Click My Portfolio" animated hint ── */}
          <AnimatePresence>
            {hint && (
              <motion.div
                key="hint-tooltip"
                className="spline-click-hint"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
              >
                <MousePointer2 size={15} />
                <span>Click <strong>My Portfolio</strong> in the scene to continue</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Fallback bottom button (always visible after load) ── */}
          <motion.div
            className="spline-overlay spline-overlay-minimal"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: splineLoaded ? 1 : 0, y: splineLoaded ? 0 : 24 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <button
              id="spline-enter-btn"
              className="spline-enter-btn spline-enter-btn-ghost"
              onClick={handleEnter}
            >
              <span>Skip to Portfolio</span>
              <span className="spline-enter-arrow">→</span>
            </button>
          </motion.div>
        </motion.div>
      ) : (
        /* ── Exit transition: name reveal before portfolio ── */
        <motion.div
          key="exit-reveal"
          className="spline-exit-reveal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="spline-exit-name"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <span className="spline-exit-name-white">Krishna </span>
            <span className="spline-exit-name-gradient">Abhang</span>
          </motion.div>
          <motion.p
            className="spline-exit-sub"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Systems Engineer · Full-Stack Developer · AI Integrator
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
