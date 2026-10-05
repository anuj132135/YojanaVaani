import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SpeechService } from '../services/speechService';
import { LLMService } from '../services/llmService';
import { WelfareRuleEngine } from '../services/ruleEngine';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, RotateCcw, Send, Bot, User, ArrowRight } from 'lucide-react';
export const VoiceAssistantHub = ({ language, onVoiceInputParsed, activeProfileName, schemes, currentProfile }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [manualInput, setManualInput] = useState('');
    const [audioFeedback, setAudioFeedback] = useState(true);
    const [isProcessingLLM, setIsProcessingLLM] = useState(false);
    const [accumulatedProfile, setAccumulatedProfile] = useState({});
    // Chat conversation state
    const isHindi = language === 'hi';
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isListening, transcript, isProcessingLLM]);
    // Helper to parse **markdown bold** text into styled rich spans
    const renderFormattedText = (text) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                const boldContent = part.slice(2, -2);
                return (<strong key={index} style={{
                        color: 'var(--saffron-dark)',
                        fontWeight: 800,
                        background: 'rgba(219, 149, 88, 0.12)',
                        padding: '0.1rem 0.35rem',
                        borderRadius: '4px',
                        border: '1px solid rgba(219, 149, 88, 0.25)'
                    }}>
            {boldContent}
          </strong>);
            }
            return part;
        });
    };
    const toggleMic = () => {
        if (isListening) {
            SpeechService.stopListening();
            setIsListening(false);
        }
        else {
            setTranscript('');
            SpeechService.startListening((text, isFinal) => {
                setTranscript(text);
                if (isFinal) {
                    handleSendMessage(text);
                }
            }, (listening) => setIsListening(listening), (err) => {
                console.error(err);
                setIsListening(false);
            }, language);
        }
    };
    const handleSendMessage = async (inputText) => {
        const text = inputText.trim();
        if (!text)
            return;
        // 1. Add User message to chat thread
        const userMsg = {
            id: `user-${Date.now()}`,
            role: 'user',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setTranscript('');
        setManualInput('');
        let responseText = '';
        let quickReplies = [];
        let isLLMPowered = false;
        let updatedProfile = { ...accumulatedProfile };
        let topicIntentInfo = null;
        // 2. Try Gemini LLM API if key is available
        if (LLMService.hasApiKey()) {
            setIsProcessingLLM(true);
            try {
                const llmResult = await LLMService.processWithLLM(text, accumulatedProfile, language, activeProfileName);
                responseText = llmResult.responseText;
                quickReplies = llmResult.quickReplies;
                isLLMPowered = true;
                updatedProfile = {
                    ...accumulatedProfile,
                    ...llmResult.extractedProfile
                };
                if (llmResult.topicIntentLabel || (llmResult.matchedSchemeIds && llmResult.matchedSchemeIds.length > 0)) {
                    topicIntentInfo = {
                        topicLabel: llmResult.topicIntentLabel || '',
                        keywords: llmResult.searchKeywords || [],
                        schemeIds: llmResult.matchedSchemeIds || []
                    };
                }
            }
            catch (err) {
                console.warn('LLM API Error, falling back to Local Hybrid NLP Engine:', err);
            }
            finally {
                setIsProcessingLLM(false);
            }
        }
        // 3. Fallback to Local Hybrid NLP Engine if LLM did not process
        if (!responseText) {
            const newlyParsed = SpeechService.parseVoiceInput(text);
            updatedProfile = {
                ...accumulatedProfile,
                ...newlyParsed
            };
            const fallback = SpeechService.generateConversationalResponse(updatedProfile, text, language, activeProfileName);
            responseText = fallback.text;
            quickReplies = fallback.quickReplies;
        }
        // Extract topic intent info if not set by LLM
        if (!topicIntentInfo || (!topicIntentInfo.topicLabel && topicIntentInfo.schemeIds.length === 0)) {
            topicIntentInfo = SpeechService.extractTopicIntentFromQuery(text, language);
        }
        // Update accumulated state
        setAccumulatedProfile(updatedProfile);
        // Notify parent to re-evaluate eligibility engine and apply dynamic chat query filtering
        onVoiceInputParsed(updatedProfile, text, topicIntentInfo);
        // 4. Run Welfare Rule Engine against all schemes for audio/text input
        const fullProfile = {
            ...currentProfile,
            ...updatedProfile,
            occupation: updatedProfile.occupation || currentProfile.occupation,
            gender: updatedProfile.gender || currentProfile.gender
        };
        const ruleSummaries = schemes.map(s => WelfareRuleEngine.execute(fullProfile, s));
        const eligibleRuleCount = ruleSummaries.filter(s => s.overallStatus === 'eligible').length;
        const partialRuleCount = ruleSummaries.filter(s => s.overallStatus === 'partial').length;
        const allPassedLogs = [];
        const allFailedLogs = [];
        ruleSummaries.forEach(s => {
            s.logs.forEach(l => {
                const ruleName = isHindi ? l.hindiRuleName : l.ruleName;
                if (l.passed && !allPassedLogs.includes(ruleName)) {
                    allPassedLogs.push(ruleName);
                }
                else if (!l.passed && !allFailedLogs.includes(ruleName)) {
                    allFailedLogs.push(ruleName);
                }
            });
        });
        const topEligible = ruleSummaries.find(s => s.overallStatus === 'eligible');
        const ruleEngineSummary = {
            eligibleCount: eligibleRuleCount,
            partialCount: partialRuleCount,
            totalEvaluated: schemes.length,
            topEligibleSchemeName: topEligible ? (isHindi ? topEligible.schemeName : topEligible.schemeName) : undefined,
            passedRuleNames: allPassedLogs.slice(0, 4),
            failedRuleNames: allFailedLogs.slice(0, 2)
        };
        const assistantMsg = {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            text: responseText,
            quickReplies,
            isLLM: isLLMPowered,
            ruleEngineSummary,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMsg]);
        // Speak AI response if audio enabled
        if (audioFeedback) {
            SpeechService.speak(responseText, language);
        }
    };
    const handleQuickReplyClick = (replyText) => {
        handleSendMessage(replyText);
    };
    const clearHistory = () => {
        setMessages([]);
        setAccumulatedProfile({});
        setTranscript('');
        setManualInput('');
        SpeechService.stopSpeaking();
    };
    return (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem', borderTop: '4px solid var(--saffron)', borderRadius: 'var(--radius-lg)' }}>
      
      {/* Top Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #DB9558 0%, #c57f43 100%)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 3px 10px rgba(219, 149, 88, 0.3)'
        }}>
            <Bot size={22}/>
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
              {isHindi ? 'वाणी AI वॉइस एवं टेक्स्ट चैटबॉट' : 'Vaani AI Voice & Text Chatbot'}
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {isHindi ? 'माइक या सर्च इनपुट से बोलें/लिखें • AI द्वारा नियम स्वचालित मूल्यांकित' : 'Speak or type • AI automatically evaluates scheme rules'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`btn btn-sm ${audioFeedback ? 'btn-saffron' : 'btn-outline'}`} onClick={() => {
            setAudioFeedback(!audioFeedback);
            if (audioFeedback)
                SpeechService.stopSpeaking();
        }} title="Toggle voice responses">
            {audioFeedback ? <Volume2 size={16}/> : <VolumeX size={16}/>}
            <span style={{ fontSize: '0.8rem' }}>{audioFeedback ? 'Voice ON' : 'Muted'}</span>
          </motion.button>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-sm btn-outline" onClick={clearHistory} title="Reset conversation">
            <RotateCcw size={14}/>
          </motion.button>
        </div>
      </div>

      {/* Chat Conversation Thread View */}
      <div style={{
            height: '380px',
            overflowY: 'auto',
            padding: '1.15rem',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            border: '1px solid var(--border-color)',
            scrollBehavior: 'smooth'
        }}>
        {messages.length === 0 && (<div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                textAlign: 'center',
                padding: '2rem'
            }}>
            <Bot size={40} style={{ color: 'var(--saffron)', marginBottom: '0.75rem', opacity: 0.8 }}/>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
              {isHindi ? 'अपनी स्थिति बोलें या टाइप करें' : 'Speak or Type Your Situation'}
            </h4>
            <p style={{ fontSize: '0.83rem', opacity: 0.75, maxWidth: '420px', margin: 0 }}>
              {isHindi
                ? 'माइक दबाकर अपनी उम्र, काम या आय बताएं। योजना वाणी आपके लिए पात्र सरकारी योजनाएं ढूंढ निकालेगा।'
                : 'Press the mic button or type your details. YojanaVaani will find eligible welfare schemes for you.'}
            </p>
          </div>)}

        {messages.map((msg) => (<motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '88%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
            {/* Sender Label & Timestamp */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '0.3rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-muted)'
            }}>
              {msg.role === 'assistant' ? (<>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--saffron-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--saffron-dark)'
                }}>
                    <Sparkles size={13}/>
                  </div>
                  <span style={{ color: 'var(--saffron-dark)', fontWeight: 700 }} translate="no" className="notranslate">YojanaVaani AI</span>
                </>) : (<>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{activeProfileName}</span>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)'
                }}>
                    <User size={13}/>
                  </div>
                </>)}
              <span>• {msg.timestamp}</span>
            </div>

            {/* Message Bubble Container */}
            <div style={{
                background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #DB9558 0%, #c57f43 100%)'
                    : 'var(--bg-card)',
                color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                padding: '0.95rem 1.25rem',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                boxShadow: msg.role === 'user'
                    ? '0 4px 14px rgba(219, 149, 88, 0.25)'
                    : '0 4px 14px rgba(0, 0, 0, 0.05)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                borderLeft: msg.role === 'assistant' ? '4px solid var(--saffron)' : undefined
            }}>
              {/* Formatted Text rendering **markdown bold** properly */}
              {renderFormattedText(msg.text)}

            </div>

            {/* Quick Reply Cards / Chips attached to Assistant questions */}
            {msg.quickReplies && msg.quickReplies.length > 0 && (<div style={{ marginTop: '0.65rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {msg.quickReplies.map((reply, rIdx) => (<motion.button key={rIdx} whileHover={{ scale: 1.03, y: -2, boxShadow: '0 4px 12px rgba(219, 149, 88, 0.2)' }} whileTap={{ scale: 0.97 }} onClick={() => handleQuickReplyClick(reply)} style={{
                        background: 'var(--bg-card)',
                        border: '1.5px solid var(--saffron-light)',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.45rem 0.95rem',
                        fontSize: '0.83rem',
                        fontWeight: 600,
                        color: 'var(--saffron-dark)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        boxShadow: '0 2px 8px rgba(219, 149, 88, 0.1)'
                    }}>
                    <Sparkles size={13} style={{ color: 'var(--saffron)' }}/>
                    <span>{reply}</span>
                    <ArrowRight size={13} style={{ opacity: 0.7 }}/>
                  </motion.button>))}
              </div>)}

          </motion.div>))}

        {/* LLM Processing Spinner */}
        {isProcessingLLM && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{
                alignSelf: 'flex-start',
                background: 'var(--bg-card)',
                borderLeft: '4px solid var(--saffron)',
                padding: '0.75rem 1.1rem',
                borderRadius: '16px 16px 16px 4px',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--saffron-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
            <Sparkles size={16} className="animate-spin" style={{ color: 'var(--saffron)' }}/>
            <span>
              ⚡ <span translate="no" className="notranslate">YojanaVaani AI</span> {isHindi ? 'स्थिति का विश्लेषण कर रहा है...' : 'is analyzing your profile details...'}
            </span>
          </motion.div>)}

        {/* Live Microphone Transcript Box */}
        {isListening && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
                alignSelf: 'center',
                background: 'var(--rose-light)',
                color: 'var(--rose)',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 4px 12px rgba(201, 74, 74, 0.15)'
            }}>
            <div className="audio-wave-container" style={{ height: '14px' }}>
              <div className="audio-wave-bar"></div>
              <div className="audio-wave-bar"></div>
              <div className="audio-wave-bar"></div>
            </div>
            <span>{transcript ? `💬 "${transcript}"` : (isHindi ? 'सुन रहा है... बोलिए' : 'Listening... Speak now')}</span>
          </motion.div>)}

        <div ref={chatEndRef}/>
      </div>

      {/* Bottom Interactive Mic & Search Input Bar */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(manualInput); }} style={{
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--bg-card)',
            border: '2px solid var(--saffron)',
            borderRadius: 'var(--radius-md)',
            padding: '0.4rem 0.6rem 0.4rem 0.75rem',
            boxShadow: '0 4px 16px rgba(217, 130, 75, 0.18)'
        }}>
        
        {/* Mic Button */}
        <motion.button type="button" onClick={toggleMic} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} animate={isListening ? { scale: [1, 1.15, 1] } : {}} transition={isListening ? { repeat: Infinity, duration: 1.2 } : { duration: 0.2 }} style={{
            background: isListening ? 'var(--rose)' : 'linear-gradient(135deg, #DB9558 0%, #c57f43 100%)',
            border: 'none',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 3px 10px rgba(219, 149, 88, 0.3)'
        }} title={isListening ? 'Stop Listening' : 'Speak via Microphone'}>
          {isListening ? <MicOff size={20}/> : <Mic size={20}/>}
        </motion.button>

        {/* Text Input */}
        <input type="text" placeholder={isHindi ? 'अपनी स्थिति बोलें या टाइप करें (उदा: 30 साल का किसान, ₹1 लाख आय)...' : 'Speak or type your details (e.g. 30 yr farmer, ₹1 Lakh income)...'} value={manualInput} onChange={(e) => setManualInput(e.target.value)} style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text-main)',
            fontSize: '0.95rem',
            fontWeight: 500,
            padding: '0.35rem'
        }}/>

        {/* Send Button */}
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} type="submit" className="btn btn-saffron" style={{ padding: '0.6rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
          <span>{isHindi ? 'योजना खोजें' : 'Search Schemes'}</span>
          <Send size={15}/>
        </motion.button>

      </form>

    </motion.div>);
};
