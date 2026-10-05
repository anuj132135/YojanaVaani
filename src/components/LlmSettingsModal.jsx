import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LLMService } from '../services/llmService';
import { X, Sparkles, Key, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
export const LlmSettingsModal = ({ language, onClose, onKeySaved }) => {
    const isHindi = language === 'hi';
    const [apiKeyInput, setApiKeyInput] = useState(LLMService.getApiKey());
    const [savedSuccess, setSavedSuccess] = useState(false);
    const handleSaveKey = (e) => {
        e.preventDefault();
        LLMService.setApiKey(apiKeyInput.trim());
        setSavedSuccess(true);
        setTimeout(() => {
            onKeySaved();
            onClose();
        }, 1200);
    };
    const isConfigured = LLMService.hasApiKey();
    return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
      <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="glass-card" style={{
            width: '100%',
            maxWidth: '460px',
            borderRadius: 'var(--radius-lg)',
            padding: 0,
            overflow: 'hidden'
        }}>
        
        {/* Header */}
        <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--saffron-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--saffron-dark)'
        }}>
              <Sparkles size={20}/>
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                {isHindi ? 'Google Gemini LLM API सेटिंग्स' : 'Google Gemini LLM API Settings'}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {isHindi ? 'प्राकृतिक भाषा समझ हेतु AI मॉडल कंफ़िगर करें' : 'Configure LLM Inference Model for Natural Voice Parsing'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20}/>
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSaveKey} style={{ padding: '1.5rem' }}>
          
          {/* Active Status Badge */}
          <div style={{
            marginBottom: '1.25rem',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-sm)',
            background: isConfigured ? 'var(--emerald-light)' : 'var(--saffron-light)',
            border: `1px solid ${isConfigured ? 'var(--emerald)' : 'var(--saffron)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.88rem'
        }}>
            {isConfigured ? (<CheckCircle2 size={18} style={{ color: 'var(--emerald)', flexShrink: 0 }}/>) : (<Cpu size={18} style={{ color: 'var(--saffron-dark)', flexShrink: 0 }}/>)}
            <div>
              <strong style={{ color: isConfigured ? 'var(--emerald-dark)' : 'var(--saffron-dark)' }}>
                {isConfigured
            ? (isHindi ? '🤖 Gemini LLM API सक्रिय है (Active Mode)' : '🤖 Gemini LLM API Active')
            : (isHindi ? '⚡ हाइब्रिड मोड (Local NLP + Optional Gemini LLM Key)' : '⚡ Hybrid Engine (Local NLP + Gemini Key)')}
              </strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', marginTop: '0.15rem' }}>
                {isConfigured
            ? (isHindi ? 'आपकी योजना वाणी चैट सीधे गूगल जेमिनी 1.5 फ़्लैश LLM मॉडल से संचालित हो रही है।' : 'YojanaVaani AI chatbot is running live with Google Gemini 1.5 Flash.')
            : (isHindi ? 'बिना API Key के भी योजना वाणी का स्थानिक NLP + Rule Engine 100% सही कार्य करता है।' : 'Local Rule Engine active. Enter Gemini API key to enable LLM reasoning.')}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              {isHindi ? 'Google Gemini API Key' : 'Google Gemini API Key'}
            </label>
            <div style={{ position: 'relative' }}>
              <input type="password" value={apiKeyInput} onChange={(e) => setApiKeyInput(e.target.value)} placeholder="AIzaSy..." style={{
            width: '100%',
            padding: '0.65rem 0.85rem 0.65rem 2.2rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontSize: '0.9rem',
            fontWeight: 500
        }}/>
              <Key size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
            </div>
          </div>

          {savedSuccess && (<div style={{ marginBottom: '1rem', color: 'var(--emerald)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={16}/>
              <span>{isHindi ? 'API Key सफलतापूर्वक सहेज ली गई!' : 'Gemini API Key saved successfully!'}</span>
            </div>)}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn btn-saffron" style={{ flex: 1, padding: '0.7rem' }}>
              <span>{isHindi ? 'सेटिंग्स सहेजें (Save Key)' : 'Save Gemini Key'}</span>
            </motion.button>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              {isHindi ? 'रद्द करें' : 'Close'}
            </button>
          </div>

        </form>

      </motion.div>
    </motion.div>);
};
