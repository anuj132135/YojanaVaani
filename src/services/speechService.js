export class SpeechService {
    static synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    static recognition = null;
    static isListening = false;
    static speak(text, lang = 'hi', onEnd) {
        if (!this.synth)
            return;
        // Cancel ongoing speech
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        // Select appropriate language tag
        if (lang === 'hi') {
            utterance.lang = 'hi-IN';
        }
        else {
            utterance.lang = 'en-IN';
        }
        utterance.rate = 0.95; // Natural pace for voice clarity
        utterance.pitch = 1.0;
        // Try to find native voice
        const voices = this.synth.getVoices();
        const matchVoice = voices.find(v => v.lang.startsWith(utterance.lang) || v.lang.includes(utterance.lang.substring(0, 2)));
        if (matchVoice) {
            utterance.voice = matchVoice;
        }
        if (onEnd) {
            utterance.onend = onEnd;
            utterance.onerror = onEnd;
        }
        this.synth.speak(utterance);
    }
    static stopSpeaking() {
        if (this.synth) {
            this.synth.cancel();
        }
    }
    static startListening(onResult, onStateChange, onError, lang = 'hi') {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            onError('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
            return;
        }
        if (this.isListening && this.recognition) {
            this.stopListening();
        }
        try {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            if (lang === 'hi') {
                this.recognition.lang = 'hi-IN';
            }
            else {
                this.recognition.lang = 'en-IN';
            }
            this.recognition.onstart = () => {
                this.isListening = true;
                onStateChange(true);
            };
            this.recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                    else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    onResult(finalTranscript, true);
                }
                else if (interimTranscript) {
                    onResult(interimTranscript, false);
                }
            };
            this.recognition.onerror = (event) => {
                console.warn('Speech recognition error:', event.error);
                if (event.error !== 'no-speech') {
                    onError(`Speech recognition error: ${event.error}`);
                }
                this.isListening = false;
                onStateChange(false);
            };
            this.recognition.onend = () => {
                this.isListening = false;
                onStateChange(false);
            };
            this.recognition.start();
        }
        catch (err) {
            onError(`Failed to start speech recognition: ${err.message || err}`);
            this.isListening = false;
            onStateChange(false);
        }
    }
    static stopListening() {
        if (this.recognition) {
            try {
                this.recognition.stop();
            }
            catch (e) {
                // ignore
            }
            this.isListening = false;
        }
    }
    /**
     * Helper function to extract profile attributes from spoken voice or text input
     */
    static parseVoiceInput(text) {
        const lower = text.toLowerCase();
        const result = {};
        // 1. Age extraction (e.g. "30 years old", "30 saal", "30 varsh", "umar 30", "meri umar 28 saal hai")
        const ageMatch = lower.match(/(?:umar|उम्र|age|saal|साल|varsh|वर्ष)?\s*(\d{1,2})\s*(?:years|yr|saal|साल|varsh|वर्ष|umar|उम्र|ki|ka)?/i);
        if (ageMatch) {
            const parsedAge = parseInt(ageMatch[1], 10);
            if (parsedAge >= 10 && parsedAge <= 90) {
                result.age = parsedAge;
            }
        }
        // 2. Income extraction (e.g. "1.5 lakh", "150000", "80000 rupees", "2 lakh", "1.2 लाख")
        const lakhMatch = lower.match(/(\d+(?:\.\d+)?)\s*(lakh|लाख|lacs|lakhs)/i);
        if (lakhMatch) {
            result.annualIncome = Math.round(parseFloat(lakhMatch[1]) * 100000);
        }
        else {
            const thousandMatch = lower.match(/(\d+)\s*(thousand|हजार|hazar)/i);
            if (thousandMatch) {
                result.annualIncome = parseInt(thousandMatch[1], 10) * 1000;
            }
            else {
                const directMoney = lower.match(/(?:aay|income|आय|₹)?\s*(\d{5,7})/);
                if (directMoney) {
                    result.annualIncome = parseInt(directMoney[1], 10);
                }
            }
        }
        // 3. Occupation detection
        if (/kisan|farmer|kheti|खेती|किसान|khet/i.test(lower)) {
            result.occupation = 'farmer';
        }
        else if (/artisan|karigar|darzi|tailor|potter|kumhar|lohar|weaver|कारीगर|दस्तकार|सिलाई/i.test(lower)) {
            result.occupation = 'artisan';
        }
        else if (/vendor|rehri|patri|dukan|shopkeeper|street|रेहड़ी|पटरी|दुकान|स्ट्रीट/i.test(lower)) {
            result.occupation = 'street_vendor';
        }
        else if (/mazdoor|worker|labour|unorganized|मजदूर|मजदूरी/i.test(lower)) {
            result.occupation = 'unorganized_worker';
        }
        else if (/student|padhai|school|college|छात्र|विद्यार्थी|पढ़ाई/i.test(lower)) {
            result.occupation = 'student';
            result.isStudent = true;
        }
        // 4. Gender detection
        if (/female|woman|aurat|mahila|ladki|girl|महिला|अौरत|पुत्री|लड़की/i.test(lower)) {
            result.gender = 'female';
        }
        else if (/male|man|aadmi|purush|ladka|boy|पुरुष|आदमी|लड़का/i.test(lower)) {
            result.gender = 'male';
        }
        // 5. Land holding detection
        const landMatch = lower.match(/(\d+(?:\.\d+)?)\s*(acre|hectare|bigha|हेक्टेयर|एकड़|बीघा)/i);
        if (landMatch) {
            const val = parseFloat(landMatch[1]);
            if (/acre|एकड़/i.test(landMatch[3])) {
                result.landHoldingHectares = Number((val * 0.404686).toFixed(2));
            }
            else if (/bigha|बीघा/i.test(landMatch[3])) {
                result.landHoldingHectares = Number((val * 0.25).toFixed(2));
            }
            else {
                result.landHoldingHectares = val;
            }
        }
        // 6. BPL card detection
        if (/bpl|ration card|राशन कार्ड|बीपीएल/i.test(lower)) {
            result.hasBplCard = true;
        }
        // 7. Girl child detection
        if (/beti|daughter|girl child|putri|बेटी|पुत्री/i.test(lower)) {
            result.hasGirlChildUnder10 = true;
        }
        return result;
    }
    /**
     * Helper function to extract user topic intent, search keywords, and scheme IDs from query
     */
    static extractTopicIntentFromQuery(text, lang = 'hi') {
        const lower = text.toLowerCase();
        const isHindi = lang === 'hi';
        const keywords = [];
        const schemeIds = [];
        let topicLabel = '';
        // 1. Scholarship / Education / Student
        if (/chhatravriti|scholarship|student|school|padhai|college|छात्रवृत्ति|स्कॉलरशिप|छात्र|विद्यार्थी|पढ़ाई|8वीं|9वीं|12वीं/i.test(lower)) {
            topicLabel = isHindi ? 'छात्रवृत्ति एवं शिक्षा योजनाएं' : 'Scholarship & Education Schemes';
            schemeIds.push('nmmss-scholarship');
            keywords.push('छात्रवृत्ति', 'scholarship', 'छात्र', 'शिक्षा', 'विद्यार्थी', 'nmmss');
        }
        // 2. Farmer / Agriculture
        if (/kisan|farmer|kheti|khet|fasal|bima|land|किसान|खेती|कृषि|फसल|जमीन/i.test(lower)) {
            topicLabel = isHindi ? 'किसान एवं कृषि कल्याण योजनाएं' : 'Farmer & Agriculture Schemes';
            schemeIds.push('pm-kisan', 'pm-sym', 'pm-mudra-yojana');
            keywords.push('किसान', 'kisan', 'कृषि', 'खेती', 'फसल');
        }
        // 3. Tailor / Artisan / Vishwakarma / Craftsmen / Silai
        if (/artisan|silai|karigar|darzi|tailor|potter|kumhar|lohar|toolkit|vishwakarma|कारीगर|सिलाई|टूलकिट|दर्जी|बढ़ई|लोहार|विश्वकर्मा/i.test(lower)) {
            topicLabel = isHindi ? 'सिलाई एवं विश्वकर्मा कारीगर योजनाएं' : 'Tailor & Artisan Schemes';
            schemeIds.push('pm-vishwakarma', 'ladli-behna', 'pm-mudra-yojana');
            keywords.push('सिलाई', 'कारीगर', 'विश्वकर्मा', 'टूलकिट', 'दर्जी', 'vishwakarma');
        }
        // 4. Healthcare / Hospital / Treatment
        if (/health|hospital|ilaj|bimari|ayushman|cashless|अस्पताल|इलाज|बीमारी|स्वास्थ्य|आयुष्मान|कैशलेस|डॉक्टर/i.test(lower)) {
            topicLabel = isHindi ? 'स्वास्थ्य एवं मुफ़्त इलाज योजनाएं' : 'Healthcare & Free Hospitalization Schemes';
            schemeIds.push('ayushman-bharat');
            keywords.push('अस्पताल', 'इलाज', 'आयुष्मान', 'स्वास्थ्य', 'health', 'ayushman');
        }
        // 5. Housing / House / Makaan
        if (/awas|makaan|ghar|housing|house|pucca|kutcha|आवास|मकान|घर|छत|पक्का मकान/i.test(lower)) {
            topicLabel = isHindi ? 'आवास एवं मकान निर्माण योजनाएं' : 'Housing & Home Construction Schemes';
            schemeIds.push('pm-awas-yojana');
            keywords.push('मकान', 'घर', 'आवास', 'awas', 'housing');
        }
        // 6. Street Vendor / Business Loan / Mudra / SVANidhi
        if (/vendor|rehri|patri|dukan|loan|business|mudra|svanidhi|रेहड़ी|पटरी|दुकान|लोन|ऋण|व्यापार|मुद्रा|स्वनिधि/i.test(lower)) {
            topicLabel = isHindi ? 'व्यवसाय एवं स्वरोजगार लोन योजनाएं' : 'Business & Vendor Loan Schemes';
            schemeIds.push('pm-svanidhi', 'pm-mudra-yojana');
            keywords.push('रेहड़ी', 'पटरी', 'लोन', 'व्यापार', 'मुद्रा', 'स्वनिधि', 'loan', 'vendor');
        }
        // 7. Women & Girl Child
        if (/mahila|woman|women|aurat|beti|girl|sukanya|ladli|महिला|बेटी|बच्ची|सुकन्या|लाडली/i.test(lower)) {
            topicLabel = isHindi ? 'महिला एवं बालिका कल्याण योजनाएं' : 'Women & Girl Child Schemes';
            schemeIds.push('ladli-behna', 'sukanya-samriddhi', 'pm-vishwakarma');
            keywords.push('महिला', 'बेटी', 'सुकन्या', 'लाडली', 'women', 'girl');
        }
        // 8. Pension / Social Security
        if (/pension|mandhan|old age|60 saal|बुढ़ापा|पेंशन|मानधन|असंगठित/i.test(lower)) {
            topicLabel = isHindi ? 'पेंशन एवं सामाजिक सुरक्षा योजनाएं' : 'Pension & Social Security Schemes';
            schemeIds.push('pm-sym');
            keywords.push('पेंशन', 'मानधन', 'pension', '60');
        }
        if (!topicLabel && schemeIds.length === 0 && keywords.length === 0) {
            return null;
        }
        return { topicLabel, keywords, schemeIds };
    }
    /**
     * Generates intelligent conversational responses and follow-up inquiry prompts for missing attributes
     */
    static generateConversationalResponse(accumulatedProfile, _currentInput, lang, profileName) {
        const isHindi = lang === 'hi';
        const missing = [];
        const quickReplies = [];
        // Evaluate missing key attributes for accurate scheme matching
        const hasOccupation = Boolean(accumulatedProfile.occupation);
        const hasIncome = accumulatedProfile.annualIncome !== undefined && accumulatedProfile.annualIncome > 0;
        const hasAge = accumulatedProfile.age !== undefined && accumulatedProfile.age > 0;
        const hasLand = accumulatedProfile.landHoldingHectares !== undefined;
        if (!hasOccupation)
            missing.push('occupation');
        if (!hasAge)
            missing.push('age');
        if (!hasIncome)
            missing.push('annualIncome');
        if (accumulatedProfile.occupation === 'farmer' && !hasLand)
            missing.push('landHolding');
        let responseText = '';
        // If critical information is missing, ask follow-up questions conversationally!
        if (missing.length > 0) {
            if (missing.includes('age') && missing.includes('annualIncome')) {
                responseText = isHindi
                    ? `नमस्ते ${profileName} जी! मैंने नोट किया। सटीक योजनाएं ढूंढने के लिए कृपया अपनी **उम्र** और **वार्षिक आय** बताएं।`
                    : `Hello ${profileName}! To match schemes accurately, please share your **Age** and **Annual Family Income**.`;
                quickReplies.push(isHindi ? 'मेरी उम्र 28 साल और आय ₹1.2 लाख है' : 'I am 28 years old with ₹1.2 Lakh income', isHindi ? 'उम्र 35 वर्ष, आय ₹80,000 है' : 'Age 35, annual income ₹80,000', isHindi ? 'उम्र 20 वर्ष, आय ₹50,000 है' : 'Age 20, income ₹50,000');
            }
            else if (missing.includes('annualIncome')) {
                responseText = isHindi
                    ? `धन्यवाद ${profileName} जी। आपकी जानकारी (उम्र: ${accumulatedProfile.age || 30} वर्ष) दर्ज हो गई है। कृपया अपनी **वार्षिक आय (Annual Income)** बताएं।`
                    : `Thanks ${profileName}. Recorded your age (${accumulatedProfile.age || 30} yrs). What is your **Annual Family Income**?`;
                quickReplies.push(isHindi ? 'वार्षिक आय ₹1.2 लाख है' : 'Annual income is ₹1.2 Lakhs', isHindi ? 'आय ₹80,000 है (बीपीएल)' : 'Income is ₹80,000 (BPL Card)', isHindi ? 'आय ₹2 लाख प्रति वर्ष है' : 'Income is ₹2 Lakhs per year');
            }
            else if (missing.includes('age')) {
                responseText = isHindi
                    ? `जी ${profileName} जी, आय दर्ज हो गई है। कृपया अपनी **आयु/उम्र (Age)** बताएं ताकि सही योजनाएं मिल सकें।`
                    : `Recorded income details. Please specify your **Age** to match eligible schemes.`;
                quickReplies.push(isHindi ? 'मेरी उम्र 28 साल है' : 'I am 28 years old', isHindi ? 'मेरी उम्र 35 साल है' : 'I am 35 years old', isHindi ? 'मेरी उम्र 19 साल है' : 'I am 19 years old');
            }
            else if (missing.includes('landHolding') && accumulatedProfile.occupation === 'farmer') {
                responseText = isHindi
                    ? `किसान भाइयों के लिए पीएम किसान और फसल बीमा योजनाएं हैं। कृपया बताएं कि आपके पास **कितने हेक्टेयर या एकड़ जमीन** है?`
                    : `Great! For farmers, PM-Kisan & Fasal Bima require land size. How many **hectares or acres of land** do you own?`;
                quickReplies.push(isHindi ? 'मेरे पास 1 हेक्टेयर जमीन है' : 'I have 1 hectare of land', isHindi ? '2 एकड़ जमीन है' : 'I own 2 acres of land', isHindi ? 'भूमिहीन किसान हूँ' : 'Landless farmer');
            }
            else if (missing.includes('occupation')) {
                responseText = isHindi
                    ? `नमस्ते ${profileName} जी! आपका **मुख्य व्यवसाय/काम** क्या है? (जैसे: किसान, सिलाई/कारीगर, रेहड़ी-पटरी, मजदूर या छात्र)`
                    : `Hello ${profileName}! What is your primary **Occupation**? (e.g. Farmer, Artisan, Street Vendor, Labourer, or Student)`;
                quickReplies.push(isHindi ? 'मैं किसान हूँ' : 'I am a Farmer', isHindi ? 'मैं सिलाई कारीगर महिला हूँ' : 'I am an Artisan woman', isHindi ? 'मैं रेहड़ी पटरी दुकानदार हूँ' : 'I am a Street Vendor', isHindi ? 'मैं छात्र हूँ' : 'I am a Student');
            }
        }
        else {
            // Full details available -> Output complete scheme match response!
            if (accumulatedProfile.occupation === 'farmer') {
                responseText = isHindi
                    ? `शानदार ${profileName} जी! आपकी पूरी स्थिति (किसान, उम्र ${accumulatedProfile.age} वर्ष, आय ₹${accumulatedProfile.annualIncome?.toLocaleString('en-IN')}) दर्ज हो गई है। आपके लिए **PM-Kisan (₹6,000/वर्ष)** और **फसल बीमा योजना** 100% उपयुक्त हैं!`
                    : `Awesome ${profileName}! All details recorded (Farmer, ${accumulatedProfile.age} yrs, ₹${accumulatedProfile.annualIncome?.toLocaleString('en-IN')}). You match **PM-Kisan (₹6,000/yr)** and **PM Fasal Bima**!`;
            }
            else if (accumulatedProfile.occupation === 'artisan') {
                responseText = isHindi
                    ? `नमस्ते ${profileName} जी! दस्तकारों के लिए **PM Vishwakarma** योजना में ₹15,000 का टूलकिट वाउचर और ₹3 लाख तक का कम ब्याज ऋण उपलब्ध है। नीचे विवरण देखें!`
                    : `Welcome ${profileName}! For artisans, **PM Vishwakarma** offers a ₹15,000 toolkit voucher and collateral-free loans up to ₹3 Lakhs!`;
            }
            else if (accumulatedProfile.occupation === 'student') {
                responseText = `विद्यार्थियों के लिए **National Means-cum-Merit Scholarship (NMMSS)** में ₹12,000/वर्ष छात्रवृत्ति मिलती है।`;
            }
            else {
                responseText = isHindi
                    ? `आपकी सभी जानकारियां दर्ज कर ली गई हैं। नीचे दी गई सूची में पात्र सरकारी योजनाओं और आवश्यक दस्तावेजों की जांच करें!`
                    : `All details processed successfully. Check below for your 100% matched government schemes and document checklists!`;
            }
        }
        return { text: responseText, missingFields: missing, quickReplies };
    }
}
