export const INITIAL_SCHEMES = [
    // ==========================================
    // AGRICULTURE & FARMER SCHEMES (1-10)
    // ==========================================
    {
        id: 'pm-kisan',
        name: 'PM Kisan Samman Nidhi',
        hindiName: 'पीएम किसान सम्मान निधि',
        categoryTag: 'Agriculture',
        description: 'Financial support of ₹6,000 per year in 3 equal installments to small and marginal farmer families across India.',
        hindiDescription: 'भारत के छोटे और सीमांत किसान परिवारों को ₹6,000 प्रति वर्ष 3 समान किस्तों में प्रत्यक्ष वित्तीय सहायता।',
        benefitSummary: '₹6,000 / year direct bank transfer in 3 installments of ₹2,000 every 4 months.',
        hindiBenefitSummary: '₹6,000 प्रति वर्ष सीधा बैंक खाते में (₹2,000 की 3 किस्तें)।',
        rules: {
            occupations: ['farmer'],
            maxLandHolding: 2.0,
        },
        requiredDocuments: [
            'Aadhaar Card linked with Mobile Number',
            'Land Ownership Record (Khasra / Khatauni)',
            'Active Bank Account Details (Passbook)',
            'State Domicile Certificate'
        ],
        hindiRequiredDocuments: [
            'मोबाइल नंबर से लिंक आधार कार्ड',
            'भूमि स्वामित्व रिकॉर्ड (खसरा / खतौनी)',
            'सक्रिय बैंक खाता विवरण (पासबुक)',
            'राज्य मूल निवास प्रमाण पत्र'
        ],
        applicationSteps: [
            'Visit the PM Kisan portal or nearest CSC Center.',
            'Click on "New Farmer Registration" and enter Aadhaar number.',
            'Upload land revenue details and bank passbook image.',
            'Submit form for verification by Block Revenue Officer.'
        ],
        hindiApplicationSteps: [
            'पीएम किसान पोर्टल या नजदीकी सीएससी केंद्र पर जाएं।',
            '"न्यू फार्मर रजिस्ट्रेशन" पर क्लिक करें और आधार दर्ज करें।',
            'भूमि रिकॉर्ड (खसरा) और बैंक पासबुक कॉपी अपलोड करें।',
            'तहसीलदार/पटवारी सत्यापन के लिए फॉर्म जमा करें।'
        ],
        officialPortal: 'https://pmkisan.gov.in',
        helpline: '155261 / 011-24300606',
        isCentral: true,
        nodalMinistry: 'Ministry of Agriculture and Farmers Welfare'
    },
    {
        id: 'pm-fasal-bima',
        name: 'PM Fasal Bima Yojana (PMFBY)',
        hindiName: 'प्रधानमंत्री फसल बीमा योजना',
        categoryTag: 'Agriculture',
        description: 'Comprehensive crop insurance covering financial losses suffered by farmers due to non-preventable natural risks, drought, pests & hail.',
        hindiDescription: 'प्राकृतिक आपदाओं, सूखा, बाढ़ या कीटों से फसल नुकसान की स्थिति में किसानों को संपूर्ण वित्तीय सुरक्षा और फसल बीमा दावा।',
        benefitSummary: 'Maximum premium 1.5% for Rabi, 2.0% for Kharif crops with 100% loss compensation deposited in bank.',
        hindiBenefitSummary: 'खरीफ के लिए केवल 2% एवं रबी के लिए 1.5% प्रीमियम पर फसल नुकसान का पूरा मुआवजा।',
        rules: {
            occupations: ['farmer'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Land Sowing Certificate (Buaai Praman Patra)',
            'Land Ownership Revenue Document (Khasra)',
            'Bank Account Passbook'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'फसल बुआई प्रमाण पत्र (पटवारी/सरपंच द्वारा जारी)',
            'भूमि रिकॉर्ड (खसरा / खतौनी)',
            'बैंक खाता पासबुक'
        ],
        applicationSteps: [
            'Apply online on National Crop Insurance Portal (pmfby.gov.in) or via bank/CSC.',
            'Fill crop sowing details and land survey numbers.',
            'Pay minimal premium online or at CSC center.',
            'In case of crop damage, intimate within 72 hours via PMFBY app.'
        ],
        hindiApplicationSteps: [
            'पीएम फसल बीमा पोर्टल (pmfby.gov.in) या सीएससी केंद्र पर आवेदन करें।',
            'फसल बुआई विवरण एवं खसरा नंबर दर्ज करें।',
            'नामात्र का प्रीमियम जमा करें और रसीद प्राप्त करें।',
            'फसल क्षति होने पर 72 घंटे के भीतर ऐप पर रिपोर्ट दर्ज कराएं।'
        ],
        officialPortal: 'https://pmfby.gov.in',
        helpline: '1800-180-1551',
        isCentral: true,
        nodalMinistry: 'Ministry of Agriculture and Farmers Welfare'
    },
    {
        id: 'kisan-credit-card',
        name: 'Kisan Credit Card (KCC) Scheme',
        hindiName: 'किसान क्रेडिट कार्ड (KCC) योजना',
        categoryTag: 'Agriculture',
        description: 'Timely credit support to farmers to meet their cultivation and post-harvest expenses at highly subsidized interest rates (4% net).',
        hindiDescription: 'किसान भाइयों को खेती, बीज, खाद व उपकरण खरीदने के लिए 4% रियायती ब्याज दर पर ₹3 लाख तक का क्रेडिट लोन।',
        benefitSummary: 'Short term loan up to ₹3.0 Lakh at 4% effective interest rate with zero processing fee for loans up to ₹1.6 Lakh.',
        hindiBenefitSummary: '₹3.0 लाख तक का सस्ता कृषि ऋण केवल 4% प्रभावकारी ब्याज पर (₹1.6 लाख तक बिना सिक्योरिटी लोन)।',
        rules: {
            occupations: ['farmer'],
            minAge: 18,
            maxAge: 75,
        },
        requiredDocuments: [
            'Aadhaar Card & PAN Card',
            'Land Ownership Certificate (7/12, Khasra)',
            'Passport size photographs',
            'No Dues Certificate from nearby bank branches'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड एवं पैन कार्ड',
            'भूमि खतौनी / खसरा नकल',
            'पासपोर्ट साइज फोटो',
            'नो ड्यूज सर्टिफिकेट (बैंक अनापत्ति प्रमाण पत्र)'
        ],
        applicationSteps: [
            'Download KCC application form from PM-Kisan portal or visit bank branch.',
            'Attach land ownership document and Aadhaar proof.',
            'Submit to Commercial Bank, RRB, or Cooperative Bank.',
            'Receive KCC Smart Card for cash withdrawal and fertilizer purchases.'
        ],
        hindiApplicationSteps: [
            'पीएम-किसान पोर्टल से केसीसी फॉर्म डाउनलोड करें या नजदीकी बैंक शाखा जाएं।',
            'खसरा खतौनी नकल और आधार कार्ड संलग्न करें।',
            'बैंक मैनेजर के पास आवेदन जमा करें।',
            'सत्यापन के बाद केसीसी एटीएम कार्ड प्राप्त करें।'
        ],
        officialPortal: 'https://pmkisan.gov.in/KCC.aspx',
        helpline: '1800-11-5526',
        isCentral: true,
        nodalMinistry: 'Ministry of Agriculture / NABARD'
    },
    {
        id: 'soil-health-card',
        name: 'Soil Health Card Scheme',
        hindiName: 'मृदा स्वास्थ्य कार्ड योजना',
        categoryTag: 'Agriculture',
        description: 'Provides soil nutrient status cards to farmers with customized fertilizer recommendations to improve crop yield and soil quality.',
        hindiDescription: 'खेत की मिट्टी की जांच कर पोषण कार्ड प्रदान करना ताकि सही मात्रा में उर्वरक का प्रयोग कर पैदावार बढ़ाई जा सके।',
        benefitSummary: 'Free soil testing across 12 parameters and customized dose recommendations every 2 years.',
        hindiBenefitSummary: 'हर 2 साल में मिट्टी के 12 घटकों की मुफ़्त प्रयोगशाला जांच एवं खाद प्रयोग परामर्श कार्ड।',
        rules: {
            occupations: ['farmer'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Soil Sample from Farm',
            'Land Khasra Details'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'खेत की मिट्टी का सैंपल',
            'भूमि खसरा विवरण'
        ],
        applicationSteps: [
            'Contact Block Agriculture Officer or District Soil Testing Lab.',
            'Submit soil sample collected from 4-5 spots of your field.',
            'Receive Soil Health Card within 3 weeks with specific crop recommendations.'
        ],
        hindiApplicationSteps: [
            'ब्लॉक कृषि अधिकारी या जिला मृदा परीक्षण प्रयोगशाला से संपर्क करें।',
            'अपने खेत के 4-5 स्थानों से मिट्टी का नमूना जमा करें।',
            '3 सप्ताह के भीतर मृदा स्वास्थ्य कार्ड प्राप्त करें।'
        ],
        officialPortal: 'https://soilhealth.dac.gov.in',
        helpline: '1800-180-1551',
        isCentral: true,
        nodalMinistry: 'Ministry of Agriculture and Farmers Welfare'
    },
    {
        id: 'pm-kusum',
        name: 'PM KUSUM Solar Pump Scheme',
        hindiName: 'पीएम कुसुम सोलर पंप योजना',
        categoryTag: 'Agriculture',
        description: 'Financial subsidy up to 90% for farmers to install solar agriculture water pumps and set up solar power plants on barren land.',
        hindiDescription: 'किसानों को सिंचाई के लिए 90% तक की भारी सब्सिडी पर सोलर पंप और बंजर भूमि पर सौर ऊर्जा संयंत्र स्थापित करने में सहायता।',
        benefitSummary: 'Up to 90% subsidy (60% Govt subsidy + 30% Bank loan) for standalone solar water pumps.',
        hindiBenefitSummary: 'सोलर पंप लगाने पर 60% सरकारी सब्सिडी + 30% बैंक लोन (किसान को केवल 10% देना होगा)।',
        rules: {
            occupations: ['farmer'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Land Revenue Record',
            'Bank Account Passbook',
            'Electricity Bill / Declaration of no electric connection'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'भूमि खसरा नकल',
            'बैंक पासबुक',
            'बिजली बिल या नो-कनेक्शन शपथ पत्र'
        ],
        applicationSteps: [
            'Apply online on State Renewable Energy Department (REDA) portal.',
            'Submit land documents and choice of solar pump capacity (3 HP to 10 HP).',
            'Pay 10% beneficiary share online.',
            'Field inspection and solar pump installation by authorized agency.'
        ],
        hindiApplicationSteps: [
            'राज्य नवीकरणीय ऊर्जा विकास एजेंसी (REDA) पोर्टल पर ऑनलाइन आवेदन करें।',
            'भूमि रिकॉर्ड और सोलर पंप क्षमता (3 HP से 10 HP) चुनें।',
            '10% कृषक अंश राशि जमा करें।',
            'भौतिक सत्यापन के बाद सोलर पंप स्थापित।'
        ],
        officialPortal: 'https://pmkusum.mnre.gov.in',
        helpline: '1800-180-3333',
        isCentral: true,
        nodalMinistry: 'Ministry of New and Renewable Energy'
    },
    {
        id: 'pm-krishi-sinchayee',
        name: 'PM Krishi Sinchayee Yojana (PMKSY - Per Drop More Crop)',
        hindiName: 'प्रधानमंत्री कृषि सिंचाई योजना (ड्रिप/स्प्रिंकलर)',
        categoryTag: 'Agriculture',
        description: 'Financial subsidy for installing micro-irrigation systems (Drip and Sprinkler) to optimize water usage in agriculture.',
        hindiDescription: 'खेतों में ड्रिप (टपक) और स्प्रिंकलर (फव्वारा) सिंचाई प्रणाली लगाने के लिए 45% से 55% तक की सीधी सब्सिडी।',
        benefitSummary: '45% to 55% financial subsidy for drip and sprinkler irrigation equipment installation.',
        hindiBenefitSummary: 'ड्रिप व स्प्रिंकलर सिस्टम पर 55% (छोटे/सीमांत) एवं 45% (सामान्य) सरकारी सब्सिडी।',
        rules: {
            occupations: ['farmer'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Land Ownership Proof (Khasra)',
            'Bank Passbook Details',
            'Quotation from Authorized Micro-Irrigation Company'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'भूमि खसरा / खतौनी प्रमाण',
            'बैंक पासबुक कॉपी',
            'अधिकृत कंपनी का कोटेशन/बिल'
        ],
        applicationSteps: [
            'Apply on State Horticulture / Agriculture Department portal.',
            'Select registered Drip/Sprinkler vendor.',
            'Departmental sanction order issuance.',
            'Post-installation verification and direct subsidy transfer to vendor/farmer.'
        ],
        hindiApplicationSteps: [
            'राज्य उद्यानिकी या कृषि विभाग पोर्टल पर ऑनलाइन फॉर्म भरें।',
            'पंजीकृत कंपनी का चयन करें।',
            'स्वीकृति पत्र प्राप्त होने पर सिस्टम लगवाएं।',
            'भौतिक सत्यापन के बाद सब्सिडी बैंक में।'
        ],
        officialPortal: 'https://pmksy.gov.in',
        helpline: '011-23383624',
        isCentral: true,
        nodalMinistry: 'Ministry of Agriculture / Jal Shakti'
    },
    {
        id: 'pm-matsya-sampada',
        name: 'PM Matsya Sampada Yojana (PMMSY)',
        hindiName: 'प्रधानमंत्री मत्स्य संपदा योजना',
        categoryTag: 'Agriculture',
        description: 'Financial assistance for fish farmers, aquaculture, biofloc pond construction, and fish transport vehicles.',
        hindiDescription: 'मछली पालन, तालाब निर्माण, बायोफ्लोक सिस्टम एवं बायो-मत्स्य वाहनों की खरीद पर 40% से 60% तक की भारी सब्सिडी।',
        benefitSummary: '40% subsidy for General category and 60% subsidy for Women / SC / ST beneficiaries for fisheries infrastructure.',
        hindiBenefitSummary: 'सामान्य श्रेणी को 40% एवं महिला/SC/ST अभ्यर्थियों को 60% वित्तीय अनुदान।',
        rules: {
            occupations: ['farmer', 'self_employed'],
            minAge: 18,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Land Ownership or Lease Agreement for Pond/Waterbody',
            'Bank Account Passbook',
            'Detailed Project Report (DPR)'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'तालाब हेतु भूमि रिकॉर्ड या पट्टा दस्तावेज',
            'बैंक passbook',
            'प्रोजेक्ट रिपोर्ट (DPR)'
        ],
        applicationSteps: [
            'Apply on PMMSY portal (pmmsy.dof.gov.in) or visit District Fisheries Officer.',
            'Submit proposal for pond construction / Biofloc unit / Fish feed mill.',
            'Approval by District Level Committee.',
            'Grant disbursal in installments linked to construction milestones.'
        ],
        hindiApplicationSteps: [
            'मत्स्य विभाग कार्यालय या pmmsy.dof.gov.in पर आवेदन करें।',
            'तालाब/बायोफ्लोक प्रोजेक्ट रिपोर्ट जमा करें।',
            'जिला स्तरीय समिति द्वारा स्वीकृति।',
            'निर्माण प्रगति के आधार पर किस्तों में सब्सिडी बैंक में।'
        ],
        officialPortal: 'https://pmmsy.dof.gov.in',
        helpline: '1800-425-1660',
        isCentral: true,
        nodalMinistry: 'Ministry of Fisheries, Animal Husbandry and Dairying'
    },
    {
        id: 'rashtriya-gokul-mission',
        name: 'Rashtriya Gokul Mission (Dairy & Cattle Development)',
        hindiName: 'राष्ट्रीय गोकुल मिशन (डेयरी विकास योजना)',
        categoryTag: 'Agriculture',
        description: 'Promotes indigenous bovine breed conservation, artificial insemination, and financial support for setting up dairy breed farms.',
        hindiDescription: 'देशी गाय-भैंस नस्ल सुधार, कृत्रिम गर्भाधान और डेयरी फार्म/गोकुल ग्राम स्थापित करने हेतु 50% कैपिटल सब्सिडी (₹50 लाख तक)।',
        benefitSummary: '50% capital subsidy up to ₹50 Lakh for setting up breed multiplier dairy farms with high yielding cows/buffaloes.',
        hindiBenefitSummary: 'डेयरी फार्म व गोवंश संवर्धन इकाई स्थापित करने पर 50% पूंजीगत सब्सिडी (अधिकतम ₹50 लाख)।',
        rules: {
            occupations: ['farmer', 'self_employed'],
            minAge: 18,
        },
        requiredDocuments: [
            'Aadhaar Card & PAN Card',
            'Land Details for Cattle Shed Construction',
            'Bank Loan Approval / Self-Finance Proof',
            'Dairy Farming Training Certificate (if available)'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड एवं पैन कार्ड',
            'डेयरी शेड हेतु भूमि स्वामित्व पत्र',
            'बैंक लोन स्वीकृति पत्र',
            'पशुपालन प्रशिक्षण प्रमाण पत्र'
        ],
        applicationSteps: [
            'Apply online on NLM / Rashtriya Gokul Mission portal (nlm.udyamimitra.in).',
            'Submit Project Proposal for Cattle Breed Multiplier Farm.',
            'Verification by State Animal Husbandry Department.',
            'Subsidy release directly to bank loan account.'
        ],
        hindiApplicationSteps: [
            'nlm.udyamimitra.in पोर्टल पर ऑनलाइन फॉर्म भरें।',
            'डेयरी फार्म प्रोजेक्ट रिपोर्ट अपलोड करें।',
            'पशुपालन अधिकारी द्वारा स्थल निरीक्षण।',
            'बैंक ऋण खाते में सब्सिडी स्थानांतरित।'
        ],
        officialPortal: 'https://dahd.nic.in',
        helpline: '011-23386035',
        isCentral: true,
        nodalMinistry: 'Ministry of Fisheries, Animal Husbandry and Dairying'
    },
    {
        id: 'smam-scheme',
        name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
        hindiName: 'कृषि यंत्रीकरण उप-मिशन (ट्रैक्टर व कृषि उपकरण सब्सिडी)',
        categoryTag: 'Agriculture',
        description: 'Financial subsidy for purchasing tractors, rotavators, power tillers, combines, and establishing Custom Hiring Centres.',
        hindiDescription: 'ट्रैक्टर, रोटावेटर, कल्टीवेटर, रीपर और थ्रेशर जैसी आधुनिक कृषि मशीनरी खरीदने पर 40% से 80% तक सब्सिडी।',
        benefitSummary: '40% to 50% subsidy for individual farmers on machinery; up to 80% for Custom Hiring Centers (CHC).',
        hindiBenefitSummary: 'व्यक्तिगत किसानों को कृषि यंत्रों पर 50% तक तथा कस्टम हायरिंग सेंटर पर 80% तक की भारी छूट।',
        rules: {
            occupations: ['farmer'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Land Revenue Record (Khasra Khatauni)',
            'Bank Account Passbook',
            'Valid Quotation & Invoice from Authorized Machinery Dealer'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'भूमि खसरा नकल',
            'बैंक खाता पासबुक',
            'अधिकृत कृषि यंत्र डीलर का कोटेशन'
        ],
        applicationSteps: [
            'Apply on Direct Benefit Transfer in Agricultural Mechanization portal (agrimachinery.nic.in).',
            'Select required farm machine and upload Aadhaar/land proof.',
            'System auto-generates permit via online lottery / queue.',
            'Purchase machine and receive subsidy directly in bank account.'
        ],
        hindiApplicationSteps: [
            'agrimachinery.nic.in पर पंजीकरण करें।',
            'वांछित कृषि उपकरण (जैसे रोटावेटर/ट्रैक्टर) का चयन करें।',
            'ऑनलाइन ई-लॉटरी या पहले आओ-पहले पाओ के तहत चयन।',
            'उपकरण खरीद की रसीद अपलोड करके सब्सिडी प्राप्त करें।'
        ],
        officialPortal: 'https://agrimachinery.nic.in',
        helpline: '1800-180-1551',
        isCentral: true,
        nodalMinistry: 'Ministry of Agriculture and Farmers Welfare'
    },
    {
        id: 'pkvy-scheme',
        name: 'Paramparagat Krishi Vikas Yojana (PKVY - Organic Farming)',
        hindiName: 'परंपरागत कृषि विकास योजना (जैविक खेती प्रोत्साहन)',
        categoryTag: 'Agriculture',
        description: 'Promotes cluster-based organic farming, PGS certification, organic input financial support, and marketing assistance.',
        hindiDescription: 'रसायन मुक्त जैविक खेती अपनाने के लिए किसानों के समूह को ₹50,000 प्रति हेक्टेयर की वित्तीय सहायता और मुफ़्त प्रमाणन।',
        benefitSummary: '₹50,000 per hectare support over 3 years for organic inputs, PGS certification, and packaging/marketing.',
        hindiBenefitSummary: '3 वर्षों में ₹50,000/हेक्टेयर की सहायता (जैविक खाद, बीज, प्रमाणन एवं पैकेजिंग हेतु)।',
        rules: {
            occupations: ['farmer'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Land Record Proof',
            'Farmer Cluster Group Registration'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'भूमि रिकॉर्ड',
            'किसान समूह/क्लस्टर पंजीकरण'
        ],
        applicationSteps: [
            'Form a cluster of 20 or more farmers (total 50 acre land).',
            'Register cluster with Regional Horticulture / Agriculture Officer.',
            'Participate in organic farming training & receive Jaivik Kheti portal ID.',
            'Receive direct financial benefit in bank for organic inputs.'
        ],
        hindiApplicationSteps: [
            '20 या अधिक किसानों का समूह बनाएं।',
            'कृषि अधिकारी के पास क्लस्टर पंजीकृत कराएं।',
            'जैविक खेती प्रशिक्षण प्राप्त कर JaivikKheti.in पर नाम दर्ज कराएं।',
            'जैविक खाद व बीज हेतु राशि प्राप्त करें।'
        ],
        officialPortal: 'https://jaivikkheti.in',
        helpline: '011-23383624',
        isCentral: true,
        nodalMinistry: 'Ministry of Agriculture and Farmers Welfare'
    },
    // ==========================================
    // HEALTHCARE & MEDICAL SCHEMES (11-17)
    // ==========================================
    {
        id: 'ayushman-bharat',
        name: 'Ayushman Bharat - PM-JAY',
        hindiName: 'आयुष्मान भारत - पीएम जन आरोग्य योजना',
        categoryTag: 'Healthcare',
        description: 'World\'s largest government health scheme providing cashless cover up to ₹5 Lakh per family per year for secondary and tertiary care hospitalization.',
        hindiDescription: 'माध्यमिक और तृतीयक अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5 लाख तक का कैशलेस स्वास्थ्य कवर।',
        benefitSummary: '₹5.0 Lakh / family / year cashless health insurance cover in 27,000+ empanelled hospitals.',
        hindiBenefitSummary: '₹5.0 लाख प्रति परिवार/वर्ष मुफ़्त इलाज 27,000+ अनुबंधित अस्पतालों में।',
        rules: {
            maxIncome: 250000,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Ration Card (PHH / BPL / Antyodaya)',
            'Income Certificate (issued by Tehsildar)',
            'Mobile Number'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'राशन कार्ड (पात्र गृहस्थी / बीपीएल / अंत्योदय)',
            'आय प्रमाण पत्र (तहसीलदार द्वारा जारी)',
            'मोबाइल नंबर'
        ],
        applicationSteps: [
            'Check SECC list or Ration Card eligibility at nearest empanelled hospital.',
            'Present Aadhaar and Ration Card to Ayushman Mitra at hospital desk.',
            'e-KYC verification via OTP or biometric scan.',
            'Instant download of Ayushman Golden Card.'
        ],
        hindiApplicationSteps: [
            'सरकारी या अनुबंधित अस्पताल में आयुष्मान मित्र के पास जाएं।',
            'अपना आधार कार्ड और राशन कार्ड दिखाएं।',
            'ओटीपी या बायोमेट्रिक से ई-केवाईसी सत्यापन कराएं।',
            'तुरंत आयुष्मान गोल्डन कार्ड प्राप्त करें।'
        ],
        officialPortal: 'https://pmjay.gov.in',
        helpline: '14555 / 1800-111-565',
        isCentral: true,
        nodalMinistry: 'Ministry of Health and Family Welfare'
    },
    {
        id: 'jan-aushadhi',
        name: 'PM Bharatiya Janaushadhi Pariyojana (PMBJP)',
        hindiName: 'प्रधानमंत्री भारतीय जनऔषधि परियोजना (सस्ती दवाएं)',
        categoryTag: 'Healthcare',
        description: 'Provides high-quality generic medicines, surgical items, and nutraceuticals at 50% to 90% lower prices than branded medicines.',
        hindiDescription: 'जेनेरिक दवाएं और सर्जिकल सामान बाजार दर से 50% से 90% तक कम कीमत पर Jan Aushadhi केंद्रों पर उपलब्ध।',
        benefitSummary: '50% to 90% savings on 1,900+ high quality generic medicines and 290+ surgical items.',
        hindiBenefitSummary: '1,900+ दवाइयां और सर्जिकल सामान 50% से 90% तक भारी डिस्काउंट पर मुफ़्त पर्ची परामर्श के साथ।',
        rules: {},
        requiredDocuments: [
            'Doctor Prescription / Parikshan Parcha',
            'Aadhaar Card (Optional for extra discounts)'
        ],
        hindiRequiredDocuments: [
            'डॉक्टर का दवा पर्चा',
            'आधार कार्ड (वैकल्पिक)'
        ],
        applicationSteps: [
            'Locate nearest Jan Aushadhi Kendra using PMBJP mobile app.',
            'Show your valid doctor prescription.',
            'Purchase generic medicines at highly discounted prices.'
        ],
        hindiApplicationSteps: [
            'जनऔषधि मोबाइल ऐप से नजदीकी केंद्र खोजें।',
            'डॉक्टर की पर्ची दिखाएं।',
            'सस्ती जेनेरिक दवाएं खरीदें।'
        ],
        officialPortal: 'https://janaushadhi.gov.in',
        helpline: '1800-180-8080',
        isCentral: true,
        nodalMinistry: 'Ministry of Chemicals and Fertilizers'
    },
    {
        id: 'mission-indradhanush',
        name: 'Intensified Mission Indradhanush (EMI 5.0)',
        hindiName: 'मिशन इंद्रधनुष (मुफ़्त संपूर्ण टीकाकरण अभियान)',
        categoryTag: 'Healthcare',
        description: 'Free vaccination drive for pregnant women and children up to 5 years against 12 vaccine-preventable life-threatening diseases.',
        hindiDescription: 'गर्भवती महिलाओं और 5 वर्ष तक के बच्चों को 12 जानलेवा बीमारियों से सुरक्षा हेतु मुफ़्त संपूर्ण टीका।',
        benefitSummary: '100% free immunization against TB, DPT, Polio, Hepatitis B, Measles, Rubella & Rotavirus.',
        hindiBenefitSummary: '100% मुफ़्त टीकाकरण नजदीकी आंगनवाड़ी/स्वास्थ्य केंद्र पर।',
        rules: {
            maxAge: 5,
        },
        requiredDocuments: [
            'Child Birth Registration / Mother and Child Protection (MCP) Card',
            'Parent Aadhaar Card'
        ],
        hindiRequiredDocuments: [
            'मदर एंड चाइल्ड प्रोटेक्शन (MCP) कार्ड / ममता कार्ड',
            'अभिभावक का आधार कार्ड'
        ],
        applicationSteps: [
            'Visit nearest Primary Health Centre (PHC), Anganwadi, or Govt Hospital.',
            'Show MCP Card to ANM / ASHA worker.',
            'Get free vaccination administered according to immunization schedule.'
        ],
        hindiApplicationSteps: [
            'नजदीकी स्वास्थ्य केंद्र या आंगनवाड़ी केंद्र जाएं।',
            'एएनएम या आशा कार्यकर्ता को बच्चा कार्ड दिखाएं।',
            'मुफ़्त टीका लगवाएं।'
        ],
        officialPortal: 'https://nhm.gov.in',
        helpline: '1800-11-0111',
        isCentral: true,
        nodalMinistry: 'Ministry of Health and Family Welfare'
    },
    {
        id: 'janani-suraksha',
        name: 'Janani Suraksha Yojana (JSY)',
        hindiName: 'जननी सुरक्षा योजना (गर्भवती महिला वित्तीय सहायता)',
        categoryTag: 'Healthcare',
        description: 'Direct cash assistance to pregnant women belonging to BPL/SC/ST families to promote institutional delivery in health centers.',
        hindiDescription: 'अस्पताल में सुरक्षित प्रसव कराने पर ग्रामीण महिलाओं को ₹1,400 तथा शहरी महिलाओं को ₹1,000 की सीधी नकद वित्तीय मदद।',
        benefitSummary: '₹1,400 (Rural) or ₹1,000 (Urban) cash assistance transferred directly to bank account upon institutional delivery.',
        hindiBenefitSummary: 'सरकारी अस्पताल में बच्चा होने पर ₹1,400 ग्रामीण / ₹1,000 शहरी सीधे बैंक खाते में।',
        rules: {
            gender: ['female'],
            bplRequired: true,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Mother and Child Protection (MCP) Card',
            'BPL Ration Card / Tehsildar Income Certificate',
            'Aadhaar Linked Bank Account Details'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'MCP (ममता) कार्ड',
            'बीपीएल राशन कार्ड / आय प्रमाण पत्र',
            'बैंक पासबुक'
        ],
        applicationSteps: [
            'Register pregnancy at nearest Anganwadi or Primary Health Center in 1st trimester.',
            'Get delivery done at any government hospital or empanelled private facility.',
            'Hospital Medical Officer issues JSY check / DBT transfer upon discharge.'
        ],
        hindiApplicationSteps: [
            'गर्भावस्था के शुरुआती 3 महीने में आशा कार्यकर्ता के पास पंजीयन कराएं।',
            'सरकारी अस्पताल में प्रसव कराएं।',
            'अस्पताल से डिस्चार्ज के समय नकद राशि/डीबीटी प्राप्त करें।'
        ],
        officialPortal: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309',
        helpline: '104',
        isCentral: true,
        nodalMinistry: 'Ministry of Health and Family Welfare'
    },
    {
        id: 'pm-national-dialysis',
        name: 'Pradhan Mantri National Dialysis Program (PMNDP)',
        hindiName: 'प्रधानमंत्री राष्ट्रीय डायलिसिस कार्यक्रम (मुफ़्त डायलिसिस)',
        categoryTag: 'Healthcare',
        description: 'Provides free hemodialysis services to BPL renal failure patients in District Hospitals across India.',
        hindiDescription: 'गुर्दे (किडनी) की बीमारी से पीड़ित बीपीएल मरीजों को जिला अस्पतालों में मुफ़्त हीमोडायलिसिस और पेरिटोनियल सेवा।',
        benefitSummary: '100% Free dialysis sessions in District Public Health Facilities for BPL patients.',
        hindiBenefitSummary: 'बीपीएल राशन कार्ड धारकों के लिए जिला सरकारी अस्पतालों में 100% मुफ़्त डायलिसिस इलाज।',
        rules: {
            bplRequired: true,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'BPL Ration Card / Ayushman Bharat Card',
            'Nephrologist / Medical Doctor Dialysis Prescription'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'बीपीएल कार्ड / आयुष्मान कार्ड',
            'डॉक्टर की डायलिसिस रिपोर्ट व पर्चा'
        ],
        applicationSteps: [
            'Visit District Hospital Dialysis Unit.',
            'Submit doctor prescription and BPL card proof.',
            'Get registered on PMNDP portal for slot allocation and free treatment.'
        ],
        hindiApplicationSteps: [
            'जिला अस्पताल के डायलिसिस वार्ड में जाएं।',
            'बीपीएल कार्ड और डॉक्टर का पर्चा जमा करें।',
            'मुफ़्त डायलिसिस स्लॉट प्राप्त करें।'
        ],
        officialPortal: 'https://pmndp.mohfw.gov.in',
        helpline: '104 / 1800-11-0111',
        isCentral: true,
        nodalMinistry: 'Ministry of Health and Family Welfare'
    },
    {
        id: 'pm-swasthya-suraksha',
        name: 'PM Swasthya Suraksha Yojana (PMSSY)',
        hindiName: 'प्रधानमंत्री स्वास्थ्य सुरक्षा योजना (एम्स एवं सुपर स्पेशलिटी अस्पताल)',
        categoryTag: 'Healthcare',
        description: 'Establishes new AIIMS institutes and upgrades existing Government Medical Colleges to provide tertiary medical care access in underserved regions.',
        hindiDescription: 'देश के विभिन्न राज्यों में नए एम्स (AIIMS) और सुपर-स्पेशलिटी अस्पताल स्थापित कर गुणवत्तापूर्ण इलाज उपलब्ध कराना।',
        benefitSummary: 'World-class super-specialty surgeries, OPD & IPD treatment at minimal government fixed rates.',
        hindiBenefitSummary: 'एम्स (AIIMS) अस्पतालों में अत्यधिक कम लागत पर कैंसर, हृदय रोग व न्यूरो सर्जरी का इलाज।',
        rules: {},
        requiredDocuments: [
            'Aadhaar Card',
            'Patient Medical History File'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'मरीज की मेडिकल रिपोर्ट फाइल'
        ],
        applicationSteps: [
            'Book online OPD appointment on ORS portal (ors.gov.in) for any AIIMS / PMSSY institute.',
            'Visit hospital OPD desk with Aadhaar.',
            'Consult super-specialty doctor at nominal ₹10 registration fee.'
        ],
        hindiApplicationSteps: [
            'ors.gov.in पर किसी भी एम्स अस्पताल का ऑनलाइन ओपीडी टिकट बुक करें।',
            'नियत समय पर ओपीडी में दिखाएं।',
            'केवल ₹10 पर्ची शुल्क पर विशेषज्ञ परामर्श प्राप्त करें।'
        ],
        officialPortal: 'https://pmssy.mohfw.gov.in',
        helpline: '011-23061210',
        isCentral: true,
        nodalMinistry: 'Ministry of Health and Family Welfare'
    },
    {
        id: 'abdm-digital-health',
        name: 'Ayushman Bharat Digital Mission (ABHA Health ID)',
        hindiName: 'आयुष्मान भारत डिजिटल मिशन (आभा 14-अंकीय डिजिटल हेल्थ कार्ड)',
        categoryTag: 'Healthcare',
        description: 'Creates 14-digit ABHA digital health account number to digitally store and share medical records, lab reports and prescriptions securely across India.',
        hindiDescription: '14 अंकों का डिजिटल आभा (ABHA) हेल्थ कार्ड जिससे डॉक्टर की पर्ची, लैब रिपोर्ट और पुरानी बीमारियों का रिकॉर्ड मोबाइल में सुरक्षित रहे।',
        benefitSummary: 'Free 14-digit digital health ID, instant paperless digital medical records access.',
        hindiBenefitSummary: '100% मुफ़्त 14-अंकीय आभा डिजिटल कार्ड, बिना कागजी फाइल के देश के किसी भी अस्पताल में रिकॉर्ड शेयरिंग।',
        rules: {},
        requiredDocuments: [
            'Aadhaar Card & Aadhaar Linked Mobile Number'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड एवं मोबाइल नंबर'
        ],
        applicationSteps: [
            'Visit abha.abdm.gov.in or download ABHA app.',
            'Enter Aadhaar number & verify OTP.',
            'Create 14-digit ABHA ID number & download ABHA digital card PDF.'
        ],
        hindiApplicationSteps: [
            'abha.abdm.gov.in पर जाएं।',
            'आधार नंबर दर्ज कर ओटीपी सत्यापित करें।',
            '14-अंकीय आभा कार्ड तुरंत डाउनलोड करें।'
        ],
        officialPortal: 'https://abha.abdm.gov.in',
        helpline: '1800-11-4477',
        isCentral: true,
        nodalMinistry: 'National Health Authority (NHA)'
    },
    // ==========================================
    // HOUSING & RURAL INFRASTRUCTURE (18-22)
    // ==========================================
    {
        id: 'pm-awas-yojana',
        name: 'PM Awas Yojana (PMAY-G / PMAY-U)',
        hindiName: 'प्रधानमंत्री आवास योजना',
        categoryTag: 'Housing',
        description: 'Financial assistance to homeless citizens or those living in Kutcha/dilapidated houses to construct a pucca house with basic amenities.',
        hindiDescription: 'बेघर नागरिकों या कच्चे/जर्जर मकानों में रहने वालों को शौचालय और रसोई के साथ पक्का मकान बनाने के लिए वित्तीय सहायता।',
        benefitSummary: '₹1.20 Lakh to ₹1.30 Lakh direct subsidy for rural housing, or up to ₹2.67 Lakh interest subsidy for urban housing.',
        hindiBenefitSummary: 'ग्रामीण में ₹1.20 लाख से ₹1.30 लाख सीधी सहायता, या शहरी में ₹2.67 लाख तक ब्याज सब्सिडी।',
        rules: {
            maxIncome: 300000,
            bplRequired: true,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Job Card / BPL Card / SECC Data Reference',
            'Bank Passbook Linked with Aadhaar',
            'Affidavit confirming no existing Pucca house anywhere in India'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'जॉब कार्ड / बीपीएल कार्ड / एसईसीसी डेटा',
            'आधार से लिंक बैंक पासबुक',
            'शपथ पत्र (कि भारत में कहीं भी पक्का मकान नहीं है)'
        ],
        applicationSteps: [
            'Contact Gram Panchayat Sarpanch/Panchayat Secretary or Urban Local Body.',
            'Fill PMAY application form with Geo-tagged photograph of existing kutcha house.',
            'Verification by Gram Sabha / Municipal Housing Inspection team.',
            'Direct Benefit Transfer in 3 construction milestone installments.'
        ],
        hindiApplicationSteps: [
            'ग्राम पंचायत सचिव/सरपंच या नगर पालिका आवास शाखा से संपर्क करें।',
            'कच्चे मकान की जिओ-टैग फोटो के साथ फॉर्म भरें।',
            'ग्राम सभा या आवास निरीक्षक द्वारा भौतिक सत्यापन।',
            'मकान निर्माण की प्रगति के अनुसार 3 किस्तों में पैसा बैंक में।'
        ],
        officialPortal: 'https://pmaymis.gov.in',
        helpline: '1800-11-6446 / 1800-11-3377',
        isCentral: true,
        nodalMinistry: 'Ministry of Rural Development / MoHUA'
    },
    {
        id: 'jal-jeevan-mission',
        name: 'Jal Jeevan Mission (Har Ghar Jal)',
        hindiName: 'जल जीवन मिशन (हर घर नल से जल)',
        categoryTag: 'Housing',
        description: 'Ensures functional household tap connection (FHTC) providing 55 liters per capita per day of potable water to every rural household.',
        hindiDescription: 'ग्रामीण भारत के प्रत्येक घर तक नल से 55 लीटर प्रति व्यक्ति प्रतिदिन साफ पीने का पानी उपलब्ध कराने का राष्ट्रीय मिशन।',
        benefitSummary: '100% free piped drinking water connection at household doorstep.',
        hindiBenefitSummary: 'घर के दरवाजे तक नि:शुल्क नल कनेक्शन और स्वच्छ पेयजल आपूर्ति।',
        rules: {},
        requiredDocuments: [
            'Aadhaar Card of House Owner',
            'Electricity Bill / Ration Card for House Address Proof'
        ],
        hindiRequiredDocuments: [
            'मकान मालिक का आधार कार्ड',
            'पते का प्रमाण (राशन कार्ड / बिजली बिल)'
        ],
        applicationSteps: [
            'Gram Panchayat Village Water & Sanitation Committee (VWSC) identifies households without tap.',
            'Pipe laying and tap fitting executed by State Water Supply Department.',
            'Zero connection installation fee for rural households.'
        ],
        hindiApplicationSteps: [
            'ग्राम जल एवं स्वच्छता समिति (VWSC) को आवेदन दें।',
            'जल निगम द्वारा पाइपलाइन बिछाकर नल लगाया जाएगा।',
            'कोई नल स्थापना शुल्क देय नहीं है।'
        ],
        officialPortal: 'https://ejalshakti.gov.in/jjmreport/',
        helpline: '1800-11-0031',
        isCentral: true,
        nodalMinistry: 'Ministry of Jal Shakti'
    },
    {
        id: 'swachh-bharat-mission',
        name: 'Swachh Bharat Mission Gramin (Toilet Subsidy)',
        hindiName: 'स्वच्छ भारत मिशन (शौचालय निर्माण ₹12,000 प्रोत्साहन राशि)',
        categoryTag: 'Housing',
        description: 'Financial assistance of ₹12,000 to rural BPL and eligible APL households to construct Individual Household Latrines (IHHL).',
        hindiDescription: 'ग्रामीण परिवारों को घर में पक्का शौचालय बनाने के लिए ₹12,000 की सीधी सहायता राशि प्रोत्साहन स्वरूप प्रदान की जाती है।',
        benefitSummary: '₹12,000 direct bank grant for Individual Household Latrine (IHHL) construction.',
        hindiBenefitSummary: 'शौचालय बनवाने पर ₹12,000 सीधी सहायता राशि बैंक खाते में।',
        rules: {
            bplRequired: true,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Bank Account Passbook',
            'Photograph of Constructed Toilet'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'बैंक पासबुक',
            'निर्मित शौचालय के साथ लाभार्थी की फोटो'
        ],
        applicationSteps: [
            'Apply online on sbm.gov.in or contact Panchayat Secretary.',
            'Fill IHHL application form and upload Aadhaar/bank details.',
            'Construct toilet & upload photo after completion.',
            'Direct Benefit Transfer of ₹12,000 upon physical verification.'
        ],
        hindiApplicationSteps: [
            'sbm.gov.in पर जाएं या ग्राम पंचायत सचिव से फॉर्म प्राप्त करें।',
            'शौचालय का निर्माण कराएं और फोटो खींचकर अपलोड करें।',
            'सत्यापन के बाद ₹12,000 की प्रोत्साहन राशि आपके खाते में।'
        ],
        officialPortal: 'https://sbm.gov.in',
        helpline: '1800-180-0404',
        isCentral: true,
        nodalMinistry: 'Ministry of Jal Shakti (Department of Drinking Water & Sanitation)'
    },
    {
        id: 'pm-gram-sadak',
        name: 'PM Gram Sadak Yojana (PMGSY III)',
        hindiName: 'प्रधानमंत्री ग्राम सड़क योजना',
        categoryTag: 'Housing',
        description: 'All-weather road connectivity to eligible unconnected habitations in rural areas to boost rural economy and mobility.',
        hindiDescription: 'ग्रामीण बस्तियों को बारहमासी पक्की डामर सड़कों द्वारा मुख्य मार्गों व मंडियों से जोड़ना।',
        benefitSummary: '100% central infrastructure support for high-quality asphalt rural roads.',
        hindiBenefitSummary: 'ग्रामीण क्षेत्रों में पक्की ऑल-वेदर रोड कनेक्टिविटी।',
        rules: {},
        requiredDocuments: [
            'Gram Sabha Resolution / Petition'
        ],
        hindiRequiredDocuments: [
            'ग्राम सभा का प्रस्ताव पत्र'
        ],
        applicationSteps: [
            'Submit road demand proposal in Gram Sabha.',
            'Panchayat forwards proposal to District Rural Road Development Agency (DRDA).',
            'Survey, sanction & tender by State PWD / Rural Engineering Department.'
        ],
        hindiApplicationSteps: [
            'ग्राम सभा में सड़क निर्माण का प्रस्ताव पारित कराएं।',
            'जिला ग्रामीण सड़क विकास एजेंसी द्वारा सर्वेक्षण और स्वीकृति।'
        ],
        officialPortal: 'https://omms.nic.in',
        helpline: '011-23388481',
        isCentral: true,
        nodalMinistry: 'Ministry of Rural Development'
    },
    {
        id: 'svamitva-scheme',
        name: 'SVAMITVA Property Card Scheme',
        hindiName: 'स्वामित्व योजना (ग्रामीण आबादी संपत्ति कार्ड)',
        categoryTag: 'Housing',
        description: 'Provides official Property Cards (Abadi Land Ownership Titles) to rural home owners using advanced drone mapping technology.',
        hindiDescription: 'ड्रोन सर्वे द्वारा ग्रामीण आबादी क्षेत्र के मकानों की नाप-जोख कर कानूनी संपत्ति कार्ड (प्रॉपर्टी कार्ड) जारी करना।',
        benefitSummary: 'Official Legal Ownership Card for rural homes, enabling easy bank loans against village house property.',
        hindiBenefitSummary: 'गांव के मकान पर आधिकारिक कानूनी मालिकाना हक कार्ड (जिस पर बैंक से लोन आसानी से मिल सके)।',
        rules: {},
        requiredDocuments: [
            'Aadhaar Card',
            'Mobile Number',
            'Property Chuna Line Marking in Village Drone Survey'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'मोबाइल नंबर',
            'मकान चूना अंकन प्रपत्र'
        ],
        applicationSteps: [
            'Survey of India carries out Drone Flying mapping over village Abadi area.',
            'Revenue officials verify property boundaries with house owners.',
            'Issue of Form 13 & final SVAMITVA Property Title Card download.'
        ],
        hindiApplicationSteps: [
            'गांव में ड्रोन सर्वे के समय अपने मकान का चूना अंकन कराएं।',
            'पटवारी व राजस्व टीम द्वारा सीमा सत्यापन।',
            'तहसील कार्यालय से स्वामित्व संपत्ति कार्ड प्राप्त करें।'
        ],
        officialPortal: 'https://svamitva.nic.in',
        helpline: '011-23753621',
        isCentral: true,
        nodalMinistry: 'Ministry of Panchayati Raj'
    },
    // ==========================================
    // FINANCE & BUSINESS LOAN SCHEMES (23-29)
    // ==========================================
    {
        id: 'pm-mudra-yojana',
        name: 'PM Mudra Yojana (PMMY)',
        hindiName: 'प्रधानमंत्री मुद्रा योजना',
        categoryTag: 'Finance & Business',
        description: 'Collateral-free micro loans up to ₹10 Lakh to micro entrepreneurs, small shopkeepers, artisans, and self-employed individuals.',
        hindiDescription: 'छोटे कारोबारियों, दुकानदारों, कारीगरों और स्वरोजगार के लिए ₹10 लाख तक का बिना गारंटी का माइक्रो लोन।',
        benefitSummary: 'Shishu (up to ₹50k), Kishore (₹50k to ₹5L), and Tarun (₹5L to ₹10L) loan categories with low interest rate.',
        hindiBenefitSummary: 'शिशु (₹50,000 तक), किशोर (₹50,000 से ₹5 लाख), और तरुण (₹5 लाख से ₹10 लाख) ऋण श्रेणी।',
        rules: {
            minAge: 18,
            occupations: ['artisan', 'street_vendor', 'self_employed', 'farmer', 'unorganized_worker'],
        },
        requiredDocuments: [
            'Aadhaar Card & PAN Card',
            'Business Proposal / Project Report',
            'Bank Account Statement for last 6 months',
            'Proof of Business Identity / License / Registration (if applicable)'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड एवं पैन कार्ड',
            'व्यवसाय योजना / प्रोजेक्ट रिपोर्ट',
            'पिछले 6 महीने का बैंक स्टेटमेंट',
            'व्यवसाय का प्रमाण / ट्रेड लाइसेंस / दुकान पंजीकरण'
        ],
        applicationSteps: [
            'Prepare a simple business activity plan and estimated credit requirement.',
            'Visit any public/private bank branch or apply online via JanSamarth portal.',
            'Submit Mudra loan application along with KYC and bank statements.',
            'Loan sanction & Mudra Card issuance for working capital withdrawal.'
        ],
        hindiApplicationSteps: [
            'व्यापार योजना और ऋण आवश्यकता की सूची तैयार करें।',
            'किसी भी बैंक शाखा में जाएं या JanSamarth.in पर ऑनलाइन आवेदन करें।',
            'मुद्रा आवेदन पत्र केवाईसी और बैंक स्टेटमेंट के साथ जमा करें।',
            'बैंक द्वारा स्वीकृति के बाद मुद्रा कार्ड प्राप्त करें।'
        ],
        officialPortal: 'https://www.mudra.org.in',
        helpline: '1800-180-1111',
        isCentral: true,
        nodalMinistry: 'Ministry of Finance'
    },
    {
        id: 'pm-svanidhi',
        name: 'PM SVANidhi (Street Vendor\'s AtmaNirbhar Nidhi)',
        hindiName: 'पीएम स्वनिधि योजना',
        categoryTag: 'Finance & Business',
        description: 'Micro-credit scheme providing working capital loans up to ₹50,000 to street vendors affected by lockdowns or seeking business expansion.',
        hindiDescription: 'रेहड़ी-पटरी और स्ट्रीट वेंडरों को अपना कारोबार बढ़ाने के लिए ₹50,000 तक का बिना गारंटी का डिजिटल ऋण।',
        benefitSummary: 'Collateral-free working capital loan in 3 tranches: ₹10k (1st), ₹20k (2nd), ₹50k (3rd) with 7% interest subsidy and cashback on digital transactions.',
        hindiBenefitSummary: '3 चरणों में ₹10,000, ₹20,000 और ₹50,000 का ऋण, 7% ब्याज सब्सिडी और डिजिटल लेनदेन पर कैशबैक।',
        rules: {
            occupations: ['street_vendor'],
            minAge: 18,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Certificate of Vending (CoV) / Identity Card issued by ULB / Town Vending Committee',
            'Bank Account Passbook',
            'UPI VPA / QR code for digital cashback benefits'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'शहरी स्थानीय निकाय (ULB) द्वारा जारी वेंडिंग प्रमाण पत्र / पहचान पत्र',
            'बैंक खाता पासबुक',
            'डिजिटल भुगतान हेतु यूपीआई क्यूआर कोड'
        ],
        applicationSteps: [
            'Visit PM SVANidhi portal or nearest Lending Institution (Bank / NBFC).',
            'Fill online application with Certificate of Vending or Letter of Recommendation.',
            'Select preferred bank branch.',
            'Sanction within 7 working days and digital loan disbursal.'
        ],
        hindiApplicationSteps: [
            'PMSVANidhi.mohua.gov.in पर या बैंक शाखा में आवेदन करें।',
            'नगर पालिका/वेंडिंग कमेटी द्वारा जारी पहचान पत्र नंबर दर्ज करें।',
            'ऋणदाता बैंक का चयन करें।',
            '7 दिनों के भीतर स्वीकृति और खाते में राशि स्थानांतरित।'
        ],
        officialPortal: 'https://pmsvanidhi.mohua.gov.in',
        helpline: '1800-11-1979',
        isCentral: true,
        nodalMinistry: 'Ministry of Housing and Urban Affairs'
    },
    {
        id: 'stand-up-india',
        name: 'Stand Up India Scheme',
        hindiName: 'स्टैंड अप इंडिया योजना (महिला व SC/ST उद्यमी ऋण)',
        categoryTag: 'Finance & Business',
        description: 'Bank loans between ₹10 Lakh and ₹1 Crore to SC/ST and Women entrepreneurs for setting up greenfield manufacturing, service or trading ventures.',
        hindiDescription: 'अनुसूचित जाति (SC), अनुसूचित जनजाति (ST) और महिला उद्यमियों को नया उद्योग/व्यापार शुरू करने हेतु ₹10 लाख से ₹1 करोड़ तक का बैंक ऋण।',
        benefitSummary: 'Bank loan from ₹10.0 Lakh up to ₹1.0 Crore for SC/ST/Women for new business ventures.',
        hindiBenefitSummary: 'महिला एवं SC/ST उद्यमियों के लिए ₹10 लाख से ₹1 करोड़ तक का आसान बैंक लोन।',
        rules: {
            minAge: 18,
            categories: ['sc', 'st'],
            gender: ['female', 'male'],
        },
        requiredDocuments: [
            'Aadhaar Card & PAN Card',
            'Caste Certificate (SC/ST) if applicable',
            'Project Detailed DPR & Land/Premises Proof',
            'Bank Account Statement & IT Returns for 3 years (if applicable)'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड व पैन कार्ड',
            'जाति प्रमाण पत्र (SC/ST हेतु)',
            'व्यवसाय प्रोजेक्ट डीपीआर एवं दुकान/फैक्ट्री लीज एग्रीमेंट',
            'बैंक स्टेटमेंट'
        ],
        applicationSteps: [
            'Apply online on Stand Up Mitra portal (standupmitra.in).',
            'Select Handholding agency or nearby bank branch.',
            'Submit Project DPR & Business Registration.',
            'Bank credit appraisal & loan disbursal.'
        ],
        hindiApplicationSteps: [
            'standupmitra.in पर पंजीकरण करें।',
            'प्रोजेक्ट रिपोर्ट अपलोड कर बैंक शाखा चुनें।',
            'बैंक अधिकारी से मिलकर लोन दस्तावेज स्वीकृत कराएं।'
        ],
        officialPortal: 'https://www.standupmitra.in',
        helpline: '1800-180-1122',
        isCentral: true,
        nodalMinistry: 'Ministry of Finance (SIDBI)'
    },
    {
        id: 'pmegp-scheme',
        name: 'PM Employment Generation Programme (PMEGP Loan)',
        hindiName: 'प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP 35% सब्सिडी लोन)',
        categoryTag: 'Finance & Business',
        description: 'Credit-linked subsidy scheme offering up to 35% government subsidy for setting up micro-enterprises in manufacturing (up to ₹50L) and service sectors (up to ₹20L).',
        hindiDescription: 'ग्रामीण और शहरी क्षेत्रों में नई दुकान, सर्विस सेंटर या छोटी मैन्युफैक्चरिंग यूनिट लगाने पर 15% से 35% तक की सीधी सरकारी सब्सिडी।',
        benefitSummary: 'Up to 35% Govt Subsidy (Margin Money) on bank loans up to ₹50 Lakh for manufacturing and ₹20 Lakh for service projects.',
        hindiBenefitSummary: '₹50 लाख (मैन्युफैक्चरिंग) और ₹20 लाख (सर्विस) के बिजनेस लोन पर 35% तक सब्सिडी।',
        rules: {
            minAge: 18,
            occupations: ['self_employed', 'unemployed', 'artisan'],
        },
        requiredDocuments: [
            'Aadhaar Card & PAN Card',
            'Educational Certificate (minimum 8th Pass for projects > ₹10L)',
            'Detailed Project Report (DPR)',
            'Caste / Special Category Certificate (if claiming 35% subsidy)'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड एवं पैन कार्ड',
            '8वीं पास अंकसूची (₹10 लाख से अधिक प्रोजेक्ट हेतु)',
            'प्रोजेक्ट रिपोर्ट (DPR)',
            'जाति प्रमाण पत्र (35% सब्सिडी क्लेम हेतु)'
        ],
        applicationSteps: [
            'Apply online on KVIC PMEGP Portal (kviconline.gov.in).',
            'Select Sponsoring Agency (KVIC / KVIB / DIC).',
            'Upload project report & KYC.',
            'District Task Force Committee interview & bank loan sanction.'
        ],
        hindiApplicationSteps: [
            'kviconline.gov.in पर ऑनलाइन आवेदन भरें।',
            'एजेंसी (KVIC / जिला उद्योग केंद्र DIC) का चयन करें।',
            'जिला टास्क फोर्स कमेटी द्वारा इंटरव्यू एवं बैंक द्वारा ऋण स्वीकृति।'
        ],
        officialPortal: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
        helpline: '1800-3000-0034',
        isCentral: true,
        nodalMinistry: 'Ministry of Micro, Small and Medium Enterprises (KVIC)'
    },
    {
        id: 'startup-india-seed',
        name: 'Startup India Seed Fund Scheme (SISFS)',
        hindiName: 'स्टार्टअप इंडिया सीड फंड योजना (₹20 लाख से ₹50 लाख अनुदान)',
        categoryTag: 'Finance & Business',
        description: 'Financial assistance to innovative early-stage startups for proof of concept, prototype development, product trials, and market entry.',
        hindiDescription: 'नए इनोवेटिव स्टार्टअप्स को आइडिया से प्रोटोटाइप और ट्रायल बनाने के लिए ₹20 लाख तक का अनुदान और ₹50 लाख तक का लोन।',
        benefitSummary: 'Up to ₹20.0 Lakh grant for proof of concept/prototype & up to ₹50.0 Lakh debt/convertible debenture via recognized incubators.',
        hindiBenefitSummary: 'इनोवेटिव स्टार्टअप्स को ₹20 लाख मुफ़्त सीड ग्रांट तथा ₹50 लाख तक का सॉफ्ट लोन।',
        rules: {
            minAge: 18,
            occupations: ['self_employed'],
        },
        requiredDocuments: [
            'DPIIT Recognition Certificate',
            'Co-founders Aadhaar & PAN Cards',
            'Business Pitch Deck & Prototype Concept Note',
            'Company Incorporation Certificate (Private Limited / LLP)'
        ],
        hindiRequiredDocuments: [
            'DPIIT स्टार्टअप मान्यता प्रमाण पत्र',
            'संस्थापकों का आधार व पैन कार्ड',
            'स्टार्टअप पिच डेक (प्रोजेक्ट प्रस्तुति)',
            'कंपनी पंजीकरण (Pvt Ltd / LLP)'
        ],
        applicationSteps: [
            'Get DPIIT startup recognition on startupindia.gov.in.',
            'Apply for Seed Fund on SISFS portal.',
            'Select preferred incubators for evaluation.',
            'Incubator committee presentation & fund disbursal.'
        ],
        hindiApplicationSteps: [
            'startupindia.gov.in पर स्टार्टअप के रूप में पंजीकृत हों।',
            'सीड फंड पोर्टल पर ऑनलाइन आवेदन जमा करें।',
            'इंक्यूबेटर प्रेजेंटेशन के बाद फंड प्राप्त करें।'
        ],
        officialPortal: 'https://seedfund.startupindia.gov.in',
        helpline: '1800-115-565',
        isCentral: true,
        nodalMinistry: 'Ministry of Commerce and Industry (DPIIT)'
    },
    {
        id: 'cgtmse-loan',
        name: 'Credit Guarantee Scheme for Micro & Small Enterprises (CGTMSE)',
        hindiName: 'क्रेडिट गारंटी फंड योजना (CGTMSE - बिना गारंटी ₹5 करोड़ लोन)',
        categoryTag: 'Finance & Business',
        description: 'Enables collateral-free credit up to ₹5 Crore to micro & small enterprises with 75% to 85% credit guarantee coverage provided by Govt.',
        hindiDescription: 'सूक्ष्म एवं छोटे उद्योगों (MSME) को बिना किसी थर्ड पार्टी गारंटी या संपत्ति गिरवी रखे ₹5 करोड़ तक का बैंक बिजनेस लोन।',
        benefitSummary: 'Collateral-free business loan up to ₹5.0 Crore with 75%-85% Govt credit guarantee backing to banks.',
        hindiBenefitSummary: 'बिना कोई जायदाद गिरवी रखे ₹5 करोड़ तक का एमएसएमई बिजनेस बैंक लोन।',
        rules: {
            minAge: 18,
            occupations: ['self_employed', 'artisan'],
        },
        requiredDocuments: [
            'Udyam Registration Certificate',
            'Business Project Report & Balance Sheet',
            'Promoter Aadhaar & PAN Card',
            'GST Registration (if applicable)'
        ],
        hindiRequiredDocuments: [
            'उद्यम रजिस्ट्रेशन प्रमाण पत्र',
            'व्यवसाय बैलेंस शीट व प्रोजेक्ट रिपोर्ट',
            'आधार व पैन कार्ड',
            'जीएसटी नंबर'
        ],
        applicationSteps: [
            'Register business on Udyam portal (udyamregistration.gov.in).',
            'Approach Member Lending Institution (Public/Private Bank).',
            'Request loan sanction under CGTMSE cover.',
            'Bank pays guarantee fee & disburses collateral-free loan.'
        ],
        hindiApplicationSteps: [
            'उद्यम पोर्टल पर मुफ़्त एमएसएमई पंजीयन कराएं।',
            'बैंक में CGTMSE स्कीम के तहत बिना गारंटी लोन आवेदन करें।',
            'बैंक गारंटी शुल्क भरकर ऋण स्वीकृत करेगा।'
        ],
        officialPortal: 'https://www.cgtmse.in',
        helpline: '022-61437800',
        isCentral: true,
        nodalMinistry: 'Ministry of MSME / SIDBI'
    },
    {
        id: 'clcss-msme',
        name: 'Credit Linked Capital Subsidy Scheme (CLCSS for MSME)',
        hindiName: 'क्रेडिट लिंक्ड कैपिटल सब्सिडी (15% मशीनरी सब्सिडी)',
        categoryTag: 'Finance & Business',
        description: 'Provides 15% upfront capital subsidy (up to ₹15 Lakh) to micro and small enterprises for technology upgradation and plant machinery purchase.',
        hindiDescription: 'सूक्ष्म और लघु उद्योगों को आधुनिक मशीनरी व तकनीक अपनाने के लिए खरीदे गए बैंक लोन पर 15% (अधिकतम ₹15 लाख) की सीधी सब्सिडी।',
        benefitSummary: '15% upfront capital subsidy up to ₹15.0 Lakh on institutional finance for purchasing modern technology plant & machinery.',
        hindiBenefitSummary: 'कारखाने/फैक्ट्री की आधुनिक मशीनरी खरीदने पर 15% (₹15 लाख तक) की सीधी सब्सिडी।',
        rules: {
            occupations: ['self_employed'],
        },
        requiredDocuments: [
            'Udyam Certificate',
            'Machinery Purchase Bank Loan Sanction Letter',
            'Proforma Invoice of Machinery',
            'GST & Environmental NOC (if applicable)'
        ],
        hindiRequiredDocuments: [
            'उद्यम प्रमाण पत्र',
            'मशीनरी लोन स्वीकृति पत्र',
            'मशीनरी का पक्का बिल/कोटेशन',
            'जीएसटी विवरण'
        ],
        applicationSteps: [
            'Apply through Nodal Banks (SIDBI, NABARD, SBI, PNB, etc.).',
            'Submit machinery technology upgrade application online.',
            'Verification by MSME Development Institute.',
            'Subsidy credited directly to bank loan account.'
        ],
        hindiApplicationSteps: [
            'नोडल बैंक (जैसे एसबीआई, पीएनबी, सिडबी) के माध्यम से आवेदन करें।',
            'मशीनरी की तकनीकी योग्यता दस्तावेज जमा करें।',
            'सत्यापन के बाद सब्सिडी लोन खाते में समायोजित।'
        ],
        officialPortal: 'https://dashboard.msme.gov.in/clcss/',
        helpline: '1800-180-6763',
        isCentral: true,
        nodalMinistry: 'Ministry of Micro, Small and Medium Enterprises'
    },
    // ==========================================
    // WOMEN & CHILD WELFARE SCHEMES (30-37)
    // ==========================================
    {
        id: 'sukanya-samriddhi',
        name: 'Sukanya Samriddhi Yojana (SSY)',
        hindiName: 'सुकन्या समृद्धि योजना',
        categoryTag: 'Women & Child',
        description: 'Small deposit savings scheme for girl children offering high guaranteed interest rate (8.2%) and tax benefits to secure higher education and marriage funds.',
        hindiDescription: 'बालिकाओं के भविष्य (शिक्षा और विवाह) को सुरक्षित करने के लिए उच्च ब्याज दर (8.2%) वाली बचत योजना।',
        benefitSummary: '8.2% annual compounded interest rate, 100% Tax-free under Section 80C with partial withdrawal at age 18.',
        hindiBenefitSummary: '8.2% वार्षिक चक्रवृद्धि ब्याज, धारा 80C के तहत कर-मुक्त, 18 वर्ष की आयु पर 50% निकासी सुविधा।',
        rules: {
            gender: ['female'],
            girlChildRequired: true,
        },
        requiredDocuments: [
            'Girl Child\'s Birth Certificate',
            'Parent / Guardian Aadhaar Card & PAN Card',
            'Address Proof (Electricity Bill / Passport / Ration Card)',
            'Passport size photographs of child and guardian'
        ],
        hindiRequiredDocuments: [
            'बालिका का जन्म प्रमाण पत्र',
            'माता/पिता/अभिभावक का आधार कार्ड और पैन कार्ड',
            'पते का प्रमाण (बिजली बिल / राशन कार्ड)',
            'बच्ची और अभिभावक की पासपोर्ट साइज फोटो'
        ],
        applicationSteps: [
            'Visit nearest India Post Office branch or authorized commercial bank.',
            'Fill SSY Account Opening Form (Form 1).',
            'Attach girl child\'s birth certificate and guardian\'s KYC documents.',
            'Deposit initial opening amount (minimum ₹250) and collect passbook.'
        ],
        hindiApplicationSteps: [
            'नजदीकी डाकघर (Post Office) या बैंक शाखा में जाएं।',
            'सुकन्या समृद्धि खाता खोलने का फॉर्म नंबर 1 भरें।',
            'बच्ची का जन्म प्रमाण पत्र और अभिभावक का आधार संलग्न करें।',
            'न्यूनतम ₹250 जमा करके पासबुक प्राप्त करें।'
        ],
        officialPortal: 'https://www.indiapost.gov.in',
        helpline: '1800-266-6868',
        isCentral: true,
        nodalMinistry: 'Ministry of Communications / Finance'
    },
    {
        id: 'ladli-behna',
        name: 'Ladli Behna Yojana',
        hindiName: 'मुख्यमंत्री लाडली बहना योजना',
        categoryTag: 'Women & Child',
        description: 'Direct financial assistance program for women aged 21 to 60 years to promote economic independence and improve health and nutritional status.',
        hindiDescription: '21 से 60 वर्ष की महिलाओं की आर्थिक स्वावलंबन और पोषण सुरक्षा के लिए ₹1,250 प्रतिमाह की सीधी वित्तीय मदद।',
        benefitSummary: '₹1,250 per month directly credited to Aadhaar DBT linked bank account on 10th of every month.',
        hindiBenefitSummary: '₹1,250 प्रतिमाह सीधा बैंक खाते में (हर महीने की 10 तारीख को)।',
        rules: {
            gender: ['female'],
            minAge: 21,
            maxAge: 60,
            maxIncome: 250000,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Samagra ID / Family ID',
            'Active Bank Account linked with Aadhaar & DBT enabled',
            'Mobile Phone for OTP verification'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'समग्र आईडी / परिवार आईडी',
            'डीबीटी (DBT) से लिंक बैंक खाता',
            'सत्यापन हेतु मोबाइल नंबर'
        ],
        applicationSteps: [
            'Gram Panchayat / Ward camp visit during registration drive.',
            'Form submission with Samagra ID and Aadhaar e-KYC.',
            'Verification of DBT link status on bank account.',
            'Final beneficiary list publishing and monthly credit.'
        ],
        hindiApplicationSteps: [
            'ग्राम पंचायत या वार्ड कार्यालय के विशेष शिविर में जाएं।',
            'समग्र आईडी और आधार ई-केवाईसी से फॉर्म भरवाएं।',
            'बैंक खाते में डीबीटी (DBT) सक्रियता की जांच कराएं।',
            'अंतिम सूची में नाम आने पर हर महीने 10 तारीख को राशि।'
        ],
        officialPortal: 'https://cmladlibehna.mp.gov.in',
        helpline: '0755-2700800',
        isCentral: false,
        nodalMinistry: 'Department of Women and Child Development (State)'
    },
    {
        id: 'pm-matru-vandana',
        name: 'PM Matru Vandana Yojana (PMMVY)',
        hindiName: 'प्रधानमंत्री मातृ वंदना योजना (गर्भवती महिला ₹6,000 सहायता)',
        categoryTag: 'Women & Child',
        description: 'Maternity benefit cash incentive of ₹5,000 in 2 installments for 1st child and ₹6,000 for 2nd girl child to pregnant and lactating mothers.',
        hindiDescription: 'गर्भवती और स्तनपान कराने वाली माताओं को पहले बच्चे के प्रसव पर ₹5,000 तथा दूसरी बालिका के जन्म पर ₹6,000 की नकद वित्तीय मदद।',
        benefitSummary: 'Cash incentive of ₹5,000 for 1st pregnancy and ₹6,000 for 2nd girl child transferred via DBT.',
        hindiBenefitSummary: 'पहले बच्चे पर ₹5,000 एवं दूसरी बालिका के जन्म पर ₹6,000 की सीधी सहायता।',
        rules: {
            gender: ['female'],
            minAge: 19,
        },
        requiredDocuments: [
            'Aadhaar Card of Mother and Husband',
            'MCP (Mamtal) Card issued by Anganwadi',
            'Child Birth Certificate',
            'Mother\'s Bank Account Details'
        ],
        hindiRequiredDocuments: [
            'माता और पिता का आधार कार्ड',
            'MCP (ममता) कार्ड',
            'बच्चे का जन्म प्रमाण पत्र',
            'माता का बैंक खाता'
        ],
        applicationSteps: [
            'Register at nearest Anganwadi Centre or apply online on pmmvy.wcd.gov.in.',
            'Submit Form 1-A with MCP card and Aadhaar proof.',
            'Verification by Child Development Project Officer (CDPO).',
            'Direct credit into mother\'s bank account upon immunizations.'
        ],
        hindiApplicationSteps: [
            'आंगनवाड़ी केंद्र में पंजीकरण कराएं या pmmvy.wcd.gov.in पर जाएं।',
            'ममता कार्ड और आधार संलग्न कर फॉर्म भरें।',
            'सत्यापन के बाद राशि तीन किस्तों में बैंक खाते में।'
        ],
        officialPortal: 'https://pmmvy.wcd.gov.in',
        helpline: '1800-11-7000',
        isCentral: true,
        nodalMinistry: 'Ministry of Women and Child Development'
    },
    {
        id: 'poshan-abhiyaan',
        name: 'National Nutrition Mission (Poshan Abhiyaan)',
        hindiName: 'राष्ट्रीय पोषण मिशन (पोषण अभियान - मुफ़्त पोषाहार)',
        categoryTag: 'Women & Child',
        description: 'Comprehensive nutrition support program providing free supplementary nutrition, hot cooked meals and health tracking for children under 6 and mothers.',
        hindiDescription: '6 वर्ष तक के बच्चों, गर्भवती महिलाओं और किशोरावस्था की बालिकाओं को आंगनवाड़ी के माध्यम से मुफ़्त पोषाहार व टेक होम राशन।',
        benefitSummary: 'Free daily hot cooked meal / Take Home Ration (THR) & growth monitoring via Poshan Tracker App.',
        hindiBenefitSummary: 'मुफ़्त पोषाहार, टेक होम राशन एवं स्वास्थ्य विकास निगरानी।',
        rules: {},
        requiredDocuments: [
            'Aadhaar Card of Mother / Child',
            'Anganwadi Enrollment Registration'
        ],
        hindiRequiredDocuments: [
            'माता या बच्चे का आधार कार्ड',
            'आंगनवाड़ी केंद्र पंजीकरण'
        ],
        applicationSteps: [
            'Enroll child or pregnant mother at local Anganwadi Centre.',
            'Receive monthly Take Home Ration (THR) packets & daily meals.',
            'Regular height and weight tracking by ASHA / Anganwadi worker.'
        ],
        hindiApplicationSteps: [
            'स्थानीय आंगनवाड़ी केंद्र में बच्चे या गर्भवती महिला का नाम दर्ज कराएं।',
            'हर महीने टेक होम राशन एवं रोजाना गर्म पोषाहार प्राप्त करें।'
        ],
        officialPortal: 'https://poshantracker.in',
        helpline: '14408',
        isCentral: true,
        nodalMinistry: 'Ministry of Women and Child Development'
    },
    {
        id: 'mission-shakti',
        name: 'Mission Shakti (Sambal & Samarthya for Women Safety)',
        hindiName: 'मिशन शक्ति (महिला सुरक्षा, आश्रय व स्वावलंबन योजना)',
        categoryTag: 'Women & Child',
        description: 'Integrated umbrella scheme providing 24x7 emergency helpline (181), One Stop Crisis Centers (Sakhi), Working Women Hostels & skill training.',
        hindiDescription: 'संकटग्रस्त महिलाओं के लिए 24x7 आपातकालीन हेल्पलाइन (181), वन स्टॉप सखी केंद्र, मुफ़्त कानूनी सहायता एवं अल्पकालिक आश्रय।',
        benefitSummary: 'Free 24x7 emergency rescue, legal aid, medical assistance, psycho-social counseling & temporary shelter.',
        hindiBenefitSummary: '24x7 नि:शुल्क आपातकालीन मदद, सखी केंद्र में मुफ़्त आश्रय, डॉक्टरी व कानूनी सहायता।',
        rules: {
            gender: ['female'],
        },
        requiredDocuments: [
            'Aadhaar Card (Optional for emergency help)'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड (आपातकालीन मदद हेतु अनिवार्य नहीं)'
        ],
        applicationSteps: [
            'Call Women Helpline 181 or visit nearest Sakhi One Stop Centre at District Hospital premises.',
            'Immediate rescue, legal & medical support provided by Govt officers.'
        ],
        hindiApplicationSteps: [
            'महिला हेल्पलाइन 181 पर कॉल करें या जिला अस्पताल परिसर स्थित वन स्टॉप सखी सेंटर जाएं।'
        ],
        officialPortal: 'https://wcd.nic.in/schemes/mission-shakti',
        helpline: '181 / 1091',
        isCentral: true,
        nodalMinistry: 'Ministry of Women and Child Development'
    },
    {
        id: 'beti-bachao-beti-padhao',
        name: 'Beti Bachao Beti Padhao (BBBP)',
        hindiName: 'बेटी बचाओ बेटी पढ़ाओ योजना',
        categoryTag: 'Women & Child',
        description: 'National campaign to address declining Child Sex Ratio (CSR), ensure survival & protection of girl child, and promote higher education for girls.',
        hindiDescription: 'बालिकाओं के जीवन रक्षा, लिंगानुपात सुधार और बालिकाओं की 100% उच्च शिक्षा व स्कूल दाखिला प्रोत्साहन।',
        benefitSummary: 'Free school education, merit incentives, and awareness support for girl child development.',
        hindiBenefitSummary: 'सरकारी स्कूलों में बालिकाओं को मुफ़्त पुस्तकें, यूनिफॉर्म एवं प्रोत्साहन छात्रवृत्ति।',
        rules: {
            gender: ['female'],
        },
        requiredDocuments: [
            'Girl Child Birth Certificate',
            'School Admission Enrollment Proof'
        ],
        hindiRequiredDocuments: [
            'बालिका जन्म प्रमाण पत्र',
            'स्कूल दाखिला रसीद'
        ],
        applicationSteps: [
            'Enroll girl child in local Primary / Secondary School.',
            'Avail educational kits and SSY account linkage via Anganwadi / School.'
        ],
        hindiApplicationSteps: [
            'निकटतम प्राथमिक/माध्यमिक स्कूल में बालिका का नि:शुल्क दाखिला कराएं।'
        ],
        officialPortal: 'https://wcd.nic.in/bbbp-schemes',
        helpline: '1800-11-7000',
        isCentral: true,
        nodalMinistry: 'Ministry of Women and Child Development / MoE'
    },
    {
        id: 'working-women-hostel',
        name: 'Working Women Hostel Scheme (Sakhi Niwas)',
        hindiName: 'वर्किंग विमेन हॉस्टल योजना (सखी निवास मुफ़्त/सस्ता आवास)',
        categoryTag: 'Women & Child',
        description: 'Safe and affordable accommodation with daycare facilities for working women in urban, semi-urban, and rural areas.',
        hindiDescription: 'नौकरीपेशा और कामकाजी महिलाओं को शहरों में सुरक्षित, रियायती दरों पर आवास एवं बच्चों हेतु क्रेच (Daycare) सुविधा।',
        benefitSummary: 'Subsidized safe hostel stay with 24/7 security and daycare center for children of working mothers.',
        hindiBenefitSummary: 'नौकरीपेशा महिलाओं के लिए सुरक्षित व सस्ता छात्रावास एवं बच्चों के लिए डेकेयर।',
        rules: {
            gender: ['female'],
            minAge: 18,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Employment Certificate / Offer Letter / Salary Slip',
            'Passport size photographs'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'रोजगार/नौकरी प्रमाण पत्र या सैलरी स्लिप',
            'पासपोर्ट साइज फोटो'
        ],
        applicationSteps: [
            'Apply directly at Sakhi Niwas / Working Women Hostel manager office.',
            'Submit employment proof and Aadhaar details.',
            'Room allocation upon verification at nominal monthly charges.'
        ],
        hindiApplicationSteps: [
            'सखी निवास / वर्किंग विमेन हॉस्टल अधीक्षक कार्यालय में आवेदन करें।',
            'रोजगार प्रमाण पत्र जमा करें और कमरा प्राप्त करें।'
        ],
        officialPortal: 'https://wcd.nic.in/schemes/working-women-hostel',
        helpline: '011-23381611',
        isCentral: true,
        nodalMinistry: 'Ministry of Women and Child Development'
    },
    {
        id: 'mahila-coir-yojana',
        name: 'Mahila Coir Yojana (Self-Employment for Rural Women)',
        hindiName: 'महिला कॉयर योजना (महिला स्व-रोजगार व स्पिनिंग मशीन)',
        categoryTag: 'Women & Child',
        description: 'Self-employment scheme for rural women artisans in coir processing sectors providing motorized spinning ratts with 75% subsidy.',
        hindiDescription: 'ग्रामीण महिलाओं को नारियल जूट/धागा उद्योग में आत्मनिर्भर बनाने के लिए 75% सब्सिडी पर मोटराइज्ड स्पिनिंग मशीन व ट्रेनिंग।',
        benefitSummary: '75% subsidy on motorized coir spinning equipment and stipend during 2-month skill training.',
        hindiBenefitSummary: 'मोटराइज्ड कॉयर धागा मशीन की खरीद पर 75% सब्सिडी एवं ₹3,000/माह वजीफा।',
        rules: {
            gender: ['female'],
            minAge: 18,
            occupations: ['artisan', 'self_employed'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Bank Passbook Details',
            'Coir Training Certificate (issued by Coir Board)'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'बैंक पासबुक',
            'कॉयर बोर्ड प्रशिक्षण प्रमाण पत्र'
        ],
        applicationSteps: [
            'Apply at Coir Board Regional Sub-Offices.',
            'Complete 2-month skill training course in coir spinning.',
            'Receive 75% subsidized motorized spinning equipment.'
        ],
        hindiApplicationSteps: [
            'कॉयर बोर्ड के क्षेत्रीय कार्यालय में आवेदन जमा करें।',
            '2 महीने की मुफ़्त ट्रेनिंग पूरी करें और 75% छूट पर मशीन प्राप्त करें।'
        ],
        officialPortal: 'http://coirboard.gov.in',
        helpline: '0484-2351807',
        isCentral: true,
        nodalMinistry: 'Ministry of MSME / Coir Board'
    },
    // ==========================================
    // ARTISANS & EMPOWERMENT SCHEMES (38-42)
    // ==========================================
    {
        id: 'pm-vishwakarma',
        name: 'PM Vishwakarma Yojana',
        hindiName: 'पीएम विश्वकर्मा योजना',
        categoryTag: 'Empowerment',
        description: 'Holistic support scheme for 18 traditional artisan and craftsperson trades providing recognition, skill upgrade, toolkit incentives, and low-interest collateral-free loans.',
        hindiDescription: '18 पारंपरिक कारीगरों (बढ़ई, लोहार, कुम्हार, दर्जी आदि) को पहचान पत्र, कौशल प्रशिक्षण, ₹15,000 टूलकिट ग्रांट और कम ब्याज पर ऋण।',
        benefitSummary: '₹15,000 E-Voucher for modern toolkits, ₹500/day stipend during training, and ₹3 Lakh loan at 5% interest in 2 tranches.',
        hindiBenefitSummary: '₹15,000 टूलकिट अनुदान, प्रशिक्षण के दौरान ₹500/दिन वजीफा, एवं ₹3 लाख तक का सस्ता लोन (5% ब्याज)।',
        rules: {
            minAge: 18,
            occupations: ['artisan'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Active Bank Account Details',
            'Mobile Number linked with Aadhaar',
            'Ration Card / Family Member ID'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'सक्रिय बैंक खाता विवरण',
            'आधार से लिंक मोबाइल नंबर',
            'राशन कार्ड / परिवार पहचान पत्र'
        ],
        applicationSteps: [
            'Visit nearest Common Services Centre (CSC) with Aadhaar and bank details.',
            'Bio-metric authentication and trade selection (e.g. Carpenter, Potter, Blacksmith, Tailor).',
            'Three-step verification: Gram Panchayat level, District Implementation Committee, and National Committee.',
            'Issue of PM Vishwakarma Digital Certificate and Skill Training call.'
        ],
        hindiApplicationSteps: [
            'नजदीकी सीएससी केंद्र पर जाएं और बायोमेट्रिक रजिस्ट्रेशन कराएं।',
            'अपने पारंपरिक व्यवसाय (दर्जी, मोची, लोहार, कुम्हार आदि) का चयन करें।',
            'ग्राम पंचायत और जिला समिति द्वारा सत्यापन।',
            'पीएम विश्वकर्मा पहचान पत्र एवं टूलकिट वाउचर प्राप्त करें।'
        ],
        officialPortal: 'https://pmvishwakarma.gov.in',
        helpline: '1800-267-7777 / 17923',
        isCentral: true,
        nodalMinistry: 'Ministry of Micro, Small and Medium Enterprises (MSME)'
    },
    {
        id: 'hunar-haat',
        name: 'Hunar Haat Scheme (Artisan Market Exposure)',
        hindiName: 'हुनर हाट योजना (पारंपरिक दस्तकारों के लिए बाजार मंच)',
        categoryTag: 'Empowerment',
        description: 'Provides market exposure, free stall allocation, logistics & financial support to traditional master artisans, weavers and culinary experts.',
        hindiDescription: 'पारंपरिक दस्तकारों, कारीगरों व शिल्पकारों को देश भर के बड़े शहरों में अपने उत्पादों की मुफ़्त प्रदर्शनी व स्टॉल बिक्री का मौका।',
        benefitSummary: '100% Free exhibition stall, daily stipend & travel allowance for artisans at national Hunar Haats.',
        hindiBenefitSummary: 'मुफ़्त प्रदर्शनी स्टॉल, यात्रा भत्ता एवं दैनिक वजीफा।',
        rules: {
            minAge: 18,
            occupations: ['artisan'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Artisan Identity Card (Pehchan Card issued by Ministry of Textiles)',
            'Bank Account Passbook'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'कारीगर पहचान पत्र (टेक्स्टाइल मंत्रालय द्वारा जारी पहचान पत्र)',
            'बैंक खाता पासबुक'
        ],
        applicationSteps: [
            'Apply online on Hunar Haat portal (hunarhaat.org).',
            'Submit artisan registration details and product photographs.',
            'Selection by screening committee.',
            'Receive official invitation for exhibition stall allocation.'
        ],
        hindiApplicationSteps: [
            'hunarhaat.org पर ऑनलाइन पंजीकरण करें।',
            'अपने हस्तशिल्प/सामान की फोटो अपलोड करें।',
            'चयन होने पर मुफ़्त स्टॉल आवंटन पत्र प्राप्त करें।'
        ],
        officialPortal: 'https://hunarhaat.org',
        helpline: '1800-11-2001',
        isCentral: true,
        nodalMinistry: 'Ministry of Minority Affairs'
    },
    {
        id: 'pm-daksh',
        name: 'PM DAKSH Yojana (Skill Training for Target Groups)',
        hindiName: 'पीएम दक्ष योजना (SC/OBC/सफाई कर्मचारियों के लिए मुफ़्त कौशल प्रशिक्षण)',
        categoryTag: 'Empowerment',
        description: 'Free upskilling, re-skilling, and short-term skill training for SC, OBC, EBC, DNT, and Safai Karamcharis with monthly stipend.',
        hindiDescription: 'अनुसूचित जाति (SC), पिछड़ा वर्ग (OBC) और सफाई कर्मचारियों को नि:शुल्क जॉब-ओरिएंटेड स्किल ट्रेनिंग व ₹1,500/माह वजीफा।',
        benefitSummary: '100% Free skill training, ₹1,000 to ₹1,500 monthly stipend and job placement assistance.',
        hindiBenefitSummary: 'मुफ़्त कौशल प्रशिक्षण, ₹1,500/माह वजीफा एवं रोजगार प्लेसमेंट मदद।',
        rules: {
            minAge: 18,
            maxAge: 45,
            maxIncome: 300000,
            categories: ['sc', 'obc'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Caste Certificate (SC/OBC)',
            'Income Certificate (< ₹3 Lakh)',
            'Bank Account Passbook'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'जाति प्रमाण पत्र (SC/OBC)',
            'आय प्रमाण पत्र (< ₹3 लाख/वर्ष)',
            'बैंक पासबुक'
        ],
        applicationSteps: [
            'Register on PM DAKSH portal (pmdaksh.dosje.gov.in) or mobile app.',
            'Select training sector (e.g. IT, Automotive, Apparel, Healthcare).',
            'Attend training at empanelled institute.',
            'Receive NSDC certificate & stipend upon assessment.'
        ],
        hindiApplicationSteps: [
            'pmdaksh.dosje.gov.in पर नाम दर्ज करें।',
            'पसंदीदा ट्रेनिंग कोर्स (जैसे कंप्यूटर, सिलाई, ऑटोमोबाइल) चुनें।',
            'कोर्स पूरा करके वजीफा व सर्टिफिकेट प्राप्त करें।'
        ],
        officialPortal: 'https://pmdaksh.dosje.gov.in',
        helpline: '1800-11-0396',
        isCentral: true,
        nodalMinistry: 'Ministry of Social Justice and Empowerment'
    },
    {
        id: 'nskfdc-scheme',
        name: 'NSKFDC Rehabilitation Scheme for Safai Karamcharis',
        hindiName: 'सफाई कर्मचारी पुनर्वास योजना (NSKFDC रियायती ऋण)',
        categoryTag: 'Empowerment',
        description: 'Financial assistance, micro-finance loans up to ₹15 Lakh at 4% to 6% interest for Safai Karamcharis and Waste Pickers.',
        hindiDescription: 'सफाई कर्मचारियों, कचरा बीनने वालों और उनके आश्रितों को अपना खुद का व्यापार/वाहन हेतु 4% ब्याज पर ₹15 लाख तक का ऋण।',
        benefitSummary: 'Concessional loans up to ₹15.0 Lakh at 4% to 6% per annum interest with capital subsidy up to ₹3.25 Lakh.',
        hindiBenefitSummary: '4% ब्याज पर ₹15 लाख तक ऋण एवं ₹3.25 लाख तक की कैपिटल सब्सिडी।',
        rules: {
            minAge: 18,
            occupations: ['unorganized_worker', 'self_employed'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Safai Karamchari Certificate issued by Local Municipal Authority',
            'Bank Account Details',
            'Project Cost Quotation'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'नगर पालिका/नगर निगम द्वारा जारी सफाई कर्मचारी प्रमाण पत्र',
            'बैंक पासबुक'
        ],
        applicationSteps: [
            'Apply through State Channelizing Agencies (SCA) or Regional RRB Bank.',
            'Submit Safai Karamchari identity certificate.',
            'Sanction of low interest loan & capital subsidy credit.'
        ],
        hindiApplicationSteps: [
            'राज्य चैनलाइजिंग एजेंसी या बैंक शाखा में आवेदन पत्र जमा करें।',
            'सफाई कर्मचारी पहचान पत्र प्रस्तुत करें व 4% ब्याज दर पर लोन स्वीकृत कराएं।'
        ],
        officialPortal: 'https://nskfdc.nic.in',
        helpline: '1800-11-0123',
        isCentral: true,
        nodalMinistry: 'Ministry of Social Justice and Empowerment'
    },
    {
        id: 'sugamya-bharat',
        name: 'Sugamya Bharat Abhiyan (Assistive Devices for Divyangjan)',
        hindiName: 'सुगम्य भारत अभियान (दिव्यांगजन सहायक उपकरण योजना ADIP)',
        categoryTag: 'Empowerment',
        description: 'Free distribution of modern motorized tricycles, wheelchairs, hearing aids, braille kits & artificial limbs to Persons with Disabilities (PwD).',
        hindiDescription: 'दिव्यांग भाई-बहनों को मोटराइज्ड ट्राईसाइकिल, व्हीलचेयर, कान की मशीन और कृत्रिम अंग 100% मुफ़्त प्रदान करना।',
        benefitSummary: '100% Free motorized tricycle, hearing aids, braille tactile kits & prosthetic aids.',
        hindiBenefitSummary: '100% नि:शुल्क मोटराइज्ड ट्राईसाइकिल, व्हीलचेयर व सुनने की मशीन।',
        rules: {
            minDisability: 40,
            maxIncome: 360000,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Disability Certificate (UDID Card showing >= 40% disability)',
            'Income Certificate (< ₹30,000/month)'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'यूडीआईडी (UDID) दिव्यांगता प्रमाण पत्र (40% या अधिक)',
            'आय प्रमाण पत्र'
        ],
        applicationSteps: [
            'Apply online on ADIP Scheme Portal (adip.alimco.in) or visit District Divyangjan Office.',
            'Submit UDID card and doctor report.',
            'Receive free motorized tricycle / assistive device in ALIMCO camp.'
        ],
        hindiApplicationSteps: [
            'adip.alimco.in पर या जिला दिव्यांगजन पुनर्वास केंद्र में आवेदन करें।',
            'यूडीआईडी कार्ड प्रस्तुत करें।',
            'विशेष शिविर में मुफ़्त मोटराइज्ड ट्राईसाइकिल प्राप्त करें।'
        ],
        officialPortal: 'https://adip.alimco.in',
        helpline: '1800-180-5129',
        isCentral: true,
        nodalMinistry: 'Ministry of Social Justice (DEPwD / ALIMCO)'
    },
    // ==========================================
    // SOCIAL SECURITY & PENSION SCHEMES (43-48)
    // ==========================================
    {
        id: 'pm-sym',
        name: 'PM Shram Yogi Maandhan (PM-SYM)',
        hindiName: 'प्रधानमंत्री श्रम योगी मानधन योजना',
        categoryTag: 'Social Security',
        description: 'Voluntary pension scheme for unorganized sector workers assuring a minimum pension of ₹3,000/month after attaining the age of 60.',
        hindiDescription: 'असंगठित क्षेत्र के श्रमिकों के लिए 60 वर्ष की आयु के बाद ₹3,000 प्रतिमाह की न्यूनतम पेंशन की गारंटी वाली योजना।',
        benefitSummary: 'Guaranteed pension of ₹3,000 per month after 60 years. 50% matching contribution paid by Govt of India.',
        hindiBenefitSummary: '60 वर्ष के बाद ₹3,000/माह निश्चित पेंशन। आपके योगदान के बराबर (50%) राशि केंद्र सरकार देगी।',
        rules: {
            minAge: 18,
            maxAge: 40,
            maxIncome: 180000,
            occupations: ['unorganized_worker', 'street_vendor', 'artisan', 'farmer'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Savings Bank Account Passbook / IFSC Code',
            'e-Shram Card / Registration'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'बचत बैंक खाता पासबुक / आईएफएससी कोड',
            'ई-श्रम कार्ड / पंजीकरण'
        ],
        applicationSteps: [
            'Visit nearest CSC center or self-enroll on Maandhan.in portal.',
            'Enter Aadhaar number and savings bank account details.',
            'System auto-calculates monthly contribution based on age (₹55 to ₹200/month).',
            'Auto-debit authorization and instant e-Pension Card download.'
        ],
        hindiApplicationSteps: [
            'सीएससी सेंटर जाएं या Maandhan.in पर सेल्फ एनरोल करें।',
            'आधार और बैंक खाता विवरण दर्ज करें।',
            'उम्र के हिसाब से मासिक अंशदान (₹55 से ₹200) तय होगा।',
            'ऑटो-डेबिट जनादेश पर हस्ताक्षर करके ई-पेंशन कार्ड डाउनलोड करें।'
        ],
        officialPortal: 'https://maandhan.in',
        helpline: '14434',
        isCentral: true,
        nodalMinistry: 'Ministry of Labour and Employment'
    },
    {
        id: 'atal-pension-yojana',
        name: 'Atal Pension Yojana (APY)',
        hindiName: 'अटल पेंशन योजना (गारंटीकृत मासिक पेंशन)',
        categoryTag: 'Social Security',
        description: 'Government backed pension scheme for citizens in unorganized sector providing fixed pension of ₹1,000 to ₹5,000 per month after age 60.',
        hindiDescription: '18 से 40 वर्ष के नागरिकों के लिए 60 वर्ष की आयु पूरी होने पर ₹1,000 से ₹5,000 प्रतिमाह की गारंटीकृत सरकारी पेंशन।',
        benefitSummary: 'Fixed guaranteed pension option of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month post 60 years.',
        hindiBenefitSummary: '60 वर्ष की उम्र से आजीवन ₹1,000 से ₹5,000/माह निश्चित पेंशन।',
        rules: {
            minAge: 18,
            maxAge: 40,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Active Savings Bank Account with Auto-Debit Setup',
            'Nominee Aadhaar Details'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'बचत बैंक खाता पासबुक',
            'नॉमिनी का आधार विवरण'
        ],
        applicationSteps: [
            'Visit your bank branch or log in to Netbanking / Mobile Banking app.',
            'Fill APY auto-debit registration form & select pension tier (₹1k - ₹5k).',
            'Monthly contribution automatically debited from bank account.'
        ],
        hindiApplicationSteps: [
            'अपनी बैंक शाखा या नेटबैंकिंग में जाएं।',
            'अटल पेंशन योजना फॉर्म भरें और पेंशन राशि (₹1,000 से ₹5,000) चुनें।',
            'हर महीने आपके खाते से अपने आप राशि कटकर जमा होगी।'
        ],
        officialPortal: 'https://www.npscra.nsdl.co.in/scheme-details.php',
        helpline: '1800-110-069',
        isCentral: true,
        nodalMinistry: 'PFRDA / Ministry of Finance'
    },
    {
        id: 'pm-jeevan-jyoti',
        name: 'PM Jeevan Jyoti Bima Yojana (PMJJBY - ₹2 Lakh Life Cover)',
        hindiName: 'प्रधानमंत्री जीवन ज्योति बीमा योजना (₹2 लाख जीवन बीमा)',
        categoryTag: 'Social Security',
        description: 'Government renewable life insurance scheme offering ₹2 Lakh life cover in case of death due to any reason at nominal premium of ₹436/year.',
        hindiDescription: 'किसी भी कारण से मृत्यु की स्थिति में परिवार को ₹2,000,000 (2 लाख रुपये) का जीवन बीमा कवर केवल ₹436 वार्षिक प्रीमियम पर।',
        benefitSummary: '₹2.0 Lakh life insurance coverage for any cause of death at just ₹436 per year (₹1.20/day).',
        hindiBenefitSummary: '₹436 प्रति वर्ष के नामात्र खर्च पर ₹2.0 लाख का संपूर्ण जीवन बीमा।',
        rules: {
            minAge: 18,
            maxAge: 50,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Savings Bank Account Passbook',
            'Nominee KYC details'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'बचत बैंक पासबुक',
            'नॉमिनी (वारिस) का विवरण'
        ],
        applicationSteps: [
            'Enable PMJJBY via Netbanking or submit 1-page form at bank branch.',
            'Authorize annual auto-debit of ₹436 in May every year.',
            'Instant policy enrollment receipt generation.'
        ],
        hindiApplicationSteps: [
            'अपनी बैंक शाखा में जाकर PMJJBY का 1 पेज का फॉर्म भरें।',
            '₹436 वार्षिक ऑटो-डेबिट की अनुमति दें।',
            'बीमा रसीद प्राप्त करें।'
        ],
        officialPortal: 'https://www.jansuraksha.gov.in',
        helpline: '1800-180-1111',
        isCentral: true,
        nodalMinistry: 'Department of Financial Services (MoF)'
    },
    {
        id: 'pm-suraksha-bima',
        name: 'PM Suraksha Bima Yojana (PMSBY - ₹2 Lakh Accident Cover)',
        hindiName: 'प्रधानमंत्री सुरक्षा बीमा योजना (₹2 लाख दुर्घटना बीमा)',
        categoryTag: 'Social Security',
        description: 'Accidental insurance scheme offering ₹2 Lakh cover for accidental death/disability at a low premium of just ₹20 per year.',
        hindiDescription: 'दुर्घटना में मृत्यु या पूर्ण अपंगता पर ₹2 लाख का दुर्घटना बीमा केवल ₹20 प्रति वर्ष के प्रीमियम पर।',
        benefitSummary: '₹2.0 Lakh accidental death / total disability cover at just ₹20 per year.',
        hindiBenefitSummary: 'केवल ₹20 प्रति वर्ष में ₹2.0 लाख का दुर्घटना बीमा कवर।',
        rules: {
            minAge: 18,
            maxAge: 70,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Savings Bank Account with Auto-Debit',
            'Nominee Details'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'बैंक पासबुक',
            'नॉमिनी विवरण'
        ],
        applicationSteps: [
            'Activate PMSBY via Netbanking or at bank branch.',
            'Authorize annual auto-debit of ₹20 from savings bank account.',
            'Instant insurance certificate download.'
        ],
        hindiApplicationSteps: [
            'बैंक शाखा या नेटबैंकिंग द्वारा ₹20 वार्षिक दुर्घटना बीमा चालू कराएं।'
        ],
        officialPortal: 'https://www.jansuraksha.gov.in',
        helpline: '1800-180-1111',
        isCentral: true,
        nodalMinistry: 'Department of Financial Services (MoF)'
    },
    {
        id: 'nsap-old-age',
        name: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
        hindiName: 'इंद्रा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना (वृद्धा पेंशन)',
        categoryTag: 'Social Security',
        description: 'Monthly social security pension for BPL senior citizens aged 60 years and above.',
        hindiDescription: '60 वर्ष से अधिक आयु के गरीबी रेखा (बीपीएल) से नीचे जीवन यापन करने वाले बुजुर्गों को प्रतिमाह वृद्धावस्था पेंशन।',
        benefitSummary: '₹500 to ₹1,000 per month pension credited directly to beneficiary bank account.',
        hindiBenefitSummary: '60 वर्ष से अधिक बीपीएल बुजुर्गों को ₹500 से ₹1,000 प्रतिमाह पेंशन।',
        rules: {
            minAge: 60,
            bplRequired: true,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'BPL Ration Card',
            'Age Proof Certificate',
            'Bank Account Passbook'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'बीपीएल राशन कार्ड',
            'आयु प्रमाण पत्र',
            'बैंक पासबुक'
        ],
        applicationSteps: [
            'Apply online on NSAP portal (nsap.nic.in) or visit Block Development Office (BDO) / Tehsil.',
            'Submit BPL card and age proof.',
            'Verification by Social Welfare Inspector.',
            'Monthly pension credited to bank account.'
        ],
        hindiApplicationSteps: [
            'तहसील या जनपद पंचायत/ब्लॉक कार्यालय में आवेदन करें।',
            'बीपीएल कार्ड व आयु प्रमाण संलग्न करें।',
            'सत्यापन के बाद हर महीने वृद्धावस्था पेंशन बैंक में प्राप्त करें।'
        ],
        officialPortal: 'https://nsap.nic.in',
        helpline: '1800-111-555',
        isCentral: true,
        nodalMinistry: 'Ministry of Rural Development'
    },
    {
        id: 'nsap-disability',
        name: 'Indira Gandhi National Disability Pension Scheme (IGNDPS)',
        hindiName: 'इंद्रा गांधी राष्ट्रीय दिव्यांग पेंशन योजना (दिव्यांगजन पेंशन)',
        categoryTag: 'Social Security',
        description: 'Monthly social security pension to BPL persons with severe multiple or 80%+ permanent disability aged 18 to 79 years.',
        hindiDescription: '18 से 79 वर्ष के बीपीएल श्रेणी के 80% या अधिक गंभीर दिव्यांगजनों को प्रतिमाह वित्तीय पेंशन सहायता।',
        benefitSummary: '₹500 to ₹1,200 per month direct pension assistance for severe disability.',
        hindiBenefitSummary: 'गंभीर दिव्यांगजनों (80%+) को ₹500 से ₹1,200 प्रतिमाह सीधी पेंशन।',
        rules: {
            minAge: 18,
            maxAge: 79,
            minDisability: 80,
            bplRequired: true,
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Disability Certificate / UDID Card (showing >= 80% disability)',
            'BPL Ration Card',
            'Bank Account Details'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'दिव्यांगता प्रमाण पत्र / यूडीआईडी (80% या अधिक)',
            'बीपीएल राशन कार्ड',
            'बैंक खाता विवरण'
        ],
        applicationSteps: [
            'Apply on NSAP portal or submit form at District Social Welfare Department.',
            'Attach UDID certificate and BPL card.',
            'Sanction of monthly disability pension.'
        ],
        hindiApplicationSteps: [
            'जिला समाज कल्याण अधिकारी कार्यालय में यूडीआईडी कार्ड के साथ आवेदन जमा करें।'
        ],
        officialPortal: 'https://nsap.nic.in',
        helpline: '1800-111-555',
        isCentral: true,
        nodalMinistry: 'Ministry of Rural Development'
    },
    // ==========================================
    // EDUCATION & SKILL SCHEMES (49-53)
    // ==========================================
    {
        id: 'nmmss-scholarship',
        name: 'National Means-cum-Merit Scholarship (NMMSS)',
        hindiName: 'राष्ट्रीय साधन-सह-योग्यता छात्रवृत्ति योजना',
        categoryTag: 'Education & Skill',
        description: 'Scholarship awarded to meritorious students from economically weaker sections to prevent dropouts at Class 8 and encourage them to continue secondary education.',
        hindiDescription: 'आर्थिक रूप से कमजोर प्रतिभाशाली छात्रों को कक्षा 8 के बाद पढ़ाई जारी रखने के लिए प्रति वर्ष ₹12,000 की छात्रवृत्ति।',
        benefitSummary: '₹12,000 per year scholarship (₹1,000/month) from Class 9 to Class 12 via Direct Benefit Transfer.',
        hindiBenefitSummary: 'कक्षा 9 से 12वीं तक ₹12,000 प्रति वर्ष (₹1,000/माह) सीधा छात्र के बैंक खाते में।',
        rules: {
            studentRequired: true,
            maxIncome: 350000,
        },
        requiredDocuments: [
            'Aadhaar Card of Student',
            'Class 7/8 Marksheet with minimum 55% marks',
            'Parental Income Certificate (< ₹3.5 Lakh/yr)',
            'Category Certificate (SC/ST/OBC/Disability if applicable)'
        ],
        hindiRequiredDocuments: [
            'छात्र का आधार कार्ड',
            'कक्षा 7वीं/8वीं की अंकसूची (न्यूनतम 55% अंक)',
            'अभिभावक का आय प्रमाण पत्र (< ₹3.5 लाख/वर्ष)',
            'जाति / दिव्यांगता प्रमाण पत्र (यदि लागू हो)'
        ],
        applicationSteps: [
            'Apply on National Scholarship Portal (NSP) at scholarship.gov.in.',
            'Register student, select NMMSS scheme, and upload income/marksheet docs.',
            'State-level NMMSS selection test exam qualification.',
            'School & Nodal Officer online verification for annual disbursement.'
        ],
        hindiApplicationSteps: [
            'नेशनल स्कॉलरशिप पोर्टल (scholarship.gov.in) पर जाएं।',
            'छात्र का पंजीकरण करें और एनएमएमएसएस योजना चुनें।',
            'राज्य स्तरीय एनएमएमएसएस चयन परीक्षा में शामिल हों।',
            'स्कूल के नोडल अधिकारी द्वारा सत्यापन के बाद छात्रवृत्ति चालू।'
        ],
        officialPortal: 'https://scholarships.gov.in',
        helpline: '0120-6619540',
        isCentral: true,
        nodalMinistry: 'Department of School Education and Literacy (MoE)'
    },
    {
        id: 'pm-yasasvi',
        name: 'PM YASASVI Scholarship Scheme for OBC/EBC/DNT',
        hindiName: 'पीएम यशस्वी छात्रवृत्ति योजना (OBC/EBC छात्रों के लिए ₹75k-₹1.25L)',
        categoryTag: 'Education & Skill',
        description: 'Top class scholarship for meritorious OBC, EBC and DNT students studying in Class 9 and Class 11 in recognized schools.',
        hindiDescription: 'OBC, EBC और DNT श्रेणी के मेधावी विद्यार्थियों को कक्षा 9वीं हेतु ₹75,000/वर्ष एवं कक्षा 11वीं हेतु ₹1,25,000/वर्ष की छात्रवृत्ति।',
        benefitSummary: '₹75,000/year for Class 9-10 & ₹1,25,000/year for Class 11-12 covering school fees and hostel expenses.',
        hindiBenefitSummary: 'कक्षा 9-10 के लिए ₹75,000/वर्ष एवं कक्षा 11-12 के लिए ₹1,25,000/वर्ष की छात्रवृत्ति।',
        rules: {
            studentRequired: true,
            maxIncome: 250000,
            categories: ['obc'],
        },
        requiredDocuments: [
            'Aadhaar Card of Student',
            'OBC / EBC / DNT Category Certificate',
            'Parental Annual Income Certificate (< ₹2.5 Lakh)',
            'Previous Class Marksheet'
        ],
        hindiRequiredDocuments: [
            'छात्र का आधार कार्ड',
            'OBC / EBC जाति प्रमाण पत्र',
            'आय प्रमाण पत्र (< ₹2.5 लाख/वर्ष)',
            'पिछली कक्षा की अंकसूची'
        ],
        applicationSteps: [
            'Apply online on NTA YASASVI portal or National Scholarship Portal (NSP).',
            'Upload caste and income documents.',
            'Verification by District Education Officer (DEO).',
            'Direct Benefit Transfer to student\'s bank account.'
        ],
        hindiApplicationSteps: [
            'NSP पोर्टल (scholarships.gov.in) पर ऑनलाइन आवेदन करें।',
            'आय व जाति प्रमाण पत्र अपलोड करें।',
            'जिला शिक्षा अधिकारी द्वारा सत्यापन के बाद स्कॉलरशिप बैंक में।'
        ],
        officialPortal: 'https://yet.nta.ac.in',
        helpline: '011-40759000',
        isCentral: true,
        nodalMinistry: 'Ministry of Social Justice and Empowerment'
    },
    {
        id: 'post-matric-scholarship',
        name: 'Post Matric Scholarship for SC/ST/OBC Students',
        hindiName: 'पोस्ट मैट्रिक छात्रवृत्ति योजना (कक्षा 11 से पीएचडी तक मुफ़्त पढ़ाई)',
        categoryTag: 'Education & Skill',
        description: 'Financial assistance to SC, ST, and OBC students studying at post-matriculation or post-secondary stage (Diploma, Degree, PG, PhD).',
        hindiDescription: '11वीं, 12वीं, आईटीआई, डिप्लोमा, बीए, बीएससी, बीटेक व पीएचडी कर रहे SC/ST/OBC छात्रों को 100% शिक्षण शुल्क वापसी और रखरखाव भत्ता।',
        benefitSummary: 'Full tuition fee reimbursement + maintenance allowance credited directly to student bank account.',
        hindiBenefitSummary: '100% कॉलेज फीस वापसी + हर महीने हॉस्टल व पढ़ाई रखरखाव भत्ता।',
        rules: {
            studentRequired: true,
            maxIncome: 250000,
            categories: ['sc', 'st', 'obc'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'Caste Certificate (SC/ST/OBC)',
            'Parents Income Certificate (< ₹2.5 Lakh)',
            'College Admission Fee Receipt & Previous Marksheet'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'जाति प्रमाण पत्र (SC/ST/OBC)',
            'अभिभावक का आय प्रमाण पत्र',
            'कॉलेज फीस रसीद एवं पिछली मार्कशीट'
        ],
        applicationSteps: [
            'Apply on State Scholarship Portal or NSP.',
            'Enter college enrollment number & upload fee receipts.',
            'College online verification.',
            'State Govt releases tuition fee reimbursement to bank.'
        ],
        hindiApplicationSteps: [
            'राज्य छात्रवृत्ति पोर्टल या नेशनल स्कॉलरशिप पोर्टल पर ऑनलाइन आवेदन करें।',
            'कॉलेज फीस रसीद और मार्कशीट अपलोड करें।',
            'कॉलेज द्वारा ऑनलाइन फॉरवर्ड के बाद छात्रवृत्ति खाते में।'
        ],
        officialPortal: 'https://scholarships.gov.in',
        helpline: '0120-6619540',
        isCentral: true,
        nodalMinistry: 'Ministry of Social Justice / Tribal Affairs'
    },
    {
        id: 'pm-kaushal-vikas',
        name: 'PM Kaushal Vikas Yojana (PMKVY 4.0)',
        hindiName: 'प्रधानमंत्री कौशल विकास योजना (PMKVY 4.0 मुफ़्त स्किल कोर्स)',
        categoryTag: 'Education & Skill',
        description: 'Free industry-relevant skill training, Industry 4.0 courses (AI, Robotics, Drones, Coding) & Govt certification to youth.',
        hindiDescription: 'युवाओं को कोडिंग, रोबोटिक्स, ड्रोन सर्विसिंग, सोलर पैनल और 300+ जॉब रोल्स में मुफ़्त स्किल ट्रेनिंग, सर्टिफिकेट व ₹8,000 पुरस्कार।',
        benefitSummary: '100% Free Skill Training, NSDC Government Skill Certificate, ₹8,000 stipend reward & Job Placement.',
        hindiBenefitSummary: '100% मुफ़्त ट्रेनिंग, सरकारी NSDC प्रमाण पत्र, ₹8,000 स्किल रिवॉर्ड एवं जॉब मेला प्लेसमैंट।',
        rules: {
            minAge: 15,
            maxAge: 45,
        },
        requiredDocuments: [
            'Aadhaar Card',
            '10th / 12th Marksheet (if available)',
            'Bank Account Passbook'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            '10वीं/12वीं अंकसूची (यदि उपलब्ध हो)',
            'बैंक खाता पासबुक'
        ],
        applicationSteps: [
            'Register on Skill India Digital portal (skillindiadigital.gov.in).',
            'Choose preferred course (e.g. Drone Technician, AI Assistant, Electrician, Solar Installer).',
            'Enroll at nearest PMKVY Training Centre (Pradhan Mantri Kaushal Kendra).',
            'Pass assessment test to receive NSDC Skill Certificate and job offer.'
        ],
        hindiApplicationSteps: [
            'Skill India Digital पोर्टल (skillindiadigital.gov.in) पर पंजीयन करें।',
            'अपने शहर के नजदीकी प्रधानमंत्री कौशल केंद्र का चयन करें।',
            'ट्रेनिंग पूरी करके सरकारी सर्टिफिकेट और नौकरी प्राप्त करें।'
        ],
        officialPortal: 'https://www.skillindiadigital.gov.in',
        helpline: '088000-55555',
        isCentral: true,
        nodalMinistry: 'Ministry of Skill Development and Entrepreneurship'
    },
    {
        id: 'national-apprenticeship',
        name: 'National Apprenticeship Promotion Scheme (NAPS II)',
        hindiName: 'राष्ट्रीय शिक्षुता प्रोत्साहन योजना (NAPS 25% स्टाइपेंड सहायता)',
        categoryTag: 'Education & Skill',
        description: 'Provides paid on-the-job apprenticeship training in top companies with Govt paying 25% stipend (up to ₹1,500/month) directly to apprentices.',
        hindiDescription: 'आईटीआई/डिप्लोमा/ग्रेजुएट पास युवाओं को कंपनियों में पेड अप्रेंटिसशिप ट्रेनिंग तथा ₹1,500/माह सरकार द्वारा सीधा स्टाइपेंड।',
        benefitSummary: 'Paid practical industry apprenticeship with Govt paying up to ₹1,500/month direct stipend (DBT).',
        hindiBenefitSummary: 'कंपनी में काम सीखने के दौरान हर महीने स्टाइपेंड सैलरी + ₹1,500 सरकारी मदद।',
        rules: {
            minAge: 18,
            maxAge: 35,
            occupations: ['student', 'unemployed'],
        },
        requiredDocuments: [
            'Aadhaar Card',
            'ITI / Diploma / Degree Passing Certificate',
            'Bank Passbook Linked with Aadhaar'
        ],
        hindiRequiredDocuments: [
            'आधार कार्ड',
            'आईटीआई / डिप्लोमा / डिग्री मार्कशीट',
            'बैंक पासbook'
        ],
        applicationSteps: [
            'Register on Apprenticeship India portal (apprenticeshipindia.gov.in).',
            'Apply to vacant apprenticeship seats in manufacturing & IT companies.',
            'Sign apprenticeship contract.',
            'Receive monthly stipend via DBT.'
        ],
        hindiApplicationSteps: [
            'apprenticeshipindia.gov.in पर प्रोफ़ाइल बनाएं।',
            'कंपनियों की रिक्त अप्रेंटिस सीटों के लिए आवेदन करें।',
            'कंपनी में कार्य करते हुए हर महीने वेतन/स्टाइपेंड प्राप्त करें।'
        ],
        officialPortal: 'https://www.apprenticeshipindia.gov.in',
        helpline: '011-25847036',
        isCentral: true,
        nodalMinistry: 'Ministry of Skill Development and Entrepreneurship'
    }
];
