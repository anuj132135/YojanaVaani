import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WelfareRuleEngine } from '../services/ruleEngine';
import { X, Cpu, CheckCircle2, XCircle, Sliders, Zap, Award } from 'lucide-react';
export const RuleEngineModal = ({ schemes, citizen, language, onClose }) => {
    const isHindi = language === 'hi';
    const [selectedSchemeId, setSelectedSchemeId] = useState(schemes[0]?.id || '');
    // Rule Engine Evaluation Results
    const selectedScheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0];
    const summary = WelfareRuleEngine.execute(citizen, selectedScheme);
    // Evaluate engine benchmark stats for all schemes
    const allSummaries = schemes.map(s => WelfareRuleEngine.execute(citizen, s));
    const totalEligible = allSummaries.filter(s => s.overallStatus === 'eligible').length;
    const avgExecTime = (allSummaries.reduce((acc, curr) => acc + curr.executionTimeMs, 0) / schemes.length).toFixed(2);
    return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
      <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="glass-card" style={{
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            padding: 0
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--saffron-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--saffron-dark)'
        }}>
              <Cpu size={22}/>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{isHindi ? 'योजना वाणी रूल इंजन (Rule Engine Inspector)' : 'YojanaVaani Rule Engine Inspector'}</span>
                <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>v2.4 Engine</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isHindi ? 'घोषणात्मक नियम मूल्यांकन एवं वास्तविक समय पात्रता गणना' : 'Declarative Rule Execution & Real-time Weighted Evaluation'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20}/>
          </button>
        </div>

        {/* Engine Performance Bar */}
        <div style={{
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Zap size={16} style={{ color: 'var(--saffron)' }}/>
              <strong>{isHindi ? 'औसत नियम निष्पादन समय:' : 'Avg Rule Latency:'}</strong>
              <span className="badge badge-success">{avgExecTime} ms</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Award size={16} style={{ color: 'var(--emerald)' }}/>
              <strong>{isHindi ? 'योग्य योजनाएं:' : 'Eligible Schemes:'}</strong>
              <span className="badge badge-info">{totalEligible} / {schemes.length}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{isHindi ? 'योजना चुनें:' : 'Select Scheme:'}</span>
            <select value={selectedSchemeId} onChange={(e) => setSelectedSchemeId(e.target.value)} style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            padding: '0.3rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            fontWeight: 600
        }}>
              {schemes.map(s => (<option key={s.id} value={s.id}>
                  {isHindi ? s.hindiName : s.name}
                </option>))}
            </select>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          
          {/* Active Citizen Profile Vector */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-color)'
        }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sliders size={16} style={{ color: 'var(--saffron)' }}/>
              <span>{isHindi ? 'नागरिक इनपुट वेक्टर (Input Profile State Vector):' : 'Citizen Input Vector:'}</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '0.6rem', fontSize: '0.82rem' }}>
              <div style={{ background: 'var(--bg-card)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Name:</span> <strong>{citizen.name}</strong>
              </div>
              <div style={{ background: 'var(--bg-card)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Age:</span> <strong>{citizen.age} yrs</strong>
              </div>
              <div style={{ background: 'var(--bg-card)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Income:</span> <strong>₹{citizen.annualIncome.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ background: 'var(--bg-card)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Occupation:</span> <strong>{citizen.occupation}</strong>
              </div>
              <div style={{ background: 'var(--bg-card)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Land:</span> <strong>{citizen.landHoldingHectares} Ha</strong>
              </div>
              <div style={{ background: 'var(--bg-card)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>BPL Card:</span> <strong>{citizen.hasBplCard ? 'Yes' : 'No'}</strong>
              </div>
            </div>
          </div>

          {/* Rule Engine Execution Tree Table */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>
                ⚙️ {isHindi ? 'नियम निष्पादन लॉग (Rule Execution Log)' : 'Rule Execution Trace Log'}
              </h4>
              <div style={{ fontSize: '0.85rem' }}>
                <strong>{isHindi ? 'भारित स्कोर:' : 'Weighted Score:'}</strong>{' '}
                <span className={`badge ${summary.overallStatus === 'eligible' ? 'badge-success' : 'badge-warning'}`}>
                  {summary.score}% ({summary.passedWeight} / {summary.totalWeight} Weight Pts)
                </span>
              </div>
            </div>

            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '0.6rem 0.85rem' }}>Rule Name</th>
                    <th style={{ padding: '0.6rem 0.85rem' }}>Weight</th>
                    <th style={{ padding: '0.6rem 0.85rem' }}>Operator / Target</th>
                    <th style={{ padding: '0.6rem 0.85rem' }}>Status</th>
                    <th style={{ padding: '0.6rem 0.85rem' }}>Evaluation Reasoning</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.logs.map((log) => (<tr key={log.ruleId} style={{ borderBottom: '1px solid var(--border-color)', background: log.passed ? 'rgba(74, 124, 89, 0.05)' : 'rgba(201, 74, 74, 0.05)' }}>
                      <td style={{ padding: '0.65rem 0.85rem', fontWeight: 600 }}>
                        {isHindi ? log.hindiRuleName : log.ruleName}
                      </td>
                      <td style={{ padding: '0.65rem 0.85rem' }}>
                        <span style={{ background: 'var(--bg-card)', padding: '0.15rem 0.4rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontWeight: 600 }}>
                          w={log.weight}
                        </span>
                      </td>
                      <td style={{ padding: '0.65rem 0.85rem', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        {JSON.stringify(log.expectedValue)}
                      </td>
                      <td style={{ padding: '0.65rem 0.85rem' }}>
                        {log.passed ? (<span style={{ color: 'var(--emerald)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle2 size={15}/> PASS
                          </span>) : (<span style={{ color: 'var(--rose)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <XCircle size={15}/> FAIL
                          </span>)}
                      </td>
                      <td style={{ padding: '0.65rem 0.85rem', color: 'var(--text-muted)' }}>
                        {isHindi ? log.hindiReason : log.reason}
                      </td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </motion.div>
    </motion.div>);
};
