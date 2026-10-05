import React, { useState } from 'react';
import { X, CheckSquare, Square, Printer, ExternalLink, FileCheck } from 'lucide-react';
export const DocumentChecklistModal = ({ result, citizen, language, onClose }) => {
    const { scheme } = result;
    const isHindi = language === 'hi';
    const docList = isHindi ? scheme.hindiRequiredDocuments : scheme.requiredDocuments;
    // Track checked documents
    const [checkedDocs, setCheckedDocs] = useState({});
    const toggleDoc = (index) => {
        setCheckedDocs(prev => ({ ...prev, [index]: !prev[index] }));
    };
    const checkedCount = Object.values(checkedDocs).filter(Boolean).length;
    const readinessPercent = Math.round((checkedCount / docList.length) * 100);
    const handlePrintKit = () => {
        window.print();
    };
    return (<div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
      <div className="glass-card" style={{
            width: '100%',
            maxWidth: '750px',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: 'var(--radius-lg)',
            padding: '0'
        }}>
        
        {/* Modal Header */}
        <div className="no-print" style={{
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
            <FileCheck style={{ color: 'var(--emerald)' }} size={24}/>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                {isHindi ? 'दस्तावेज चेकलिस्ट एवं आवेदन गाइड' : 'Document Checklist & Application Kit'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isHindi ? scheme.hindiName : scheme.name}
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.35rem',
            borderRadius: '50%'
        }}>
            <X size={20}/>
          </button>
        </div>

        {/* Modal Content / Printable Area */}
        <div style={{ padding: '1.5rem' }}>

          {/* Printable Header Banner */}
          <div className="print-only" style={{ display: 'none', marginBottom: '1.5rem', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '1rem' }}>
            <img src="/logo.png" alt="YojanaVaani Logo" style={{ height: '60px', marginBottom: '8px' }}/>
            <h2>YojanaVaani (योजना वाणी) - Government Scheme Application Kit</h2>
            <p>Citizen: <strong>{citizen.name}</strong> | Age: {citizen.age} | State: {citizen.state} | Occupation: {citizen.occupation}</p>
            <h3>Scheme: {scheme.name} ({scheme.hindiName})</h3>
          </div>

          {/* Readiness Progress Bar */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                📋 {isHindi ? 'दस्तावेज तैयारी प्रतिशत (Document Readiness):' : 'Document Readiness Score:'}
              </strong>
              <span className="badge badge-success" style={{ fontSize: '0.85rem' }}>
                {checkedCount} / {docList.length} Ready ({readinessPercent}%)
              </span>
            </div>
            
            <div style={{ width: '100%', height: '10px', background: 'var(--border-color)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{
            width: `${readinessPercent}%`,
            height: '100%',
            background: readinessPercent === 100 ? 'var(--emerald)' : 'var(--saffron)',
            transition: 'width 0.3s ease'
        }}/>
            </div>
          </div>

          {/* Checklist Items */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              {isHindi ? '1. आवश्यक दस्तावेजों की सूची (अपनी स्थिति टिक करें):' : '1. Required Documents Checklist (Tick what you have):'}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {docList.map((doc, idx) => {
            const isChecked = !!checkedDocs[idx];
            return (<div key={idx} onClick={() => toggleDoc(idx)} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: isChecked ? 'var(--emerald-light)' : 'var(--bg-subtle)',
                    border: `1px solid ${isChecked ? 'var(--emerald)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                }}>
                    {isChecked ? (<CheckSquare size={20} style={{ color: 'var(--emerald-dark)', flexShrink: 0 }}/>) : (<Square size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }}/>)}
                    <span style={{
                    fontSize: '0.92rem',
                    fontWeight: isChecked ? 600 : 400,
                    color: isChecked ? 'var(--emerald-dark)' : 'var(--text-main)',
                    textDecoration: isChecked ? 'none' : 'none'
                }}>
                      {doc}
                    </span>
                  </div>);
        })}
            </div>
          </div>

          {/* Application Steps */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              {isHindi ? '2. आवेदन प्रक्रिया (चरण-दर-चरण मार्गदर्शिका):' : '2. Step-by-Step Application Steps:'}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {(isHindi ? scheme.hindiApplicationSteps : scheme.applicationSteps).map((step, idx) => (<div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: '2px'
            }}>
                    {idx + 1}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                    {step}
                  </p>
                </div>))}
            </div>
          </div>

          {/* Official Helpline & Portal Box */}
          <div style={{
            background: 'var(--saffron-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
        }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--saffron-dark)' }}>
                📞 {isHindi ? 'हेल्पलाइन एवं पूछताछ नंबर:' : 'Official Helpline:'}
              </div>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>
                {scheme.helpline}
              </strong>
            </div>

            <a href={scheme.officialPortal} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-saffron" style={{ textDecoration: 'none' }}>
              <span>{isHindi ? 'ऑनलाइन आवेदन पोर्टल पर जाएं' : 'Open Official Portal'}</span>
              <ExternalLink size={14}/>
            </a>
          </div>

          {/* Action Footer */}
          <div className="no-print" style={{
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
        }}>
            <button className="btn btn-outline" onClick={onClose}>
              {isHindi ? 'बंद करें' : 'Close'}
            </button>

            <button className="btn btn-primary" onClick={handlePrintKit}>
              <Printer size={16}/>
              <span>{isHindi ? 'पात्रता एवं दस्तावेज किट प्रिंट करें (Print Kit)' : 'Print Eligibility & Document Kit'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>);
};
