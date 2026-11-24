import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LEADS_FILE = path.join(__dirname, 'data', 'leads.json');
const APPLICATIONS_FILE = path.join(__dirname, 'data', 'applications.json');

const app = express();
const PORT = process.env.PORT || 5100;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Techno@Admin123';
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'change-this-secret';

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

async function readCollection(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeCollection(filePath, records) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(records, null, 2), 'utf8');
}

function clean(value, maxLength = 5000) {
  return String(value || '').trim().slice(0, maxLength);
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function createToken() {
  const ts = Date.now().toString();
  const sig = crypto.createHmac('sha256', ADMIN_TOKEN_SECRET).update(ts).digest('hex');
  return `${ts}.${sig}`;
}

function verifyToken(token) {
  if (!token || !token.includes('.')) return false;
  const [ts, sig] = token.split('.');
  if (!ts || !sig) return false;
  const expected = crypto.createHmac('sha256', ADMIN_TOKEN_SECRET).update(ts).digest('hex');
  try {
    const ok = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    if (!ok) return false;
    // 7 day expiry
    return Date.now() - Number(ts) < 7 * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!verifyToken(token)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, phone, company, service, message, source } = req.body || {};
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'Name, email, phone, and message are required.' });
    }
    const leads = await readCollection(LEADS_FILE);
    const lead = {
      id: crypto.randomUUID(),
      name: clean(name, 160),
      email: clean(email, 240),
      phone: clean(phone, 80),
      company: clean(company, 240),
      service: clean(service || 'General Inquiry', 240),
      message: clean(message),
      source: clean(source || 'website', 120),
      createdAt: new Date().toISOString(),
    };
    leads.unshift(lead);
    await writeCollection(LEADS_FILE, leads);
    res.status(201).json({ ok: true, lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save lead.' });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const {
      jobId,
      jobTitle,
      jobDepartment,
      name,
      email,
      phone,
      location,
      experience,
      noticePeriod,
      resumeLink,
      linkedinUrl,
      portfolioUrl,
      coverLetter,
    } = req.body || {};

    if (!jobId || !jobTitle || !name || !email || !phone || !location || !experience || !noticePeriod || !resumeLink || !coverLetter) {
      return res.status(400).json({ error: 'Please complete all required application fields.' });
    }
    if (!/^\S+@\S+\.\S+$/.test(String(email))) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (!isValidHttpUrl(String(resumeLink))) {
      return res.status(400).json({ error: 'Please provide a valid resume link beginning with http:// or https://.' });
    }
    if (linkedinUrl && !isValidHttpUrl(String(linkedinUrl))) {
      return res.status(400).json({ error: 'Please provide a valid LinkedIn URL.' });
    }
    if (portfolioUrl && !isValidHttpUrl(String(portfolioUrl))) {
      return res.status(400).json({ error: 'Please provide a valid portfolio URL.' });
    }

    const applications = await readCollection(APPLICATIONS_FILE);
    const application = {
      id: crypto.randomUUID(),
      reference: `TE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      jobId: clean(jobId, 160),
      jobTitle: clean(jobTitle, 240),
      jobDepartment: clean(jobDepartment || 'General', 160),
      name: clean(name, 160),
      email: clean(email, 240),
      phone: clean(phone, 80),
      location: clean(location, 240),
      experience: clean(experience, 120),
      noticePeriod: clean(noticePeriod, 120),
      resumeLink: clean(resumeLink, 2000),
      linkedinUrl: clean(linkedinUrl, 2000),
      portfolioUrl: clean(portfolioUrl, 2000),
      coverLetter: clean(coverLetter),
      status: 'New',
      source: 'careers',
      createdAt: new Date().toISOString(),
    };
    applications.unshift(application);
    await writeCollection(APPLICATIONS_FILE, applications);
    res.status(201).json({ ok: true, application: { id: application.id, reference: application.reference } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save your application. Please try again.' });
  }
});

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {};
  if (!password || String(password) !== String(ADMIN_PASSWORD)) {
    return res.status(401).json({ error: 'Invalid password.' });
  }
  res.json({ ok: true, token: createToken() });
});

app.get('/api/admin/leads', requireAdmin, async (_req, res) => {
  try {
    const leads = await readCollection(LEADS_FILE);
    res.json({ leads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load leads.' });
  }
});

app.get('/api/admin/applications', requireAdmin, async (_req, res) => {
  try {
    const applications = await readCollection(APPLICATIONS_FILE);
    res.json({ applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load job applications.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
