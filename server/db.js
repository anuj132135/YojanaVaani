import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yojanavaani';

export async function connectMongoDB() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000
    });
    console.log('✅ MongoDB connected successfully to database:', mongoose.connection.name);
    return true;
  } catch (error) {
    console.warn('⚠️ MongoDB connection warning (Using fallback in-memory cache):', error.message);
    return false;
  }
}

// Scheme Mongoose Schema
const SchemeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hindiName: { type: String, required: true },
  description: { type: String, required: true },
  hindiDescription: { type: String, required: true },
  benefitSummary: { type: String, required: true },
  hindiBenefitSummary: { type: String, required: true },
  requiredDocuments: [String],
  hindiRequiredDocuments: [String],
  nodalMinistry: String,
  officialPortal: String,
  rules: {
    minAge: Number,
    maxAge: Number,
    maxIncome: Number,
    gender: [String],
    occupations: [String],
    categories: [String],
    maxLandHolding: Number,
    bplRequired: Boolean,
    studentRequired: Boolean,
    girlChildRequired: Boolean
  },
  categoryTag: String,
  isCentral: Boolean
}, { timestamps: true });

// Citizen Profile Schema
const CitizenProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  annualIncome: { type: Number, required: true },
  occupation: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  landHoldingHectares: { type: Number, default: 0 },
  hasBplCard: { type: Boolean, default: false },
  isStudent: { type: Boolean, default: false },
  hasGirlChildUnder10: { type: Boolean, default: false }
}, { timestamps: true });

// Audit Logs Schema
const EvaluationAuditSchema = new mongoose.Schema({
  citizenName: String,
  queryTranscript: String,
  matchedSchemesCount: Number,
  timestamp: { type: Date, default: Date.now }
});

export const SchemeModel = mongoose.models.Scheme || mongoose.model('Scheme', SchemeSchema);
export const CitizenProfileModel = mongoose.models.CitizenProfile || mongoose.model('CitizenProfile', CitizenProfileSchema);
export const EvaluationAuditModel = mongoose.models.EvaluationAudit || mongoose.model('EvaluationAudit', EvaluationAuditSchema);
