import { GoogleGenerativeAI } from '@google/generative-ai';
export class LLMService {
    static apiKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY
        ? import.meta.env.VITE_GEMINI_API_KEY
        : '';
    static setApiKey(key) {
        this.apiKey = key;
        if (typeof window !== 'undefined') {
            localStorage.setItem('yojanavaani_gemini_api_key', key);
        }
    }
    static getApiKey() {
        if (!this.apiKey && typeof window !== 'undefined') {
            const stored = localStorage.getItem('yojanavaani_gemini_api_key');
            if (stored)
                this.apiKey = stored;
        }
        return this.apiKey;
    }
    static hasApiKey() {
        return Boolean(this.getApiKey().trim());
    }
    /**
     * Process user input with Gemini LLM API
     */
    static async processWithLLM(userInput, accumulatedProfile, lang, profileName) {
        const key = this.getApiKey();
        if (!key) {
            throw new Error('No Gemini API Key provided');
        }
        const genAI = new GoogleGenerativeAI(key);
        // Model fallback candidates
        const modelNames = ['gemini-3.5-flash', 'gemini-3.8-flash', 'gemini-2.5-flash-lite', 'gemini-1.5-flash'];
        const isHindi = lang === 'hi';
        const systemPrompt = `
You are YojanaVaani AI, an empathetic Indian Government Welfare Schemes Eligibility Assistant.
Your goal is to converse in ${isHindi ? 'Hindi' : 'English'} with citizen "${profileName}" to accurately determine their eligibility for Indian welfare schemes.

Available Central/State Schemes List:
- "pm-kisan": PM Kisan Samman Nidhi (Farmers, Agriculture, ₹6,000/yr)
- "ayushman-bharat": Ayushman Bharat PM-JAY (Healthcare, ₹5 Lakh hospital coverage)
- "pm-awas-yojana": PM Awas Yojana (Housing, Makaan, Pucca House)
- "pm-mudra-yojana": PM Mudra Loan (Micro business loan, Entrepreneurs)
- "sukanya-samriddhi": Sukanya Samriddhi Yojana (Girl child education/marriage savings)
- "pm-vishwakarma": PM Vishwakarma (Artisans, Tailor/Silai, Craftsmen, ₹15,000 Toolkit)
- "pm-sym": PM Shram Yogi Maandhan (Unorganized workers pension)
- "nmmss-scholarship": National Means-cum-Merit Scholarship (Students, Scholarship, Chhatravriti)
- "ladli-behna": Ladli Behna Yojana (Financial support for women, ₹1,250/mo)
- "pm-svanidhi": PM SVANidhi (Street vendors, Rehri-patri loan)

Current Known Citizen Profile State:
${JSON.stringify(accumulatedProfile, null, 2)}

User's Latest Spoken or Typed Input:
"${userInput}"

CRITICAL INSTRUCTIONS:
1. Extract any new profile details mentioned (age, annual income, occupation like farmer/artisan/vendor/student, gender, land holding in hectares, BPL ration card status, girl child under 10).
2. Analyze what specific topic/category/domain the user is asking about or interested in (e.g. scholarship, farmer, health, housing, tailor/silai, business loan, pension, women).
3. Identify which scheme IDs from the available list match the user's intent.
4. Output strict JSON format with these exact keys:
{
  "extractedProfile": {
    "age": number or null,
    "annualIncome": number or null,
    "occupation": string or null,
    "gender": "male" | "female" | null,
    "landHoldingHectares": number or null,
    "hasBplCard": boolean or null,
    "hasGirlChildUnder10": boolean or null
  },
  "topicIntentLabel": "short topic description in ${isHindi ? 'Hindi' : 'English'} (e.g. छात्रवृत्ति एवं शिक्षा योजनाएं)",
  "searchKeywords": ["keyword1", "keyword2", "keyword3"],
  "matchedSchemeIds": ["nmmss-scholarship"],
  "responseText": "conversational response in ${isHindi ? 'Hindi' : 'English'}",
  "missingFields": ["age", "annualIncome"],
  "quickReplies": ["reply 1", "reply 2", "reply 3"]
}
`;
        let responseTextRaw = '';
        for (const mName of modelNames) {
            try {
                const model = genAI.getGenerativeModel({ model: mName });
                const res = await model.generateContent(systemPrompt);
                responseTextRaw = res.response.text();
                if (responseTextRaw)
                    break;
            }
            catch (mErr) {
                console.warn(`Model ${mName} attempt failed:`, mErr);
            }
        }
        if (!responseTextRaw) {
            throw new Error('Failed to generate response from all Gemini LLM candidate models');
        }
        // Extract JSON block from response
        const jsonMatch = responseTextRaw.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Failed to parse structured JSON from Gemini LLM response');
        }
        const parsed = JSON.parse(jsonMatch[0]);
        // Clean nulls from extractedProfile
        const cleanExtracted = {};
        if (parsed.extractedProfile) {
            if (typeof parsed.extractedProfile.age === 'number')
                cleanExtracted.age = parsed.extractedProfile.age;
            if (typeof parsed.extractedProfile.annualIncome === 'number')
                cleanExtracted.annualIncome = parsed.extractedProfile.annualIncome;
            if (typeof parsed.extractedProfile.occupation === 'string')
                cleanExtracted.occupation = parsed.extractedProfile.occupation;
            if (parsed.extractedProfile.gender === 'male' || parsed.extractedProfile.gender === 'female')
                cleanExtracted.gender = parsed.extractedProfile.gender;
            if (typeof parsed.extractedProfile.landHoldingHectares === 'number')
                cleanExtracted.landHoldingHectares = parsed.extractedProfile.landHoldingHectares;
            if (typeof parsed.extractedProfile.hasBplCard === 'boolean')
                cleanExtracted.hasBplCard = parsed.extractedProfile.hasBplCard;
            if (typeof parsed.extractedProfile.hasGirlChildUnder10 === 'boolean')
                cleanExtracted.hasGirlChildUnder10 = parsed.extractedProfile.hasGirlChildUnder10;
        }
        return {
            responseText: parsed.responseText || 'आपकी जानकारी संसाधित हो गई है।',
            extractedProfile: cleanExtracted,
            missingFields: parsed.missingFields || [],
            quickReplies: parsed.quickReplies || [],
            isLLMPowered: true,
            topicIntentLabel: typeof parsed.topicIntentLabel === 'string' ? parsed.topicIntentLabel : undefined,
            searchKeywords: Array.isArray(parsed.searchKeywords) ? parsed.searchKeywords : undefined,
            matchedSchemeIds: Array.isArray(parsed.matchedSchemeIds) ? parsed.matchedSchemeIds : undefined
        };
    }
}
