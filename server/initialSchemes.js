export const INITIAL_SCHEMES = [
  {
    id: 'pm_kisan',
    name: 'PM Kisan Samman Nidhi',
    hindiName: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    description: 'Income support scheme providing ₹6,000 per year in three equal installments directly to landholding farmer families across India.',
    hindiDescription: 'भारत के सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता (3 किस्तों में) प्रदान करने की केंद्र प्रायोजित योजना।',
    benefitSummary: '₹6,000 per year cash transfer directly to bank account via DBT',
    hindiBenefitSummary: '₹6,000 प्रति वर्ष नकद सहायता सीधे बैंक खाते में (डीबीटी द्वारा)',
    requiredDocuments: ['Aadhaar Card', 'Land Ownership Records (Khasra/Khatauni)', 'Bank Account Details (Aadhaar Seeded)'],
    hindiRequiredDocuments: ['आधार कार्ड', 'खतौनी/जमीन के दस्तावेज', 'आधार से लिंक बैंक खाता'],
    nodalMinistry: 'Ministry of Agriculture and Farmers Welfare',
    officialPortal: 'https://pmkisan.gov.in',
    rules: {
      minAge: 18,
      maxAge: 75,
      occupations: ['farmer'],
      maxLandHolding: 2.0
    },
    categoryTag: 'Agriculture',
    isCentral: true
  },
  {
    id: 'ayushman_bharat',
    name: 'Ayushman Bharat - PM-JAY',
    hindiName: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
    description: 'World largest health assurance scheme offering free secondary & tertiary hospitalization coverage up to ₹5 Lakh per family per year.',
    hindiDescription: 'विश्व की सबसे बड़ी स्वास्थ्य बीमा योजना, जिसके तहत पात्र परिवारों को प्रति वर्ष ₹5 लाख तक का मुफ्त इलाज मिलता है।',
    benefitSummary: 'Free cashless health insurance cover up to ₹5,000,000 per family annually',
    hindiBenefitSummary: 'प्रति परिवार ₹5,000,000 तक का मुफ्त कैशलेस इलाज',
    requiredDocuments: ['Aadhaar Card', 'Ration Card / Ayushman Card', 'Mobile Number'],
    hindiRequiredDocuments: ['आधार कार्ड', 'राशन कार्ड / आयुष्मान कार्ड', 'मोबाइल नंबर'],
    nodalMinistry: 'Ministry of Health and Family Welfare',
    officialPortal: 'https://pmjay.gov.in',
    rules: {
      minAge: 0,
      maxAge: 100,
      maxIncome: 250000,
      bplRequired: true
    },
    categoryTag: 'Healthcare',
    isCentral: true
  },
  {
    id: 'pm_vishwakarma',
    name: 'PM Vishwakarma Scheme',
    hindiName: 'पीएम विश्वकर्मा योजना',
    description: 'End-to-end support for traditional artisans and craftspeople including ₹15,000 toolkit voucher, skill training, and 5% interest loans.',
    hindiDescription: 'पारंपरिक कारीगरों (जैसे बढ़ई, लोहार, दर्जी, कुम्हार) को ₹15,000 का टूलकिट वाउचर, प्रशिक्षण और ₹3 लाख तक का कम ब्याज ऋण।',
    benefitSummary: '₹15,000 Toolkit E-Voucher + Collateral-free Loan up to ₹3,000,000 at 5% Interest',
    hindiBenefitSummary: '₹15,000 टूलकिट वाउचर + बिना गारंटी के ₹3 लाख तक का लोन (5% ब्याज)',
    requiredDocuments: ['Aadhaar Card', 'Bank Passbook', 'Skill / Trade Details'],
    hindiRequiredDocuments: ['आधार कार्ड', 'बैंक पासबुक', 'कारीगरी/व्यवसाय विवरण'],
    nodalMinistry: 'Ministry of Micro, Small and Medium Enterprises',
    officialPortal: 'https://pmvishwakarma.gov.in',
    rules: {
      minAge: 18,
      maxAge: 70,
      occupations: ['artisan']
    },
    categoryTag: 'Finance & Business',
    isCentral: true
  },
  {
    id: 'pm_svanidhi',
    name: 'PM SVANidhi Scheme',
    hindiName: 'पीएम स्वनिधि योजना (स्ट्रीट वेंडर ऋण)',
    description: 'Micro-credit scheme for street vendors offering collateral-free working capital loan starting from ₹10,000 up to ₹50,000 with 7% interest subsidy.',
    hindiDescription: 'रेहड़ी-पटरी विक्रेताओं के लिए बिना गारंटी ₹10,000 से ₹50,000 तक का वर्किंग कैपिटल लोन और 7% ब्याज सब्सिडी।',
    benefitSummary: 'Collateral-free loan from ₹10,000 to ₹50,000 with 7% interest subsidy & cashback on digital payments',
    hindiBenefitSummary: '₹10,000 से ₹50,000 तक बिना गारंटी का लोन और डिजिटल भुगतान पर कैशबैक',
    requiredDocuments: ['Aadhaar Card', 'Vending Certificate / Identity Card', 'Bank Account'],
    hindiRequiredDocuments: ['आधार कार्ड', 'स्ट्रीट वेंडर प्रमाण पत्र / पहचान पत्र', 'बैंक खाता'],
    nodalMinistry: 'Ministry of Housing and Urban Affairs',
    officialPortal: 'https://pmsvanidhi.mohua.gov.in',
    rules: {
      minAge: 18,
      maxAge: 65,
      occupations: ['street_vendor']
    },
    categoryTag: 'Finance & Business',
    isCentral: true
  },
  {
    id: 'nmmss_scholarship',
    name: 'National Means-cum-Merit Scholarship (NMMSS)',
    hindiName: 'राष्ट्रीय साधन-सह-योग्यता छात्रवृत्ति योजना (NMMSS)',
    description: 'Scholarship awarded to meritorious students of economically weaker sections to prevent dropout at class 8 and encourage education till secondary stage.',
    hindiDescription: 'आर्थिक रूप से कमजोर प्रतिभाशाली छात्रों को कक्षा 9 से 12 तक पढ़ाई जारी रखने हेतु प्रति वर्ष ₹12,000 की छात्रवृत्ति।',
    benefitSummary: 'Scholarship of ₹12,000 per annum (₹1,000 per month) for classes IX to XII',
    hindiBenefitSummary: 'कक्षा 9 से 12 तक ₹12,000 प्रति वर्ष (₹1,000/माह) की छात्रवृत्ति',
    requiredDocuments: ['Class 8 Marksheet', 'Income Certificate (< ₹3.5 Lakh)', 'Aadhaar Card', 'Bank Account'],
    hindiRequiredDocuments: ['कक्षा 8 की मार्कशीट', 'आय प्रमाण पत्र (< ₹3.5 लाख)', 'आधार कार्ड', 'बैंक पासबुक'],
    nodalMinistry: 'Ministry of Education',
    officialPortal: 'https://scholarships.gov.in',
    rules: {
      minAge: 12,
      maxAge: 18,
      maxIncome: 350000,
      studentRequired: true
    },
    categoryTag: 'Empowerment',
    isCentral: true
  }
];
