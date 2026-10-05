export function evaluateEligibility(citizen, scheme) {
    const passedRules = [];
    const failedRules = [];
    const missingFields = [];
    const { rules } = scheme;
    let totalCriteria = 0;
    let passedCount = 0;
    // 1. Age Rule
    if (rules.minAge !== undefined || rules.maxAge !== undefined) {
        totalCriteria++;
        const min = rules.minAge ?? 0;
        const max = rules.maxAge ?? 120;
        if (citizen.age >= min && citizen.age <= max) {
            passedCount++;
            passedRules.push({
                rule: `Age is ${citizen.age} (Required: ${min} to ${max} years)`,
                hindiRule: `आयु ${citizen.age} वर्ष (आवश्यक: ${min} से ${max} वर्ष)`
            });
        }
        else {
            failedRules.push({
                rule: `Age is ${citizen.age} (Required: ${min} to ${max} years)`,
                hindiRule: `आयु ${citizen.age} वर्ष (आवश्यक: ${min} से ${max} वर्ष नहीं है)`
            });
        }
    }
    // 2. Income Rule
    if (rules.maxIncome !== undefined) {
        totalCriteria++;
        if (citizen.annualIncome <= rules.maxIncome) {
            passedCount++;
            passedRules.push({
                rule: `Annual Income ₹${citizen.annualIncome.toLocaleString('en-IN')} (Under max limit ₹${rules.maxIncome.toLocaleString('en-IN')})`,
                hindiRule: `वार्षिक आय ₹${citizen.annualIncome.toLocaleString('en-IN')} (सीमा ₹${rules.maxIncome.toLocaleString('en-IN')} के अंतर्गत)`
            });
        }
        else {
            failedRules.push({
                rule: `Annual Income ₹${citizen.annualIncome.toLocaleString('en-IN')} exceeds limit ₹${rules.maxIncome.toLocaleString('en-IN')}`,
                hindiRule: `वार्षिक आय ₹${citizen.annualIncome.toLocaleString('en-IN')} अधिकतम सीमा ₹${rules.maxIncome.toLocaleString('en-IN')} से अधिक है`
            });
        }
    }
    // 3. Gender Rule
    if (rules.gender && rules.gender.length > 0) {
        totalCriteria++;
        if (rules.gender.includes(citizen.gender) || rules.gender.includes('all')) {
            passedCount++;
            passedRules.push({
                rule: `Gender '${citizen.gender.toUpperCase()}' matches requirement`,
                hindiRule: `लिंग '${citizen.gender === 'female' ? 'महिला' : citizen.gender === 'male' ? 'पुरुष' : 'अन्य'}' पात्रता से मेल खाता है`
            });
        }
        else {
            failedRules.push({
                rule: `Gender '${citizen.gender}' does not match requirement (${rules.gender.join(', ')})`,
                hindiRule: `लिंग पात्रता नियम के अनुसार केवल ${rules.gender.map(g => g === 'female' ? 'महिलाएं' : 'पुरुष').join('/')} के लिए है`
            });
        }
    }
    // 4. Occupation Rule
    if (rules.occupations && rules.occupations.length > 0) {
        totalCriteria++;
        if (rules.occupations.includes(citizen.occupation)) {
            passedCount++;
            passedRules.push({
                rule: `Occupation '${formatOccupation(citizen.occupation)}' qualifies`,
                hindiRule: `व्यवसाय '${formatOccupationHindi(citizen.occupation)}' पात्र है`
            });
        }
        else {
            failedRules.push({
                rule: `Occupation '${formatOccupation(citizen.occupation)}' is not in target list (${rules.occupations.map(formatOccupation).join(', ')})`,
                hindiRule: `व्यवसाय '${formatOccupationHindi(citizen.occupation)}' लक्षित सूची में नहीं है (${rules.occupations.map(formatOccupationHindi).join(', ')})`
            });
        }
    }
    // 5. Category Rule
    if (rules.categories && rules.categories.length > 0) {
        totalCriteria++;
        if (rules.categories.includes(citizen.category)) {
            passedCount++;
            passedRules.push({
                rule: `Social Category '${citizen.category.toUpperCase()}' qualifies`,
                hindiRule: `वर्ग '${citizen.category.toUpperCase()}' पात्र है`
            });
        }
        else {
            failedRules.push({
                rule: `Category '${citizen.category.toUpperCase()}' not eligible`,
                hindiRule: `वर्ग '${citizen.category.toUpperCase()}' पात्र नहीं है`
            });
        }
    }
    // 6. Land Holding Rule
    if (rules.maxLandHolding !== undefined) {
        totalCriteria++;
        if (citizen.landHoldingHectares <= rules.maxLandHolding) {
            passedCount++;
            passedRules.push({
                rule: `Land holding ${citizen.landHoldingHectares} ha (Limit <= ${rules.maxLandHolding} ha)`,
                hindiRule: `भूमि स्वामित्व ${citizen.landHoldingHectares} हेक्टेयर (सीमा <= ${rules.maxLandHolding} हेक्टेयर)`
            });
        }
        else {
            failedRules.push({
                rule: `Land holding ${citizen.landHoldingHectares} ha exceeds max limit ${rules.maxLandHolding} ha`,
                hindiRule: `भूमि स्वामित्व ${citizen.landHoldingHectares} हेक्टेयर अधिकतम सीमा ${rules.maxLandHolding} हेक्टेयर से अधिक है`
            });
        }
    }
    // 7. BPL Card Requirement
    if (rules.bplRequired) {
        totalCriteria++;
        if (citizen.hasBplCard) {
            passedCount++;
            passedRules.push({
                rule: `Has BPL / Ration Card`,
                hindiRule: `बीपीएल / पात्र गृहस्थी राशन कार्ड उपलब्ध है`
            });
        }
        else {
            failedRules.push({
                rule: `Requires BPL / Low Income Ration Card`,
                hindiRule: `बीपीएल / राशन कार्ड आवश्यक है`
            });
        }
    }
    // 8. Student Requirement
    if (rules.studentRequired) {
        totalCriteria++;
        if (citizen.isStudent) {
            passedCount++;
            passedRules.push({
                rule: `Currently enrolled student`,
                hindiRule: `वर्तमान में अध्ययनरत विद्यार्थी`
            });
        }
        else {
            failedRules.push({
                rule: `Requires active student enrollment`,
                hindiRule: `अध्ययनरत विद्यार्थी होना अनिवार्य है`
            });
        }
    }
    // 9. Girl Child Requirement
    if (rules.girlChildRequired) {
        totalCriteria++;
        if (citizen.hasGirlChildUnder10) {
            passedCount++;
            passedRules.push({
                rule: `Has girl child under 10 years of age`,
                hindiRule: `10 वर्ष से कम आयु की पुत्री है`
            });
        }
        else {
            failedRules.push({
                rule: `Requires girl child under 10 years of age`,
                hindiRule: `10 वर्ष से कम आयु की पुत्री होना आवश्यक है`
            });
        }
    }
    // Calculate score percentage
    const score = totalCriteria === 0 ? 100 : Math.round((passedCount / totalCriteria) * 100);
    let status = 'ineligible';
    if (failedRules.length === 0) {
        status = 'eligible';
    }
    else if (score >= 50 && failedRules.length <= 1) {
        status = 'partial';
    }
    return {
        schemeId: scheme.id,
        scheme,
        status,
        score,
        passedRules,
        failedRules,
        missingFields
    };
}
export function formatOccupation(occ) {
    const map = {
        farmer: 'Farmer',
        artisan: 'Traditional Artisan / Craftsperson',
        street_vendor: 'Street Vendor / Rehri-Patri',
        unorganized_worker: 'Unorganized Sector Worker',
        student: 'Student',
        self_employed: 'Self Employed / Business',
        salaried: 'Salaried Employee',
        unemployed: 'Unemployed'
    };
    return map[occ] || occ;
}
export function formatOccupationHindi(occ) {
    const map = {
        farmer: 'किसान',
        artisan: 'पारंपरिक कारीगर / दस्तकार',
        street_vendor: 'रेहड़ी-पटरी / स्ट्रीट वेंडर',
        unorganized_worker: 'असंगठित क्षेत्र मजदूर',
        student: 'छात्र / विद्यार्थी',
        self_employed: 'स्वरोजगार / छोटा व्यवसायी',
        salaried: 'वेतनभोगी कर्मचारी',
        unemployed: 'बेरोजगार'
    };
    return map[occ] || occ;
}
