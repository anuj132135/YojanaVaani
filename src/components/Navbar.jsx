import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Sun, Moon, Settings, Lock, LogOut, ShieldCheck } from 'lucide-react';
export const Navbar = ({ language, onLanguageChange, isDark, onToggleDark, isAdminLoggedIn, onOpenAdminLogin, onAdminLogout, onOpenAdminCMS, onOpenLocator }) => {
    return (<header className="no-print" style={{
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            boxShadow: 'var(--shadow-sm)'
        }}>
      <div className="app-container" style={{ padding: '0.85rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Logo & Branding */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <motion.img whileHover={{ scale: 1.05, rotate: 2 }} src="/logo.png" alt="YojanaVaani Logo" style={{
            height: '48px',
            width: 'auto',
            objectFit: 'contain',
            borderRadius: '8px',
            background: '#faf6ee',
            padding: '3px 6px',
            border: '1px solid var(--border-color)',
            cursor: 'pointer'
        }}/>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  YojanaVaani
                </h1>
                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--saffron)' }}>
                  योजना वाणी
                </span>
                {isAdminLoggedIn && (<span className="badge badge-success" style={{ gap: '4px' }}>
                    <ShieldCheck size={12}/> Admin Active
                  </span>)}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Voice-First Government Scheme Eligibility Assistant
              </p>
            </div>
          </motion.div>

          {/* Controls & Mode Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            
            {/* Language Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-subtle)', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <Globe size={16} style={{ color: 'var(--saffron)' }}/>
              <select value={language} onChange={(e) => onLanguageChange(e.target.value)} style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-main)',
            fontWeight: 600,
            fontSize: '0.85rem',
            outline: 'none',
            cursor: 'pointer'
        }}>
                <option value="hi" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>हिंदी (Hindi)</option>
                <option value="en" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>English</option>
              </select>
            </div>

            {/* CSC Locator Button */}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-sm btn-outline" onClick={onOpenLocator} title="Find nearest CSC / Jan Seva Kendra office">
              📍 Nearest Center
            </motion.button>

            {/* Dark / Light Toggle */}
            <motion.button whileHover={{ scale: 1.08, rotate: 15 }} whileTap={{ scale: 0.92 }} className="btn btn-sm btn-outline" onClick={onToggleDark} title="Toggle Dark / Light Theme">
              {isDark ? <Sun size={15}/> : <Moon size={15}/>}
            </motion.button>

            {/* Admin Authentication Buttons */}
            {isAdminLoggedIn ? (<>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-sm btn-saffron" onClick={onOpenAdminCMS} title="Government Admin Scheme CMS Manager">
                  <Settings size={15}/>
                  <span>Admin CMS</span>
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-sm btn-outline" onClick={onAdminLogout} title="Log out from Admin session">
                  <LogOut size={15} style={{ color: 'var(--rose)' }}/>
                  <span>Logout Admin</span>
                </motion.button>
              </>) : (<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-sm btn-outline" onClick={onOpenAdminLogin} title="Admin Login to manage government schemes">
                <Lock size={15} style={{ color: 'var(--saffron)' }}/>
                <span>Admin Login</span>
              </motion.button>)}

          </div>

        </div>
      </div>
    </header>);
};
