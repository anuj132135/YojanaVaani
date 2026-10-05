import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectMongoDB, SchemeModel, CitizenProfileModel, EvaluationAuditModel } from './db.js';
import { INITIAL_SCHEMES } from './initialSchemes.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let isMongoConnected = false;

// Initialize connection and seed initial schemes if needed
async function initializeServer() {
  isMongoConnected = await connectMongoDB();

  if (isMongoConnected) {
    try {
      const count = await SchemeModel.countDocuments();
      if (count === 0) {
        console.log('🌱 Seeding 10 authentic schemes into MongoDB database...');
        await SchemeModel.insertMany(INITIAL_SCHEMES);
        console.log('✅ Seeding complete!');
      }
    } catch (err) {
      console.warn('Failed to seed MongoDB:', err.message);
    }
  }
}

initializeServer();

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'YojanaVaani MongoDB REST API',
    mongoConnected: isMongoConnected,
    dbState: mongoose.connection.readyState === 1 ? 'Connected' : 'Offline/Fallback Cache'
  });
});

// GET /api/schemes - Fetch schemes from MongoDB
app.get('/api/schemes', async (req, res) => {
  if (isMongoConnected && mongoose.connection.readyState === 1) {
    try {
      const dbSchemes = await SchemeModel.find({}).lean();
      return res.json({ source: 'mongodb', data: dbSchemes });
    } catch (err) {
      console.error('MongoDB Read Error:', err);
    }
  }
  // Fallback
  res.json({ source: 'local_fallback', data: INITIAL_SCHEMES });
});

// POST /api/schemes - Add new scheme to MongoDB (Admin CMS)
app.post('/api/schemes', async (req, res) => {
  const schemeData = req.body;
  if (!schemeData.id || !schemeData.name) {
    return res.status(400).json({ error: 'Invalid scheme payload' });
  }

  if (isMongoConnected && mongoose.connection.readyState === 1) {
    try {
      const saved = await SchemeModel.findOneAndUpdate(
        { id: schemeData.id },
        schemeData,
        { upsert: true, new: true }
      );
      return res.json({ success: true, source: 'mongodb', data: saved });
    } catch (err) {
      console.error('MongoDB Insert Error:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  res.json({ success: true, source: 'local_fallback', data: schemeData });
});

// POST /api/audits - Save evaluation log to MongoDB
app.post('/api/audits', async (req, res) => {
  const { citizenName, queryTranscript, matchedSchemesCount } = req.body;

  if (isMongoConnected && mongoose.connection.readyState === 1) {
    try {
      const audit = await EvaluationAuditModel.create({
        citizenName: citizenName || 'Anonymous',
        queryTranscript: queryTranscript || 'Voice Search',
        matchedSchemesCount: matchedSchemesCount || 0
      });
      return res.json({ success: true, source: 'mongodb', auditId: audit._id });
    } catch (err) {
      console.error('MongoDB Audit Error:', err);
    }
  }

  res.json({ success: true, source: 'local_fallback' });
});

app.listen(PORT, () => {
  console.log(`🚀 YojanaVaani Express Server running on http://localhost:${PORT}`);
});
