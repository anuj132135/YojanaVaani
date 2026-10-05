import React from 'react';
import { SAMPLE_PERSONAS } from '../data/samplePersonas';
import { UserCheck, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
export const CitizenProfileEditor = ({ profile, onChange, language }) => {
    const updateField = (field, value) => {
        onChange({ ...profile, [field]: value });
    };
    const handleSelectPersona = (personaProfile) => {
        onChange({ ...personaProfile });
    };
    return (<div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <UserCheck style={{ color: 'var(--primary)' }} size={22}/>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
            {language === 'hi' ? 'नागरिक प्रोफ़ाइल (Citizen Details)' : 'Citizen Profile & Parameters'}
          </h2>
        </div>
        <span className="badge badge-info" style={{ gap: '4px' }}>
          <SlidersHorizontal size={12}/> Real-time Eligibility Matching
        </span>
      </div>

      {/* Persona Quick Selection Bar */}
      <div style={{ marginBottom: '1.25rem', background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          🚀 {language === 'hi' ? 'त्वरित परीक्षण हेतु नमूना प्रोफ़ाइल चुनें (Sample Personas):' : 'One-Click Sample Personas:'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
          {SAMPLE_PERSONAS.map((p) => {
            const isSelected = profile.id === p.profile.id || profile.name === p.profile.name;
            return (<button key={p.profile.id} onClick={() => handleSelectPersona(p.profile)} style={{
                    background: isSelected ? 'var(--primary-subtle)' : 'var(--bg-card)',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 0.75rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '0.88rem', color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>
                    {language === 'hi' ? p.hindiName : p.name}
                  </strong>
                  {isSelected && <CheckCircle2 size={14} style={{ color: 'var(--primary)' }}/>}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {p.role}
                </div>
              </button>);
        })}
        </div>
      </div>

      {/* Interactive Profile Form Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        {/* Name */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            {language === 'hi' ? 'नागरिक का नाम (Name)' : 'Citizen Name'}
          </label>
          <input type="text" value={profile.name} onChange={(e) => updateField('name', e.target.value)} style={{
            width: '100%',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontWeight: 500,
            fontSize: '0.9rem'
        }}/>
        </div>

        {/* Age */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            {language === 'hi' ? `आयु (Age): ${profile.age} वर्ष` : `Age: ${profile.age} years`}
          </label>
          <input type="number" min={1} max={100} value={profile.age} onChange={(e) => updateField('age', parseInt(e.target.value, 10) || 0)} style={{
            width: '100%',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontWeight: 500,
            fontSize: '0.9rem'
        }}/>
        </div>

        {/* Gender */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            {language === 'hi' ? 'लिंग (Gender)' : 'Gender'}
          </label>
          <select value={profile.gender} onChange={(e) => updateField('gender', e.target.value)} style={{
            width: '100%',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontWeight: 500,
            fontSize: '0.9rem'
        }}>
            <option value="male">पुरुष (Male)</option>
            <option value="female">महिला (Female)</option>
            <option value="other">अन्य (Other)</option>
          </select>
        </div>

        {/* Annual Income */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            {language === 'hi' ? 'वार्षिक पारिवारिक आय (₹ Income/yr)' : 'Annual Household Income (₹/yr)'}
          </label>
          <input type="number" step={10000} value={profile.annualIncome} onChange={(e) => updateField('annualIncome', parseInt(e.target.value, 10) || 0)} style={{
            width: '100%',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontWeight: 600,
            fontSize: '0.9rem'
        }}/>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            ₹{profile.annualIncome.toLocaleString('en-IN')} / year
          </div>
        </div>

        {/* Occupation */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            {language === 'hi' ? 'प्राथमिक व्यवसाय (Occupation)' : 'Primary Occupation'}
          </label>
          <select value={profile.occupation} onChange={(e) => updateField('occupation', e.target.value)} style={{
            width: '100%',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontWeight: 500,
            fontSize: '0.9rem'
        }}>
            <option value="farmer">किसान (Farmer)</option>
            <option value="artisan">पारंपरिक कारीगर (Artisan / Vishwakarma)</option>
            <option value="street_vendor">रेहड़ी-पटरी / स्ट्रीट वेंडर (Street Vendor)</option>
            <option value="unorganized_worker">असंगठित मजदूर (Unorganized Worker)</option>
            <option value="student">विद्यार्थी (Student)</option>
            <option value="self_employed">स्वरोजगार (Self Employed)</option>
            <option value="salaried">वेतनभोगी (Salaried)</option>
            <option value="unemployed">बेरोजगार (Unemployed)</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            {language === 'hi' ? 'सामाजिक वर्ग (Social Category)' : 'Social Category'}
          </label>
          <select value={profile.category} onChange={(e) => updateField('category', e.target.value)} style={{
            width: '100%',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontWeight: 500,
            fontSize: '0.9rem'
        }}>
            <option value="general">General (सामान्य)</option>
            <option value="obc">OBC (अन्य पिछड़ा वर्ग)</option>
            <option value="sc">SC (अनुसूचित जाति)</option>
            <option value="st">ST (अनुसूचित जनजाति)</option>
            <option value="minority">Minority (अल्पसंख्यक)</option>
          </select>
        </div>

        {/* State */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            {language === 'hi' ? 'राज्य (State)' : 'State / UT'}
          </label>
          <select value={profile.state} onChange={(e) => updateField('state', e.target.value)} style={{
            width: '100%',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontWeight: 500,
            fontSize: '0.9rem'
        }}>
            <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
            <option value="Uttar Pradesh">Uttar Pradesh (उत्तर प्रदेश)</option>
            <option value="Bihar">Bihar (बिहार)</option>
            <option value="Rajasthan">Rajasthan (राजस्थान)</option>
            <option value="Maharashtra">Maharashtra (महाराष्ट्र)</option>
            <option value="West Bengal">West Bengal (पश्चिम बंगाल)</option>
            <option value="Tamil Nadu">Tamil Nadu (तमिलनाडु)</option>
            <option value="Other">Other State / UT</option>
          </select>
        </div>

        {/* Land Holding */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            {language === 'hi' ? 'कृषि भूमि (Land in Hectares)' : 'Land Holding (Hectares)'}
          </label>
          <input type="number" step={0.1} min={0} max={50} value={profile.landHoldingHectares} onChange={(e) => updateField('landHoldingHectares', parseFloat(e.target.value) || 0)} style={{
            width: '100%',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontWeight: 500,
            fontSize: '0.9rem'
        }}/>
        </div>

      </div>

      {/* Special Category Checklist Toggles */}
      <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500 }}>
          <input type="checkbox" checked={profile.hasBplCard} onChange={(e) => updateField('hasBplCard', e.target.checked)} style={{ width: '18px', height: '18px', accentColor: 'var(--saffron)' }}/>
          <span>{language === 'hi' ? 'बीपीएल / पात्र गृहस्थी राशन कार्ड धारक' : 'Has BPL / Ration Card'}</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500 }}>
          <input type="checkbox" checked={profile.isStudent} onChange={(e) => updateField('isStudent', e.target.checked)} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}/>
          <span>{language === 'hi' ? 'अध्ययनरत विद्यार्थी (Currently Student)' : 'Currently Student'}</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500 }}>
          <input type="checkbox" checked={profile.hasGirlChildUnder10} onChange={(e) => updateField('hasGirlChildUnder10', e.target.checked)} style={{ width: '18px', height: '18px', accentColor: 'var(--emerald)' }}/>
          <span>{language === 'hi' ? '10 वर्ष से कम की बालिका है (Girl Child < 10 yrs)' : 'Has Girl Child < 10 yrs'}</span>
        </label>

      </div>

    </div>);
};
