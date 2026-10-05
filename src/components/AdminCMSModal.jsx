import React, { useState } from 'react';
import { X, Plus, Settings, CheckCircle2 } from 'lucide-react';
export const AdminCMSModal = ({ schemes, onAddScheme, language, onClose }) => {
    const isHindi = language === 'hi';
    const [activeTab, setActiveTab] = useState('list');
    // New Scheme Form State
    const [name, setName] = useState('');
    const [hindiName, setHindiName] = useState('');
    const [categoryTag, setCategoryTag] = useState('Agriculture');
    const [description, setDescription] = useState('');
    const [hindiDescription, setHindiDescription] = useState('');
    const [benefitSummary, setBenefitSummary] = useState('');
    const [hindiBenefitSummary, setHindiBenefitSummary] = useState('');
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(60);
    const [maxIncome, setMaxIncome] = useState(250000);
    const [documentsText, setDocumentsText] = useState('Aadhaar Card\nIncome Certificate\nBank Passbook');
    const [officialPortal, setOfficialPortal] = useState('https://india.gov.in');
    const [helpline, setHelpline] = useState('1800-111-222');
    const handleSubmitNewScheme = (e) => {
        e.preventDefault();
        if (!name.trim())
            return;
        const newScheme = {
            id: `custom-scheme-${Date.now()}`,
            name: name.trim(),
            hindiName: hindiName.trim() || name.trim(),
            categoryTag,
            description,
            hindiDescription: hindiDescription || description,
            benefitSummary,
            hindiBenefitSummary: hindiBenefitSummary || benefitSummary,
            rules: {
                minAge,
                maxAge,
                maxIncome
            },
            requiredDocuments: documentsText.split('\n').filter(Boolean),
            hindiRequiredDocuments: documentsText.split('\n').filter(Boolean),
            applicationSteps: ['Apply via designated portal or CSC center.'],
            hindiApplicationSteps: ['ऑफिशियल पोर्टल या निकटतम सीएससी पर आवेदन करें।'],
            officialPortal,
            helpline,
            isCentral: true,
            nodalMinistry: 'Ministry of Social Welfare & Empowerment'
        };
        onAddScheme(newScheme);
        setActiveTab('list');
        alert('Scheme added successfully!');
    };
    return (<div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
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
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: 'var(--radius-lg)'
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
            <Settings style={{ color: 'var(--primary)' }} size={24}/>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                {isHindi ? 'सरकारी योजना प्रबंधन (Admin CMS Scheme Manager)' : 'Government Scheme Admin CMS'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isHindi ? 'योजनाओं के नियम, पात्रता मानदंड एवं दस्तावेज अपडेट करें' : 'Add or modify welfare schemes & eligibility rules in real-time'}
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20}/>
          </button>
        </div>

        {/* Tab Buttons */}
        <div style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem' }}>
          <button className={`btn btn-sm ${activeTab === 'list' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('list')}>
            {isHindi ? `वर्तमान योजनाएं (${schemes.length})` : `Active Schemes (${schemes.length})`}
          </button>
          <button className={`btn btn-sm ${activeTab === 'add' ? 'btn-saffron' : 'btn-outline'}`} onClick={() => setActiveTab('add')}>
            <Plus size={15}/>
            <span>{isHindi ? 'नई योजना जोड़ें' : 'Add New Scheme'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '1.5rem' }}>

          {activeTab === 'list' ? (<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {schemes.map((s) => (<div key={s.id} style={{
                    padding: '1rem',
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>
                        {s.categoryTag}
                      </span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {s.name} ({s.hindiName})
                      </strong>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Benefit: {s.benefitSummary}
                    </p>
                  </div>

                  <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                    Active Rule Engine
                  </span>
                </div>))}
            </div>) : (<form onSubmit={handleSubmitNewScheme} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Scheme English Name *
                </label>
                <input type="text" required placeholder="e.g. Chief Minister Housing Grant" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Scheme Hindi Name
                </label>
                <input type="text" placeholder="उदा. मुख्यमंत्री आवास अनुदान" value={hindiName} onChange={(e) => setHindiName(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Category Tag
                </label>
                <select value={categoryTag} onChange={(e) => setCategoryTag(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Housing">Housing</option>
                  <option value="Finance & Business">Finance & Business</option>
                  <option value="Women & Child">Women & Child</option>
                  <option value="Social Security">Social Security</option>
                  <option value="Education & Skill">Education & Skill</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Benefit Summary (₹)
                </label>
                <input type="text" placeholder="e.g. ₹50,000 direct grant" value={benefitSummary} onChange={(e) => setBenefitSummary(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Max Annual Income Limit (₹)
                </label>
                <input type="number" value={maxIncome || ''} onChange={(e) => setMaxIncome(parseInt(e.target.value, 10) || undefined)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Min Age
                </label>
                <input type="number" value={minAge || ''} onChange={(e) => setMinAge(parseInt(e.target.value, 10) || undefined)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Max Age
                </label>
                <input type="number" value={maxAge || ''} onChange={(e) => setMaxAge(parseInt(e.target.value, 10) || undefined)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Official Portal URL
                </label>
                <input type="text" value={officialPortal} onChange={(e) => setOfficialPortal(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Helpline Number
                </label>
                <input type="text" value={helpline} onChange={(e) => setHelpline(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Hindi Benefit Summary
                </label>
                <input type="text" placeholder="उदा. ₹50,000 सीधी सहायता" value={hindiBenefitSummary} onChange={(e) => setHindiBenefitSummary(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Scheme Description (English)
                </label>
                <input type="text" placeholder="Brief summary of scheme" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Scheme Description (Hindi)
                </label>
                <input type="text" placeholder="योजना का संक्षिप्त विवरण" value={hindiDescription} onChange={(e) => setHindiDescription(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Required Documents (1 per line)
                </label>
                <textarea rows={3} value={documentsText} onChange={(e) => setDocumentsText(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}/>
              </div>

              <div style={{ gridColumn: '1 / -1', textAlign: 'right', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-saffron">
                  <CheckCircle2 size={16}/>
                  <span>Publish Scheme to Eligibility Engine</span>
                </button>
              </div>

            </form>)}

        </div>

      </div>
    </div>);
};
