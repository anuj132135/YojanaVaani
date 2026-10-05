import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, KeyRound, ShieldCheck, AlertCircle } from 'lucide-react';
export const AdminLoginModal = ({ language, onLoginSuccess, onClose }) => {
    const isHindi = language === 'hi';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMsg('');
        // Admin authentication check
        if (username.trim() === 'admin' && (password === 'admin123' || password === '1234')) {
            onLoginSuccess();
        }
        else {
            setErrorMsg(isHindi
                ? 'गलत यूज़रनेम या पासवर्ड!'
                : 'Invalid Admin Credentials!');
        }
    };
    return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(6px)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
      <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="glass-card" style={{
            width: '100%',
            maxWidth: '420px',
            borderRadius: 'var(--radius-lg)',
            padding: '0'
        }}>
        
        {/* Header */}
        <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-subtle)',
            borderTopLeftRadius: 'var(--radius-lg)',
            borderTopRightRadius: 'var(--radius-lg)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--saffron-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--saffron-dark)'
        }}>
              <Lock size={20}/>
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                {isHindi ? 'प्रशासक लॉगिन (Admin Login)' : 'Government Admin Login'}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {isHindi ? 'योजना प्रबंधन पोर्टल में प्रवेश करें' : 'Authorized Access for Scheme Portal Admins'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20}/>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ padding: '1.5rem' }}>
          
          {errorMsg && (<div style={{
                marginBottom: '1rem',
                padding: '0.75rem 1rem',
                background: 'var(--rose-light)',
                border: '1px solid var(--rose)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--rose)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }}/>
              <span>{errorMsg}</span>
            </div>)}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              {isHindi ? 'प्रशासक यूज़रनेम (Username)' : 'Admin Username'}
            </label>
            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder={isHindi ? 'यूज़रनेम दर्ज करें' : 'Enter admin username'} style={{
            width: '100%',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontSize: '0.9rem',
            fontWeight: 500
        }}/>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              {isHindi ? 'पासवर्ड / सिक्योरिटी पिन (Password)' : 'Admin Password / Security PIN'}
            </label>
            <div style={{ position: 'relative' }}>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isHindi ? 'पासवर्ड दर्ज करें' : 'Enter admin password'} style={{
            width: '100%',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontSize: '0.9rem',
            fontWeight: 500
        }}/>
              <KeyRound size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn btn-saffron" style={{ width: '100%', padding: '0.75rem' }}>
            <ShieldCheck size={18}/>
            <span>{isHindi ? 'लॉगिन करें (Login)' : 'Sign In as Admin'}</span>
          </motion.button>

        </form>

      </motion.div>
    </motion.div>);
};
