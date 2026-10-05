import React, { useState } from 'react';
import { X, MapPin, Navigation, Phone, Search } from 'lucide-react';
export const CscLocatorModal = ({ language, onClose }) => {
    const isHindi = language === 'hi';
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const centers = [
        {
            id: 'c1',
            name: 'Digital Seva Kendra (CSC) - Main Market',
            hindiName: 'डिजिटल सेवा केंद्र (सीएससी) - मुख्य बाजार',
            type: 'CSC',
            address: 'Shop No. 12, Main Market, Block-1, District HQ',
            hindiAddress: 'दुकान नं. 12, मुख्य बाजार, ब्लॉक-1, जिला मुख्यालय',
            distanceKm: 0.8,
            contactPerson: 'Suresh Kumar (VLE Operator)',
            phone: '+91 98765 43210',
            timings: '09:00 AM - 07:00 PM (Mon-Sat)'
        },
        {
            id: 'c2',
            name: 'Tehsil Social Welfare Office',
            hindiName: 'तहसील समाज कल्याण कार्यालय',
            type: 'Tehsil',
            address: 'Tehsil Compound, Near Revenue Court, Sector-4',
            hindiAddress: 'तहसील परिसर, राजस्व न्यायालय के पास, सेक्टर-4',
            distanceKm: 2.3,
            contactPerson: 'Tehsildar Office / Reader',
            phone: '0755-2443322',
            timings: '10:00 AM - 05:00 PM (Govt Working Days)'
        },
        {
            id: 'c3',
            name: 'Gram Panchayat Bhawan & Jan Seva Kendra',
            hindiName: 'ग्राम पंचायत भवन एवं जन सेवा केंद्र',
            type: 'GramPanchayat',
            address: 'Panchayat Bhavan Campus, Rampur Village',
            hindiAddress: 'पंचायत भवन परिसर, रामपुर गांव',
            distanceKm: 1.5,
            contactPerson: 'Panchayat Secretary (Sachiv)',
            phone: '+91 94250 11223',
            timings: '10:00 AM - 04:00 PM (Mon-Fri)'
        },
        {
            id: 'c4',
            name: 'India Post Payments Bank (IPPB) Branch',
            hindiName: 'इंडिया पोस्ट पेमेंट बैंक शाखा (डाकघर)',
            type: 'Bank',
            address: 'Head Post Office, Station Road',
            hindiAddress: 'प्रधान डाकघर, स्टेशन रोड',
            distanceKm: 3.1,
            contactPerson: 'Post Master / GDS',
            phone: '1800-266-6868',
            timings: '09:30 AM - 05:30 PM (Mon-Sat)'
        }
    ];
    const filteredCenters = centers.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.hindiName.includes(searchQuery);
        const matchesType = selectedType === 'all' || c.type === selectedType;
        return matchesSearch && matchesType;
    });
    return (<div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
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
            maxWidth: '850px',
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
            <MapPin style={{ color: 'var(--saffron)' }} size={24}/>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                {isHindi ? 'निकटतम सेवा केंद्र एवं सीएससी (Nearest Centers)' : 'Nearest CSC & Service Centers'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isHindi ? 'दस्तावेज जमा और ऑनलाइन फॉर्म भरने हेतु निकटतम कार्यालय खोजें' : 'Locate nearby Common Service Centers, Tehsil & Panchayat Offices'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20}/>
          </button>
        </div>

        {/* Filter Controls */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          
          <div style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }}/>
            <input type="text" placeholder={isHindi ? 'स्थान या केंद्र खोजें...' : 'Search center or location...'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-main)', fontSize: '0.9rem' }}/>
          </div>

          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontWeight: 600,
            fontSize: '0.85rem'
        }}>
            <option value="all">{isHindi ? 'सभी प्रकार (All Types)' : 'All Center Types'}</option>
            <option value="CSC">CSC Digital Seva Kendra</option>
            <option value="Tehsil">Tehsil Office</option>
            <option value="GramPanchayat">Gram Panchayat Bhavan</option>
            <option value="Bank">Post Office / Bank</option>
          </select>

        </div>

        {/* Simulated Map Visualizer Banner */}
        <div style={{
            height: '140px',
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 2 }}>
            <Navigation size={22} style={{ color: 'var(--saffron)' }}/>
            <strong style={{ fontSize: '1rem' }}>
              📍 {isHindi ? 'जीपीएस द्वारा निकटतम 4 केंद्र चिन्हित किए गए' : 'GPS Located 4 Service Centers Nearby'}
            </strong>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem', zIndex: 2 }}>
            {isHindi ? 'निःशुल्क परामर्श एवं फॉर्म भरने हेतु संपर्क करें' : 'Free consultation & form submission help available'}
          </span>
        </div>

        {/* Center List */}
        <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          {filteredCenters.map((center) => (<div key={center.id} style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>
                    {center.type}
                  </span>
                  <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                    {center.distanceKm} km away
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {isHindi ? center.hindiName : center.name}
                </h4>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  📍 {isHindi ? center.hindiAddress : center.address}
                </p>

                <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div>👤 <strong>Contact:</strong> {center.contactPerson}</div>
                  <div>📞 <strong>Phone:</strong> {center.phone}</div>
                  <div>🕒 <strong>Hours:</strong> {center.timings}</div>
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
                <a href={`tel:${center.phone.replace(/\s+/g, '')}`} className="btn btn-sm btn-saffron" style={{ flex: 1, textDecoration: 'none' }}>
                  <Phone size={14}/>
                  <span>Call Center</span>
                </a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(center.address)}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline" style={{ flex: 1, textDecoration: 'none' }}>
                  <Navigation size={14}/>
                  <span>Directions</span>
                </a>
              </div>
            </div>))}
        </div>

        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'right', background: 'var(--bg-subtle)' }}>
          <button className="btn btn-outline" onClick={onClose}>
            {isHindi ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>);
};
