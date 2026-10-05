import React, { useState } from 'react';
import { evaluateEligibility } from '../services/eligibilityEngine';
import { Users, UserPlus, Printer, ArrowRight } from 'lucide-react';
export const VolunteerModeDashboard = ({ schemes, language, activeProfile, onSelectProfile, onAddProfile }) => {
    const isHindi = language === 'hi';
    const [registeredCitizens, setRegisteredCitizens] = useState([
        activeProfile,
        {
            id: 'c-vol-1',
            name: 'Radhe Shyam',
            age: 45,
            gender: 'male',
            annualIncome: 140000,
            occupation: 'farmer',
            category: 'obc',
            state: 'Madhya Pradesh',
            landHoldingHectares: 1.8,
            disabilityPercentage: 0,
            hasBplCard: true,
            isStudent: false,
            educationLevel: '8th Pass',
            isMarried: true,
            hasGirlChildUnder10: false
        },
        {
            id: 'c-vol-2',
            name: 'Kamla Bai',
            age: 52,
            gender: 'female',
            annualIncome: 80000,
            occupation: 'artisan',
            category: 'sc',
            state: 'Madhya Pradesh',
            landHoldingHectares: 0,
            disabilityPercentage: 0,
            hasBplCard: true,
            isStudent: false,
            educationLevel: 'Illiterate',
            isMarried: true,
            hasGirlChildUnder10: false
        }
    ]);
    const [newCitizenName, setNewCitizenName] = useState('');
    const [newCitizenAge, setNewCitizenAge] = useState(30);
    const [newCitizenOcc, setNewCitizenOcc] = useState('farmer');
    const handleCreateCitizen = (e) => {
        e.preventDefault();
        if (!newCitizenName.trim())
            return;
        const newCitizen = {
            id: `c-vol-${Date.now()}`,
            name: newCitizenName.trim(),
            age: newCitizenAge,
            gender: 'male',
            annualIncome: 120000,
            occupation: newCitizenOcc,
            category: 'obc',
            state: 'Madhya Pradesh',
            landHoldingHectares: 1.0,
            disabilityPercentage: 0,
            hasBplCard: true,
            isStudent: false,
            educationLevel: '10th',
            isMarried: true,
            hasGirlChildUnder10: false
        };
        setRegisteredCitizens(prev => [...prev, newCitizen]);
        onAddProfile(newCitizen);
        setNewCitizenName('');
    };
    // Calculate total village stats
    const totalEligibleMatches = registeredCitizens.reduce((acc, c) => {
        const matches = schemes.filter(s => evaluateEligibility(c, s).status === 'eligible').length;
        return acc + matches;
    }, 0);
    return (<div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', borderTop: '4px solid var(--primary)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Users style={{ color: 'var(--primary)' }} size={24}/>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {isHindi ? 'ग्राम पंचायत सरपंच एवं ग्राम मित्र डैशबोर्ड' : 'Gram Sarpanch & Volunteer Multi-Citizen Dashboard'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {isHindi ? 'गांव के नागरिकों की डिजिटल सूची एवं सामूहिक योजना पात्रता सहायता' : 'Manage village profiles, batch eligibility runs & document distributions'}
            </p>
          </div>
        </div>

        <button className="btn btn-sm btn-primary" onClick={() => window.print()}>
          <Printer size={15}/>
          <span>{isHindi ? 'ग्राम रिपोर्ट प्रिंट करें' : 'Print Village Welfare Report'}</span>
        </button>
      </div>

      {/* Aggregate Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            {isHindi ? 'पंजीकृत ग्राम नागरिक' : 'Registered Citizens'}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
            {registeredCitizens.length}
          </div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            {isHindi ? 'कुल पात्र योजनाएं' : 'Total Eligible Matches'}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--emerald)' }}>
            {totalEligibleMatches}
          </div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            {isHindi ? 'अनुमानित वार्षिक प्रत्यक्ष लाभ' : 'Est. Annual Village Benefit'}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--saffron-dark)' }}>
            ₹{(registeredCitizens.length * 18000).toLocaleString('en-IN')} / yr
          </div>
        </div>
      </div>

      {/* Quick Add Citizen Bar */}
      <form onSubmit={handleCreateCitizen} style={{
            background: 'var(--bg-subtle)',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap'
        }}>
        <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
          ➕ {isHindi ? 'नया नागरिक जोड़ें:' : 'Quick Add Villager:'}
        </strong>

        <input type="text" placeholder={isHindi ? 'नागरिक का नाम (उदा. रामू यादव)' : 'Citizen Name'} value={newCitizenName} onChange={(e) => setNewCitizenName(e.target.value)} style={{
            flex: 1,
            minWidth: '180px',
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            fontSize: '0.88rem'
        }}/>

        <input type="number" placeholder="Age" value={newCitizenAge} onChange={(e) => setNewCitizenAge(parseInt(e.target.value, 10) || 18)} style={{
            width: '80px',
            padding: '0.5rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            fontSize: '0.88rem'
        }}/>

        <select value={newCitizenOcc} onChange={(e) => setNewCitizenOcc(e.target.value)} style={{
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            fontSize: '0.88rem'
        }}>
          <option value="farmer">Farmer (किसान)</option>
          <option value="artisan">Artisan (कारीगर)</option>
          <option value="street_vendor">Street Vendor (रेहड़ी)</option>
          <option value="student">Student (छात्र)</option>
        </select>

        <button type="submit" className="btn btn-sm btn-saffron">
          <UserPlus size={15}/>
          <span>{isHindi ? 'नागरिक जोड़ें' : 'Add Profile'}</span>
        </button>
      </form>

      {/* Citizen Roster List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {registeredCitizens.map((c) => {
            const eligibleCount = schemes.filter(s => evaluateEligibility(c, s).status === 'eligible').length;
            const isActive = activeProfile.id === c.id || activeProfile.name === c.name;
            return (<div key={c.id} onClick={() => onSelectProfile(c)} style={{
                    background: isActive ? 'var(--primary-subtle)' : 'var(--bg-card)',
                    border: isActive ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <strong style={{ fontSize: '1rem', color: isActive ? 'var(--primary)' : 'var(--text-main)' }}>
                  {c.name}
                </strong>
                <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                  {eligibleCount} Schemes Eligible
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Age: {c.age} yrs • {c.occupation.toUpperCase()} • Income: ₹{c.annualIncome.toLocaleString('en-IN')}/yr
              </div>

              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: 600 }}>
                <span>{isActive ? '✓ Active Profile' : 'Select to view scheme list'}</span>
                <ArrowRight size={14}/>
              </div>
            </div>);
        })}
      </div>

    </div>);
};
