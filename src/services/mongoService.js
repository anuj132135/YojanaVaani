const API_BASE_URL = 'http://localhost:5000/api';
export class MongoService {
    static isConnected = false;
    static dbState = 'Offline/Fallback Cache';
    /**
     * Check connection to MongoDB Express Backend API
     */
    static async checkHealth() {
        try {
            const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(2500) });
            if (res.ok) {
                const data = await res.json();
                this.isConnected = Boolean(data.mongoConnected);
                this.dbState = data.dbState || 'Connected';
                return {
                    isConnected: this.isConnected,
                    dbState: this.dbState,
                    source: this.isConnected ? 'mongodb' : 'local_fallback'
                };
            }
        }
        catch (e) {
            // Backend not running or offline -> Use local fallback
        }
        this.isConnected = false;
        this.dbState = 'Offline/Local Cache';
        return {
            isConnected: false,
            dbState: 'Offline/Local Cache',
            source: 'local_fallback'
        };
    }
    /**
     * Fetch scheme records from MongoDB
     */
    static async fetchSchemes() {
        try {
            const res = await fetch(`${API_BASE_URL}/schemes`, { signal: AbortSignal.timeout(3000) });
            if (res.ok) {
                const json = await res.json();
                if (json.data && Array.isArray(json.data) && json.data.length > 0) {
                    return { schemes: json.data, source: json.source || 'mongodb' };
                }
            }
        }
        catch (e) {
            // Fail silently to local fallback
        }
        return { schemes: [], source: 'local_fallback' };
    }
    /**
     * Insert new scheme into MongoDB (Admin CMS)
     */
    static async saveScheme(scheme) {
        try {
            const res = await fetch(`${API_BASE_URL}/schemes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scheme)
            });
            return res.ok;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * Log citizen eligibility evaluation audit trace to MongoDB
     */
    static async logAudit(citizenName, queryTranscript, matchedSchemesCount) {
        try {
            const res = await fetch(`${API_BASE_URL}/audits`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ citizenName, queryTranscript, matchedSchemesCount })
            });
            return res.ok;
        }
        catch (e) {
            return false;
        }
    }
}
