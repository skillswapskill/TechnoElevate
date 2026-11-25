export const SITE = {
  name: 'TechnoElevate Private Limited',
  shortName: 'Techno Elevate',
  cin: 'U62011WR2026PTC297773',
  tagline: 'Software development and IT services for growing businesses.',
  description:
    'TechnoElevate Private Limited provides software development, digital marketing, LLM training, data leveling, outsourcing, and corporate contracting services.',
  emails: {
    admin: 'admin@technoelevate.tech',
    skillswap: 'skillswapskill@gmail.com',
  },
  phones: {
    company: '+91 6289949134',
    founder: '+91 7602016395',
  },
  founder: {
    name: 'Anubhab Chowdhury',
    title: 'Founder / Managing Director',
    phone: '+91 7602016395',
  },
  address: 'FLAT NO-14, 2ND FLOOR, MEENA RAM RES, SHIVMANDIR, Kadamtala (Darjiling), Naxalbari, Darjiling- 734011, West Bengal',
  product: {
    name: 'SkillSwap',
    href: 'https://skillswap.company',
  },
};

// Automatically generates a Google Maps search from the full office address above.
export const OFFICE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://technoelevate.tech').replace(/\/$/, '');
// NOTE: on deployments where the environment already sets
// NEXT_PUBLIC_SITE_URL to the previous render domain, update that
// variable to 'https://technoelevate.tech' so the sitemap, robots.txt,
// canonical tags and structured data all use the canonical domain.

export const SERVICES = [
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing Services',
    short: 'Grow your brand with data-driven campaigns, SEO, social media, and performance marketing.',
    description:
      'We create digital marketing strategies that attract the right audience, build trust, and convert attention into measurable business growth.',
    points: ['SEO & content strategy', 'Social media growth', 'Performance campaigns', 'Brand visibility'],
  },
  {
    slug: 'website-building',
    title: 'Website Building Services',
    short: 'Professional websites and web applications engineered for performance, usability, and business growth.',
    description:
      'From business websites to custom web applications, we design and develop secure, responsive digital products around your operational and customer needs.',
    points: ['Responsive websites', 'Web applications', 'Modern UI/UX', 'Performance & SEO'],
  },
  {
    slug: 'llm-training',
    title: 'LLM Training Services',
    short: 'Custom LLM training, fine-tuning, evaluation, and data workflows for practical AI applications.',
    description:
      'We help organizations adapt large language models to their domains through structured training data, fine-tuning, evaluation, and continuous improvement workflows.',
    points: ['Custom model fine-tuning', 'Training data preparation', 'Model evaluation', 'AI workflow optimization'],
  },
  {
    slug: 'data-leveling',
    title: 'Data Leveling Services',
    short: 'Clean, structured, and validated datasets prepared for analytics, software, and AI initiatives.',
    description:
      'We transform inconsistent raw information into reliable, standardized datasets through cleansing, normalization, structuring, and quality validation.',
    points: ['Data cleansing & normalization', 'Structured data preparation', 'Quality validation', 'AI-ready datasets'],
  },
  {
    slug: 'outsourcing',
    title: 'Outsourcing Services',
    short: 'Reliable technology and execution support so you can scale without unnecessary operational overhead.',
    description:
      'We help you extend your team with dependable software and digital operations support, letting you focus on core business priorities while we handle delivery.',
    points: ['Flexible team support', 'Software delivery support', 'Operational efficiency', 'Scalable engagement'],
  },
  {
    slug: 'corporate-contracting',
    title: 'Corporate Contracting Services',
    short: 'Structured corporate engagements for software, digital, and technology delivery requirements.',
    description:
      'We support organizations with clear, accountable corporate contracting for technology projects, digital operations, and specialized service requirements.',
    points: ['Corporate project engagements', 'Delivery governance', 'Flexible contractual support', 'Accountable execution'],
  },
];

export const API_BNAME = process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:5100' : '');
export const API_BASE = API_BNAME.replace(/\/$/, '');
