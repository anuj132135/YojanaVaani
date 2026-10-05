/**
 * YojanaVaani Declarative Welfare Rule Engine
 */
export class WelfareRuleEngine {
    /**
     * Compiles scheme criteria into executable RuleDefinitions
     */
    static compileRules(scheme) {
        const rules = [];
        const { rules: sRules } = scheme;
        // 1. Age Rule
        if (sRules.minAge !== undefined || sRules.maxAge !== undefined) {
            const min = sRules.minAge ?? 0;
            const max = sRules.maxAge ?? 120;
            rules.push({
                id: `AGE_${scheme.id}`,
                name: `Age Requirement (${min}-${max} yrs)`,
                hindiName: `आयु सीमा (${min}-${max} वर्ष)`,
                field: 'age',
                operator: 'BETWEEN',
                targetValue: [min, max],
                weight: 3,
                successReason: `Age matches required bracket (${min} to ${max} yrs)`,
                hindiSuccessReason: `आयु ${min} से ${max} वर्ष की सीमा में है`,
                failureReason: `Age is out of target range (${min} to ${max} yrs)`,
                hindiFailureReason: `आयु ${min} से ${max} वर्ष की सीमा में नहीं है`
            });
        }
        // 2. Income Limit Rule
        if (sRules.maxIncome !== undefined) {
            rules.push({
                id: `INCOME_${scheme.id}`,
                name: `Annual Income Cap (<= ₹${sRules.maxIncome.toLocaleString('en-IN')})`,
                hindiName: `वार्षिक आय सीमा (<= ₹${sRules.maxIncome.toLocaleString('en-IN')})`,
                field: 'annualIncome',
                operator: 'LESS_THAN_EQUAL',
                targetValue: sRules.maxIncome,
                weight: 4,
                successReason: `Annual Income is under limit of ₹${sRules.maxIncome.toLocaleString('en-IN')}`,
                hindiSuccessReason: `वार्षिक आय ₹${sRules.maxIncome.toLocaleString('en-IN')} की सीमा के अंतर्गत है`,
                failureReason: `Annual Income exceeds upper limit of ₹${sRules.maxIncome.toLocaleString('en-IN')}`,
                hindiFailureReason: `वार्षिक आय अधिकतम सीमा ₹${sRules.maxIncome.toLocaleString('en-IN')} से अधिक है`
            });
        }
        // 3. Gender Requirement
        if (sRules.gender && sRules.gender.length > 0 && !sRules.gender.includes('all')) {
            rules.push({
                id: `GENDER_${scheme.id}`,
                name: `Gender Target (${sRules.gender.join(', ')})`,
                hindiName: `लक्षित लिंग (${sRules.gender.map(g => g === 'female' ? 'महिला' : 'पुरुष').join(', ')})`,
                field: 'gender',
                operator: 'IN_LIST',
                targetValue: sRules.gender,
                weight: 5,
                successReason: `Gender matches scheme target`,
                hindiSuccessReason: `लिंग पात्रता नियम के अनुकूल है`,
                failureReason: `Scheme is restricted to ${sRules.gender.join('/')}`,
                hindiFailureReason: `योजना केवल ${sRules.gender.map(g => g === 'female' ? 'महिलाओं' : 'पुरुषों').join('/')} के लिए है`
            });
        }
        // 4. Occupation Target
        if (sRules.occupations && sRules.occupations.length > 0) {
            rules.push({
                id: `OCCUPATION_${scheme.id}`,
                name: `Target Occupation`,
                hindiName: `लक्षित व्यवसाय`,
                field: 'occupation',
                operator: 'IN_LIST',
                targetValue: sRules.occupations,
                weight: 4,
                successReason: `Occupation qualifies for scheme target`,
                hindiSuccessReason: `व्यवसाय योजना के पात्र व्यवसायों में शामिल है`,
                failureReason: `Occupation is not in target beneficiary list`,
                hindiFailureReason: `व्यवसाय योजना की लाभार्थी सूची में नहीं है`
            });
        }
        // 5. Land Holding Limit
        if (sRules.maxLandHolding !== undefined) {
            rules.push({
                id: `LAND_${scheme.id}`,
                name: `Land Holding Limit (<= ${sRules.maxLandHolding} Ha)`,
                hindiName: `भूमि सीमा (<= ${sRules.maxLandHolding} हेक्टेयर)`,
                field: 'landHoldingHectares',
                operator: 'LESS_THAN_EQUAL',
                targetValue: sRules.maxLandHolding,
                weight: 4,
                successReason: `Land holding is within maximum allowed limit`,
                hindiSuccessReason: `भूमि स्वामित्व अधिकतम अनुमत सीमा के अंतर्गत है`,
                failureReason: `Land holding exceeds maximum ceiling of ${sRules.maxLandHolding} Ha`,
                hindiFailureReason: `भूमि स्वामित्व अधिकतम सीमा ${sRules.maxLandHolding} हेक्टेयर से अधिक है`
            });
        }
        // 6. BPL Ration Card Requirement
        if (sRules.bplRequired) {
            rules.push({
                id: `BPL_${scheme.id}`,
                name: `BPL / Ration Card Mandatory`,
                hindiName: `बीपीएल राशन कार्ड अनिवार्य`,
                field: 'hasBplCard',
                operator: 'BOOLEAN_TRUE',
                targetValue: true,
                weight: 3,
                successReason: `BPL Ration card available`,
                hindiSuccessReason: `बीपीएल राशन कार्ड उपलब्ध है`,
                failureReason: `BPL Ration card is mandatory for this scheme`,
                hindiFailureReason: `इस योजना के लिए बीपीएल राशन कार्ड होना अनिवार्य है`
            });
        }
        // 7. Student Status
        if (sRules.studentRequired) {
            rules.push({
                id: `STUDENT_${scheme.id}`,
                name: `Active Student Status`,
                hindiName: `छात्र होने की स्थिति`,
                field: 'isStudent',
                operator: 'BOOLEAN_TRUE',
                targetValue: true,
                weight: 4,
                successReason: `Citizen is an active enrolled student`,
                hindiSuccessReason: `नागरिक वर्तमान में अध्ययनरत विद्यार्थी है`,
                failureReason: `Must be an enrolled student to apply`,
                hindiFailureReason: `आवेदन के लिए छात्र होना अनिवार्य है`
            });
        }
        // 8. Girl Child Status
        if (sRules.girlChildRequired) {
            rules.push({
                id: `GIRL_CHILD_${scheme.id}`,
                name: `Girl Child Under 10 Years`,
                hindiName: `10 वर्ष से कम आयु की बालिका`,
                field: 'hasGirlChildUnder10',
                operator: 'BOOLEAN_TRUE',
                targetValue: true,
                weight: 5,
                successReason: `Has girl child under 10 years of age`,
                hindiSuccessReason: `10 वर्ष से कम आयु की बालिका उपलब्ध है`,
                failureReason: `Scheme requires family to have a girl child under 10 yrs`,
                hindiFailureReason: `योजना हेतु परिवार में 10 वर्ष से कम बालिका होना आवश्यक है`
            });
        }
        return rules;
    }
    /**
     * Executes Rule Engine logic for a citizen against a scheme
     */
    static execute(citizen, scheme) {
        const startTime = performance.now();
        const compiledRules = this.compileRules(scheme);
        let totalWeight = 0;
        let passedWeight = 0;
        const logs = [];
        for (const rule of compiledRules) {
            const actualValue = citizen[rule.field];
            const passed = this.evaluateOperator(actualValue, rule.operator, rule.targetValue);
            totalWeight += rule.weight;
            if (passed)
                passedWeight += rule.weight;
            logs.push({
                ruleId: rule.id,
                ruleName: rule.name,
                hindiRuleName: rule.hindiName,
                passed,
                actualValue,
                expectedValue: rule.targetValue,
                reason: passed ? `${rule.successReason} (${rule.field}: ${actualValue})` : `${rule.failureReason} (${rule.field}: ${actualValue})`,
                hindiReason: passed ? `${rule.hindiSuccessReason} (${rule.field}: ${actualValue})` : `${rule.hindiFailureReason} (${rule.field}: ${actualValue})`,
                weight: rule.weight
            });
        }
        const score = totalWeight === 0 ? 100 : Math.round((passedWeight / totalWeight) * 100);
        const failedCount = logs.filter(l => !l.passed).length;
        let overallStatus = 'ineligible';
        if (failedCount === 0) {
            overallStatus = 'eligible';
        }
        else if (score >= 50 && failedCount <= 1) {
            overallStatus = 'partial';
        }
        const executionTimeMs = Number((performance.now() - startTime).toFixed(2));
        return {
            schemeId: scheme.id,
            schemeName: scheme.name,
            overallStatus,
            score,
            totalWeight,
            passedWeight,
            logs,
            executionTimeMs
        };
    }
    /**
     * Internal condition evaluator
     */
    static evaluateOperator(actual, operator, target) {
        switch (operator) {
            case 'EQUALS':
                return actual === target;
            case 'LESS_THAN_EQUAL':
                return Number(actual) <= Number(target);
            case 'GREATER_THAN_EQUAL':
                return Number(actual) >= Number(target);
            case 'BETWEEN':
                return Array.isArray(target) && Number(actual) >= Number(target[0]) && Number(actual) <= Number(target[1]);
            case 'IN_LIST':
                return Array.isArray(target) && target.includes(actual);
            case 'BOOLEAN_TRUE':
                return Boolean(actual) === true;
            default:
                return false;
        }
    }
}
