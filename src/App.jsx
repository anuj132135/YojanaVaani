import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { INITIAL_SCHEMES } from './data/schemes';
import { evaluateEligibility } from './services/eligibilityEngine';
import { Navbar } from './components/Navbar';
import { VoiceAssistantHub } from './components/VoiceAssistantHub';
import { SchemeCard } from './components/SchemeCard';
import { DocumentChecklistModal } from './components/DocumentChecklistModal';
import { CscLocatorModal } from './components/CscLocatorModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { RuleEngineModal } from './components/RuleEngineModal';
import { LlmSettingsModal } from './components/LlmSettingsModal';
import { Search, CheckCircle2, Award, ChevronLeft, ChevronRight } from 'lucide-react';
const DEFAULT_CITIZEN = {
    id: 'citizen-default',
    name: 'नागरिक',
    age: 30,
    gender: 'male',
    annualIncome: 100000,
    occupation: 'farmer',
    landHoldingHectares: 1,
    hasBplCard: true,
    isStudent: false,
    hasGirlChildUnder10: false,
    isMarried: true,
    category: 'general',
    state: 'Uttar Pradesh',
    disabilityPercentage: 0,
    educationLevel: 'graduate'
};
export const App = () => {
    // Global States
    const [language, setLanguage] = useState('hi');
    const [profile, setProfile] = useState(DEFAULT_CITIZEN);
    const [schemes, setSchemes] = useState(INITIAL_SCHEMES);
    // UI & Mode States
    const [isDark, setIsDark] = useState(false);
    // Admin Auth & Modals
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
    const [activeChecklistResult, setActiveChecklistResult] = useState(null);
    const [showLocator, setShowLocator] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [showRuleEngine, setShowRuleEngine] = useState(false);
    const [showLlmSettings, setShowLlmSettings] = useState(false);
    // Filter & Search & Pagination
    const [activeFilter, setActiveFilter] = useState('eligible');
    const [searchQuery, setSearchQuery] = useState('');
    const [chatTopicIntent, setChatTopicIntent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const schemesHeaderRef = useRef(null);

    // Reset pagination to Page 1 whenever filters or search query change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, searchQuery, chatTopicIntent]);

    // Synchronize Dark Theme attribute to <html>
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }, [isDark]);
    // Handle parsed voice/chat input updating profile & dynamic intent filter
    const handleVoiceInputParsed = (parsedData, rawTranscript, topicIntentInfo) => {
        setProfile(prev => {
            const updated = { ...prev };
            if (parsedData.age !== undefined)
                updated.age = parsedData.age;
            if (parsedData.annualIncome !== undefined)
                updated.annualIncome = parsedData.annualIncome;
            if (parsedData.occupation !== undefined)
                updated.occupation = parsedData.occupation;
            if (parsedData.gender !== undefined)
                updated.gender = parsedData.gender;
            if (parsedData.landHoldingHectares !== undefined)
                updated.landHoldingHectares = parsedData.landHoldingHectares;
            if (parsedData.hasBplCard !== undefined)
                updated.hasBplCard = parsedData.hasBplCard;
            if (parsedData.isStudent !== undefined)
                updated.isStudent = parsedData.isStudent;
            if (parsedData.hasGirlChildUnder10 !== undefined)
                updated.hasGirlChildUnder10 = parsedData.hasGirlChildUnder10;
            return updated;
        });
        if (topicIntentInfo && (topicIntentInfo.topicLabel || (topicIntentInfo.schemeIds && topicIntentInfo.schemeIds.length > 0) || (topicIntentInfo.keywords && topicIntentInfo.keywords.length > 0))) {
            setChatTopicIntent({
                topicLabel: topicIntentInfo.topicLabel || rawTranscript,
                keywords: topicIntentInfo.keywords || [],
                schemeIds: topicIntentInfo.schemeIds || [],
                rawTranscript
            });
        }
        // Trigger subtle confetti celebration
        confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 }
        });
    };
    // Evaluate eligibility for all schemes against current profile
    const evaluatedResults = useMemo(() => {
        return schemes.map(scheme => evaluateEligibility(profile, scheme));
    }, [profile, schemes]);
    // Statistics
    const eligibleCount = evaluatedResults.filter(r => r.status === 'eligible').length;
    const partialCount = evaluatedResults.filter(r => r.status === 'partial').length;
    const isHindi = language === 'hi';
    // Calculate scheme relevance score based on active chat topic intent
    const calculateChatRelevanceScore = (scheme) => {
        if (!chatTopicIntent)
            return 0;
        let score = 0;
        const sId = scheme.id.toLowerCase();
        const sName = scheme.name.toLowerCase();
        const sHindiName = scheme.hindiName.toLowerCase();
        const sDesc = (scheme.hindiDescription + ' ' + scheme.description).toLowerCase();
        const sCategory = scheme.categoryTag.toLowerCase();
        // 1. Direct matched scheme ID from Gemini AI / NLP analysis
        if (chatTopicIntent.schemeIds.some(id => id.toLowerCase() === sId)) {
            score += 100;
        }
        // 2. Keyword relevance match
        chatTopicIntent.keywords.forEach(kw => {
            const lowerKw = kw.toLowerCase();
            if (!lowerKw)
                return;
            if (sHindiName.includes(lowerKw) || sName.includes(lowerKw)) {
                score += 40;
            }
            else if (sDesc.includes(lowerKw) || sCategory.includes(lowerKw)) {
                score += 20;
            }
        });
        // 3. Fallback raw transcript match
        if (score === 0 && chatTopicIntent.rawTranscript) {
            const words = chatTopicIntent.rawTranscript.toLowerCase().split(/\s+/).filter(w => w.length > 2);
            words.forEach(w => {
                if (sHindiName.includes(w) || sName.includes(w) || sDesc.includes(w)) {
                    score += 10;
                }
            });
        }
        return score;
    };
    // Filtered & Ranked Scheme Results according to User Chat Intent
    const filteredResults = useMemo(() => {
        const list = evaluatedResults.filter(res => {
            const s = res.scheme;
            const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.hindiName.includes(searchQuery) ||
                s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.categoryTag.toLowerCase().includes(searchQuery.toLowerCase());
            if (!matchesSearch)
                return false;
            if (activeFilter === 'eligible')
                return res.status === 'eligible';
            if (activeFilter === 'partial')
                return res.status === 'partial';
            if (activeFilter === 'all')
                return true;
            return s.categoryTag === activeFilter;
        });
        if (chatTopicIntent) {
            return [...list].sort((a, b) => {
                const scoreA = calculateChatRelevanceScore(a.scheme);
                const scoreB = calculateChatRelevanceScore(b.scheme);
                if (scoreA !== scoreB) {
                    return scoreB - scoreA;
                }
                const statusWeight = { eligible: 3, partial: 2, ineligible: 1 };
                return statusWeight[b.status] - statusWeight[a.status];
            });
        }
        return list;
    }, [evaluatedResults, searchQuery, activeFilter, chatTopicIntent]);

    // Pagination Calculation (10 results per page)
    const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredResults.length);
    const paginatedResults = useMemo(() => {
        return filteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredResults, startIndex, ITEMS_PER_PAGE]);

    const handleAddCustomScheme = (newScheme) => {
        setSchemes(prev => [newScheme, ...prev]);
    };
    return (<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation Header Bar */}
      <Navbar language={language} onLanguageChange={setLanguage} isDark={isDark} onToggleDark={() => setIsDark(!isDark)} isAdminLoggedIn={isAdminLoggedIn} onOpenAdminLogin={() => setShowAdminLoginModal(true)} onAdminLogout={() => {
            setIsAdminLoggedIn(false);
            setShowAdmin(false);
        }} onOpenAdminCMS={() => setShowAdmin(true)} onOpenLocator={() => setShowLocator(true)}/>

      {/* Hero Welcome Banner */}
      <section className="no-print" style={{
            background: 'linear-gradient(135deg, #DB9558 0%, #c57f43 100%)',
            color: 'white',
            padding: '2.5rem 1.5rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
        <div className="app-container" style={{ padding: 0 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: '850px', position: 'relative', zIndex: 2 }}>

            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              {isHindi
            ? 'सरकारी योजनाओं की जानकारी, अब अपनी भाषा में बोलकर प्राप्त करें'
            : 'Discover Welfare Schemes You Qualify For, Powered by Voice AI'}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} style={{ fontSize: '1.05rem', opacity: 0.9, marginTop: '0.75rem', lineHeight: 1.6, maxWidth: '720px' }}>
              {isHindi
            ? 'माइक दबाएं और अपनी उम्र, काम एवं आय के बारे में बोलें। योजना वाणी आपको तुरंत पात्र योजनाओं, आवश्यक दस्तावेजों एवं आवेदन चरणों की सरल जानकारी देगी।'
            : 'Speak in Hindi or English about your situation. YojanaVaani matches rules across central & state schemes with transparent explainability.'}
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ background: 'var(--emerald)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={18} color="white"/>
                </div>
                <div>
                  <strong style={{ fontSize: '1.2rem' }}>{eligibleCount}</strong>
                  <span style={{ fontSize: '0.8rem', opacity: 0.8, display: 'block' }}>
                    {isHindi ? 'योग्य योजनाएं' : 'Eligible Schemes'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ background: 'var(--saffron)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={18} color="white"/>
                </div>
                <div>
                  <strong style={{ fontSize: '1.2rem' }}>{schemes.length}</strong>
                  <span style={{ fontSize: '0.8rem', opacity: 0.8, display: 'block' }}>
                    {isHindi ? 'योजना नियम डाटाबेस' : 'Active Schemes Engine'}
                  </span>
                </div>
              </div>

            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Main Container */}
      <main className="app-container" style={{ flex: 1, marginTop: '2rem' }}>
        
        {/* Multilingual Voice Assistant Hub with LLM Settings */}
        <VoiceAssistantHub language={language} onVoiceInputParsed={handleVoiceInputParsed} activeProfileName={profile.name} currentProfile={profile} schemes={schemes}/>

        {/* Scheme Listing & Filtering Header */}
        <div ref={schemesHeaderRef} style={{ marginBottom: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                🎯 {isHindi ? 'आपकी योजना पात्रता परिणाम (Scheme Matching Results)' : 'Matching Welfare Schemes'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isHindi ? 'माइक एवं टेक्स्ट इनपुट द्वारा मूल्यांकित योजनाएं' : 'Welfare schemes dynamically evaluated on voice and text input'}
              </p>
            </div>

            {/* Search Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-sm)', width: '100%', maxWidth: '300px' }}>
              <Search size={16} style={{ color: 'var(--text-muted)' }}/>
              <input type="text" placeholder={isHindi ? 'योजना नाम से खोजें...' : 'Filter by scheme name...'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-main)', fontSize: '0.88rem' }}/>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className={`btn btn-sm ${activeFilter === 'eligible' ? 'btn-saffron' : 'btn-outline'}`} onClick={() => setActiveFilter('eligible')}>
              ✓ {isHindi ? `100% योग्य (${eligibleCount})` : `100% Eligible (${eligibleCount})`}
            </motion.button>

            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className={`btn btn-sm ${activeFilter === 'partial' ? 'btn-saffron' : 'btn-outline'}`} onClick={() => setActiveFilter('partial')}>
              ⚡ {isHindi ? `आंशिक पात्र (${partialCount})` : `Partial Match (${partialCount})`}
            </motion.button>

            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className={`btn btn-sm ${activeFilter === 'all' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveFilter('all')}>
              {isHindi ? `सभी योजनाएं (${schemes.length})` : `All Schemes (${schemes.length})`}
            </motion.button>

            <span style={{ color: 'var(--border-color)' }}>|</span>

            {['Agriculture', 'Healthcare', 'Housing', 'Finance & Business', 'Women & Child', 'Social Security', 'Education & Skill', 'Empowerment'].map((cat) => (<motion.button key={cat} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className={`btn btn-sm ${activeFilter === cat ? 'btn-saffron' : 'btn-outline'}`} onClick={() => setActiveFilter(cat)}>
                {cat}
              </motion.button>))}

          </div>

        </div>

        {/* Scheme Cards Grid with 10 items per page */}
        {filteredResults.length === 0 ? (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              {isHindi ? 'कोई योजना परिणाम नहीं मिला।' : 'No scheme results match current filter.'}
            </p>
            <button className="btn btn-sm btn-saffron" style={{ marginTop: '0.75rem' }} onClick={() => { setActiveFilter('all'); setChatTopicIntent(null); }}>
              {isHindi ? 'सभी योजनाएं देखें' : 'View All Schemes'}
            </button>
          </motion.div>) : (<div>
            {paginatedResults.map((result) => (<SchemeCard key={result.schemeId} result={result} language={language} onOpenChecklist={(res) => setActiveChecklistResult(res)} isChatMatched={chatTopicIntent ? calculateChatRelevanceScore(result.scheme) > 0 : false}/>))}

            {/* Pagination Controls Bar */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '2rem',
                padding: '1rem 1.25rem',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {isHindi
                    ? `कुल ${filteredResults.length} योजनाओं में से ${startIndex + 1}–${endIndex} दर्शाई जा रही हैं (पृष्ठ ${currentPage} का ${totalPages})`
                    : `Showing ${startIndex + 1}–${endIndex} of ${filteredResults.length} schemes (Page ${currentPage} of ${totalPages})`}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-sm btn-outline"
                    disabled={currentPage === 1}
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(prev => prev - 1);
                        schemesHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    style={{
                      opacity: currentPage === 1 ? 0.4 : 1,
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <ChevronLeft size={16} />
                    <span>{isHindi ? 'पिछला' : 'Previous'}</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`btn btn-sm ${currentPage === pageNum ? 'btn-saffron' : 'btn-outline'}`}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        schemesHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      style={{
                        minWidth: '36px',
                        fontWeight: currentPage === pageNum ? 700 : 500
                      }}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    className="btn btn-sm btn-outline"
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(prev => prev + 1);
                        schemesHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    style={{
                      opacity: currentPage === totalPages ? 0.4 : 1,
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{isHindi ? 'अगला' : 'Next'}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

          </div>)}

      </main>

      {/* Footer */}
      <footer className="no-print" style={{
            marginTop: '4rem',
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-color)',
            padding: '2rem 1.5rem'
        }}>
        <div className="app-container" style={{ padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
                YojanaVaani (योजना वाणी) • Developed by Anuj Gupta & Khushi Gupta
              </strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Voice-First Multilingual Eligibility Guide for Indian Citizens. Built for Social Innovation & Digital Inclusion.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem' }}>
              <button className="btn btn-sm btn-outline" onClick={() => setShowLocator(true)}>
                📍 CSC Locator
              </button>
              {isAdminLoggedIn ? (<button className="btn btn-sm btn-saffron" onClick={() => setShowAdmin(true)}>
                  ⚙️ Admin CMS
                </button>) : (<button className="btn btn-sm btn-outline" onClick={() => setShowAdminLoginModal(true)}>
                  🔒 Admin Login
                </button>)}
            </div>
          </div>
        </div>
      </footer>

      {/* Modals with AnimatePresence */}
      <AnimatePresence>
        {showAdminLoginModal && (<AdminLoginModal language={language} onLoginSuccess={() => {
                setIsAdminLoggedIn(true);
                setShowAdminLoginModal(false);
                setShowAdmin(true);
            }} onClose={() => setShowAdminLoginModal(false)}/>)}
      </AnimatePresence>

      <AnimatePresence>
        {activeChecklistResult && (<DocumentChecklistModal result={activeChecklistResult} citizen={profile} language={language} onClose={() => setActiveChecklistResult(null)}/>)}
      </AnimatePresence>

      <AnimatePresence>
        {showLocator && (<CscLocatorModal language={language} onClose={() => setShowLocator(false)}/>)}
      </AnimatePresence>

      <AnimatePresence>
        {showAdmin && isAdminLoggedIn && (<AdminCMSModal schemes={schemes} onAddScheme={handleAddCustomScheme} language={language} onClose={() => setShowAdmin(false)}/>)}
      </AnimatePresence>

      <AnimatePresence>
        {showRuleEngine && (<RuleEngineModal schemes={schemes} citizen={profile} language={language} onClose={() => setShowRuleEngine(false)}/>)}
      </AnimatePresence>

      <AnimatePresence>
        {showLlmSettings && (<LlmSettingsModal language={language} onClose={() => setShowLlmSettings(false)} onKeySaved={() => { }}/>)}
      </AnimatePresence>

    </div>);
};
export default App;
