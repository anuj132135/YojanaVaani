import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeechService } from '../services/speechService';
import { CheckCircle2, XCircle, AlertCircle, FileText, ExternalLink, Volume2, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
export const SchemeCard = ({ result, language, onOpenChecklist, isChatMatched }) => {
    const [showExplainability, setShowExplainability] = useState(false);
    const { scheme, status, score, passedRules, failedRules } = result;
    const isHindi = language === 'hi';
    const handleListenScheme = () => {
        const textToRead = isHindi
            ? `${scheme.hindiName}। ${scheme.hindiBenefitSummary}। आवश्यक दस्तावेज हैं: ${scheme.hindiRequiredDocuments.join(', ')}।`
            : `${scheme.name}. ${scheme.benefitSummary}. Required documents are: ${scheme.requiredDocuments.join(', ')}.`;
        SpeechService.speak(textToRead, language);
    };
    return (<motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }} whileHover={{ y: -2 }} className="glass-card" style={{
            padding: '1.5rem',
            marginBottom: '1.25rem',
            borderLeft: isChatMatched
                ? '5px solid var(--saffron-dark)'
                : status === 'eligible' ? '5px solid var(--emerald)' : status === 'partial' ? '5px solid var(--amber)' : '5px solid var(--border-color)',
            position: 'relative'
        }}>
      
      {/* Top Header & Eligibility Status Badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
            {isChatMatched && (<span className="badge" style={{ background: 'var(--saffron)', color: 'white', fontWeight: 700, fontSize: '0.75rem' }}>
                ✨ {isHindi ? 'चैट अनुरोध अनुसार' : 'Chat Query Match'}
              </span>)}
            <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>
              {scheme.categoryTag}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-subtle)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
              {scheme.isCentral ? 'Central Govt (केंद्र सरकार)' : 'State Govt (राज्य सरकार)'}
            </span>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem' }}>
            {isHindi ? scheme.hindiName : scheme.name}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {scheme.name} • {scheme.nodalMinistry}
          </p>
        </div>

        {/* Status Badge */}
        <div>
          {status === 'eligible' && (<motion.span initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="badge badge-success" style={{ fontSize: '0.88rem', padding: '0.4rem 0.85rem' }}>
              <CheckCircle2 size={16}/> {isHindi ? '100% योग्य (Eligible)' : 'Eligible (100% Match)'}
            </motion.span>)}
          {status === 'partial' && (<motion.span initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="badge badge-warning" style={{ fontSize: '0.88rem', padding: '0.4rem 0.85rem' }}>
              <AlertCircle size={16}/> {isHindi ? 'आंशिक पात्र (Partially Eligible)' : `Partial Match (${score}%)`}
            </motion.span>)}
          {status === 'ineligible' && (<span className="badge" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
              <XCircle size={16}/> {isHindi ? 'पात्र नहीं (Ineligible)' : 'Not Eligible'}
            </span>)}
        </div>
      </div>

      {/* Benefit Highlight Box */}
      <div style={{
            marginTop: '1rem',
            background: status === 'eligible' ? 'var(--emerald-light)' : 'var(--saffron-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.85rem 1.1rem',
            borderLeft: `4px solid ${status === 'eligible' ? 'var(--emerald)' : 'var(--saffron)'}`
        }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          🎁 {isHindi ? 'मुख्य लाभ (Scheme Benefit):' : 'Key Scheme Benefit:'}
        </div>
        <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.15rem' }}>
          {isHindi ? scheme.hindiBenefitSummary : scheme.benefitSummary}
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.85rem', lineHeight: 1.5 }}>
        {isHindi ? scheme.hindiDescription : scheme.description}
      </p>

      {/* Explainable Eligibility Breakdown Accordion */}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setShowExplainability(!showExplainability)} style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--primary-light)',
            fontWeight: 600,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: 0
        }}>
          <span>{isHindi ? 'पात्रता कारण देखें (Why You Qualify / Why Not)' : 'View Match Reasoning Breakdown'}</span>
          {showExplainability ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </button>

        <AnimatePresence>
          {showExplainability && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={{
                marginTop: '0.75rem',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                fontSize: '0.85rem',
                overflow: 'hidden'
            }}>
              {/* Passed Rules */}
              {passedRules.length > 0 && (<div style={{ marginBottom: '0.75rem' }}>
                  <strong style={{ color: 'var(--emerald-dark)', display: 'block', marginBottom: '0.35rem' }}>
                    ✓ {isHindi ? 'पूरे किए गए नियम (Matching Criteria):' : 'Criteria Passed:'}
                  </strong>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {passedRules.map((rule, idx) => (<li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--emerald)', flexShrink: 0 }}/>
                        <span>{isHindi ? rule.hindiRule : rule.rule}</span>
                      </li>))}
                  </ul>
                </div>)}

              {/* Failed Rules */}
              {failedRules.length > 0 && (<div>
                  <strong style={{ color: 'var(--rose)', display: 'block', marginBottom: '0.35rem' }}>
                    ✗ {isHindi ? 'अपात्रता के कारण (Unmatched Criteria):' : 'Unmatched Criteria:'}
                  </strong>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {failedRules.map((rule, idx) => (<li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                        <XCircle size={14} style={{ color: 'var(--rose)', flexShrink: 0 }}/>
                        <span>{isHindi ? rule.hindiRule : rule.rule}</span>
                      </li>))}
                  </ul>
                </div>)}
            </motion.div>)}
        </AnimatePresence>
      </div>

      {/* Official Verification Disclaimer Alert */}
      <div style={{
            marginTop: '1rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'var(--bg-subtle)',
            padding: '0.4rem 0.75rem',
            borderRadius: '4px'
        }}>
        <ShieldCheck size={14} style={{ color: 'var(--primary-light)', flexShrink: 0 }}/>
        <span>
          {isHindi
            ? 'अंतिम पात्रता निर्णय सरकारी अधिकारियों द्वारा दस्तावेजों के भौतिक सत्यापन के बाद ही मान्य होगा।'
            : 'Disclaimer: Final eligibility is subject to verification by designated government authorities.'}
        </span>
      </div>

      {/* Footer Action Buttons */}
      <div style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn btn-sm btn-primary" onClick={() => onOpenChecklist(result)}>
            <FileText size={15}/>
            <span>{isHindi ? 'दस्तावेज सूची एवं आवेदन विधि' : 'Document Checklist & Apply'}</span>
          </motion.button>

          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn btn-sm btn-outline" onClick={handleListenScheme} title="Listen spoken audio explanation">
            <Volume2 size={15} style={{ color: 'var(--saffron)' }}/>
            <span>{isHindi ? 'सुनें (Audio)' : 'Audio Guide'}</span>
          </motion.button>
        </div>

        <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={scheme.officialPortal} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline" style={{ textDecoration: 'none' }}>
          <span>{isHindi ? 'ऑफिशियल पोर्टल' : 'Official Portal'}</span>
          <ExternalLink size={13}/>
        </motion.a>
      </div>

    </motion.div>);
};
