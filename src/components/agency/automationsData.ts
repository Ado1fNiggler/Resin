// ========== AUTOMATION SHOWCASE DATA ==========

export type Category = 'ai' | 'email' | 'crm' | 'ecommerce' | 'social' | 'support' | 'documents' | 'data';

export type Automation = {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  icons: { name: string; color: string }[];
  problem: string;
  solution: string;
  howItWorks: string[];
  impact: string[];
  diagramImage: string;
  nodes: string[];
  templateUrl?: string;
};

export const CATEGORY_META: Record<Category | 'all', { label: string; color: string }> = {
  all:       { label: 'All',          color: '#ffffff' },
  ai:        { label: 'AI',           color: '#a78bfa' },
  email:     { label: 'Email',        color: '#f97316' },
  crm:       { label: 'CRM & Sales',  color: '#22d3ee' },
  ecommerce: { label: 'E-Commerce',   color: '#34d399' },
  social:    { label: 'Social Media',  color: '#f472b6' },
  support:   { label: 'Support',      color: '#fbbf24' },
  documents: { label: 'Documents',    color: '#60a5fa' },
  data:      { label: 'Data & Sync',  color: '#c084fc' },
};

// Icon color map (reused from TechStackSection)
export const SERVICE_COLORS: Record<string, string> = {
  'Gmail':         '#EA4335',
  'OpenAI':        '#10A37F',
  'Anthropic':     '#D4A27F',
  'Claude':        '#D4A27F',
  'Google Sheets': '#34A853',
  'Google Drive':  '#4285F4',
  'Gemini':        '#886FBF',
  'Mistral':       '#FF7000',
  'Slack':         '#4A154B',
  'HubSpot':       '#FF7A59',
  'Clearbit':      '#3576DF',
  'Webhook':       '#6366f1',
  'Notion':        '#ffffff',
  'LinkedIn':      '#0A66C2',
  'Twitter':       '#1DA1F2',
  'Instagram':     '#E4405F',
  'Telegram':      '#26A5E4',
  'Zendesk':       '#03363D',
  'AI Agent':      '#a78bfa',
  'Vector Store':  '#f472b6',
  'Shopify':       '#96BF48',
  'WooCommerce':   '#96588A',
  'Reddit':        '#FF4500',
  'Stripe':        '#635BFF',
  'n8n':           '#EA4B71',
  'Switch':        '#f59e0b',
  'Function':      '#8b5cf6',
  'Schedule':      '#06b6d4',
  'HTTP Request':  '#6366f1',
  'Pinecone':      '#000000',
  'Qdrant':        '#DC382D',
  'SendGrid':      '#1A82E2',
  'Facebook':      '#1877F2',
};

export const AUTOMATIONS: Automation[] = [
  // ===== 1. AI Email Triage =====
  {
    id: 'email-triage',
    title: 'AI Email Triage & Smart Auto-Reply',
    subtitle: 'Classify, label, and auto-respond to emails using AI',
    category: 'email',
    icons: [
      { name: 'Gmail', color: SERVICE_COLORS['Gmail'] },
      { name: 'AI Agent', color: SERVICE_COLORS['AI Agent'] },
      { name: 'Google Sheets', color: SERVICE_COLORS['Google Sheets'] },
      { name: 'Slack', color: SERVICE_COLORS['Slack'] },
    ],
    problem:
      'Agencies and businesses receive dozens of emails daily — partnership inquiries, client requests, spam, newsletters. Manually reading, labeling, and replying drains hours of productive time and causes slow lead response, often resulting in missed high-value opportunities.',
    solution:
      'An intelligent n8n workflow that monitors your inbox in real-time, uses AI to classify every incoming email, automatically applies color-coded labels, drafts personalized replies for high-priority leads, and logs all interactions to a tracking spreadsheet — all without human intervention.',
    howItWorks: [
      '`Gmail Trigger` polls for new incoming emails every 60 seconds',
      '`AI Agent` (Claude or GPT-4o) analyzes the email body, sender, and subject line',
      '`Switch` node routes emails by classification: Lead, Support, Partnership, Newsletter, or Spam',
      '`Gmail` node applies color-coded labels automatically to each category',
      'For leads, a second `AI Agent` drafts a personalized reply matching your brand tone',
      '`Gmail Send` dispatches the auto-reply within minutes of receipt',
      '`Google Sheets` logs every email with classification, timestamp, and action taken',
      '`Slack` notification alerts the team when a high-value lead arrives',
    ],
    impact: [
      '80% reduction in email processing time',
      'Sub-minute response time for new leads',
      'Zero missed high-value inquiries',
      'Complete audit trail in Google Sheets',
    ],
    diagramImage: '/automations/email-triage.png',
    nodes: ['Gmail Trigger', 'AI Agent', 'Switch', 'Gmail', 'Google Sheets', 'Slack'],
    templateUrl: 'https://n8n.io/workflows/4722-gmail-ai-email-manager/',
  },

  // ===== 2. Invoice & Document OCR =====
  {
    id: 'document-ocr',
    title: 'Invoice & Document OCR Processing',
    subtitle: 'Extract structured data from PDFs and scanned documents automatically',
    category: 'documents',
    icons: [
      { name: 'Google Drive', color: SERVICE_COLORS['Google Drive'] },
      { name: 'Gemini', color: SERVICE_COLORS['Gemini'] },
      { name: 'Google Sheets', color: SERVICE_COLORS['Google Sheets'] },
      { name: 'Slack', color: SERVICE_COLORS['Slack'] },
    ],
    problem:
      'Businesses receive invoices, contracts, and receipts as PDFs and scanned images. Manually extracting data — amounts, dates, vendor names, line items — and entering it into spreadsheets or accounting systems is tedious, slow, and error-prone.',
    solution:
      'An automated n8n pipeline that watches your Google Drive for new uploads, extracts text using OCR, parses it into structured fields with AI, writes the data to Google Sheets, and notifies your finance team — reducing 15+ minutes of manual work per document to under 30 seconds.',
    howItWorks: [
      '`Google Drive Trigger` watches a designated folder for new file uploads (PDF, image)',
      '`Mistral OCR` or `Google Gemini` extracts raw text content from the document',
      '`AI Agent` (Gemini or GPT-4) parses extracted text into structured fields: invoice number, date, vendor, line items, total amount',
      '`Function` node validates and normalizes the data (date formats, currency conversion)',
      '`Google Sheets` receives the structured data in a clean spreadsheet row',
      '`Slack` notification alerts the finance team of each newly processed document',
      'Error handling: malformed documents are flagged for manual review',
    ],
    impact: [
      'Document processing drops from 15+ minutes to under 30 seconds',
      'Eliminates manual data entry errors entirely',
      'Complete searchable archive in Google Sheets',
      'Finance team only handles exceptions',
    ],
    diagramImage: '/automations/document-ocr.png',
    nodes: ['Google Drive Trigger', 'Mistral OCR', 'AI Agent', 'Function', 'Google Sheets', 'Slack'],
    templateUrl: 'https://n8n.io/workflows/4868-extract-invoice-data-from-google-drive-to-sheets-with-mistral-ocr-and-gemini/',
  },

  // ===== 3. RAG Knowledge Base Chatbot =====
  {
    id: 'rag-chatbot',
    title: 'RAG Knowledge Base Chatbot',
    subtitle: 'AI chatbot that answers questions from your own company documents',
    category: 'ai',
    icons: [
      { name: 'Google Drive', color: SERVICE_COLORS['Google Drive'] },
      { name: 'AI Agent', color: SERVICE_COLORS['AI Agent'] },
      { name: 'Vector Store', color: SERVICE_COLORS['Vector Store'] },
      { name: 'Webhook', color: SERVICE_COLORS['Webhook'] },
    ],
    problem:
      'Clients and internal team members ask the same questions repeatedly about company processes, project documentation, or service offerings. Support staff spend hours answering routine questions that are already documented somewhere.',
    solution:
      'A Retrieval-Augmented Generation (RAG) chatbot built with n8n that indexes your company documents, embeds them in a vector database, and provides instant, accurate answers grounded in your actual content — available 24/7 via a chat widget or messaging platform.',
    howItWorks: [
      '`Google Drive Trigger` detects new or updated documents in your knowledge base folder',
      '`Document Loader` extracts text content from PDFs, Docs, and Sheets',
      '`Text Splitter` chunks documents into optimal-size passages for retrieval',
      '`Embeddings` node (OpenAI or Gemini) converts chunks into vector representations',
      '`Vector Store` (Pinecone or Qdrant) indexes the embeddings for fast similarity search',
      '`Webhook` receives user questions from a chat widget or API endpoint',
      '`AI Chat Agent` retrieves relevant document chunks and generates a grounded answer',
      'Optional: `Cohere Reranker` improves retrieval accuracy for complex queries',
    ],
    impact: [
      'Instant, accurate answers to client and team questions 24/7',
      '70% reduction in repetitive support inquiries',
      'Answers are grounded in actual company documents — no hallucinations',
      'Demonstrates cutting-edge AI capability as a sellable service',
    ],
    diagramImage: '/automations/rag-chatbot.png',
    nodes: ['Google Drive Trigger', 'Document Loader', 'Text Splitter', 'Embeddings', 'Vector Store', 'AI Chat Agent', 'Webhook'],
    templateUrl: 'https://n8n.io/workflows/2753-rag-chatbot-for-company-documents-using-google-drive-and-gemini/',
  },

  // ===== 4. Lead Scoring & CRM =====
  {
    id: 'lead-scoring',
    title: 'Lead Scoring & CRM Auto-Qualification',
    subtitle: 'Automatically score, qualify, and route leads to the right sales rep',
    category: 'crm',
    icons: [
      { name: 'Webhook', color: SERVICE_COLORS['Webhook'] },
      { name: 'HubSpot', color: SERVICE_COLORS['HubSpot'] },
      { name: 'Clearbit', color: SERVICE_COLORS['Clearbit'] },
      { name: 'Slack', color: SERVICE_COLORS['Slack'] },
    ],
    problem:
      'Not all leads are equal. Without automated scoring, sales teams waste time on low-quality prospects while high-value leads wait. Manual qualification is inconsistent, slow, and scales poorly as lead volume grows.',
    solution:
      'An n8n workflow that captures leads from web forms, enriches them with company data, applies a weighted scoring model, and automatically routes hot leads to senior reps via Slack while nurturing warm leads with email sequences — all synced to HubSpot CRM in real time.',
    howItWorks: [
      '`Webhook` captures new leads from website forms or landing pages',
      '`Function` node validates and normalizes the incoming lead data',
      '`HTTP Request` to Clearbit/Apollo enriches with company size, industry, and funding data',
      '`Function` node applies weighted scoring: company size (+15pts), target industry (+20pts), C-level title (+20pts), engagement signals (+15pts)',
      '`Switch` routes by score: Hot leads (75+) to senior reps, Warm (40-74) to nurture sequence, Cold (<40) to marketing',
      '`Slack` sends instant notification for hot leads with full context',
      '`HubSpot` creates or updates the deal record with score and enrichment data',
      '`Gmail` initiates personalized nurture sequences for warm leads',
    ],
    impact: [
      '2-3x increase in lead conversion rates',
      'Lead response time drops from hours to minutes',
      'Sales team focuses only on qualified prospects',
      'Complete lead history in HubSpot CRM',
    ],
    diagramImage: '/automations/lead-scoring.png',
    nodes: ['Webhook', 'Function', 'HTTP Request', 'Switch', 'HubSpot', 'Slack', 'Gmail'],
    templateUrl: 'https://n8n.io/workflows/7343-automated-lead-capture-scoring-and-crm-integration-with-hubspot-clearbit-and-slack/',
  },

  // ===== 5. AI Social Media Content Engine =====
  {
    id: 'social-media',
    title: 'AI Social Media Content Engine',
    subtitle: 'Generate, format, and post content across all platforms automatically',
    category: 'social',
    icons: [
      { name: 'Notion', color: SERVICE_COLORS['Notion'] },
      { name: 'AI Agent', color: SERVICE_COLORS['AI Agent'] },
      { name: 'LinkedIn', color: SERVICE_COLORS['LinkedIn'] },
      { name: 'Instagram', color: SERVICE_COLORS['Instagram'] },
    ],
    problem:
      'Maintaining a consistent social media presence across LinkedIn, Twitter/X, Instagram, and Facebook requires hours of weekly content creation, formatting for each platform, scheduling, and performance tracking. Most teams struggle to keep up.',
    solution:
      'An n8n-powered content engine that pulls ideas from a Notion content queue, uses AI to transform each piece into platform-specific formats (tweet threads, LinkedIn articles, Instagram captions with hashtags), posts them at optimal times, and aggregates engagement analytics into a single dashboard.',
    howItWorks: [
      '`Schedule Trigger` fires at configured posting times (e.g., 9AM and 6PM daily)',
      '`Notion` node fetches the next content piece from the approved content queue',
      '`AI Agent` (Claude or GPT-4) transforms the content into platform-specific formats',
      'Platform-specific formatting: short tweet, LinkedIn article summary, Instagram caption with hashtags, Facebook post',
      '`HTTP Request` nodes post to LinkedIn, Twitter/X, Instagram, and Facebook APIs',
      'A daily analytics workflow pulls engagement metrics (impressions, clicks, shares) from each platform',
      '`Google Sheets` aggregates all metrics into a real-time performance dashboard',
      '`Slack` sends a weekly performance summary to the marketing team',
    ],
    impact: [
      '10+ hours saved per week on manual posting',
      'Consistent posting schedule increases engagement 2-3x',
      'AI maintains brand voice across all platforms',
      'No vendor lock-in (unlike Buffer or Hootsuite)',
    ],
    diagramImage: '/automations/social-media.png',
    nodes: ['Schedule Trigger', 'Notion', 'AI Agent', 'HTTP Request', 'Google Sheets', 'Slack'],
    templateUrl: 'https://n8n.io/workflows/4352-ai-powered-multi-social-media-post-automation-google-trends-and-perplexity-ai/',
  },

  // ===== 6. Multi-Channel Customer Support =====
  {
    id: 'customer-support',
    title: 'Multi-Channel Customer Support Suite',
    subtitle: 'Unify support from email, chat, and social into one AI-powered pipeline',
    category: 'support',
    icons: [
      { name: 'Gmail', color: SERVICE_COLORS['Gmail'] },
      { name: 'Telegram', color: SERVICE_COLORS['Telegram'] },
      { name: 'AI Agent', color: SERVICE_COLORS['AI Agent'] },
      { name: 'Slack', color: SERVICE_COLORS['Slack'] },
    ],
    problem:
      'Support requests arrive from email, web forms, chat widgets, and social media. Without automation, tickets pile up, urgent issues get buried, and response times balloon. Hiring more support staff is expensive and hard to scale.',
    solution:
      'A unified n8n support pipeline that captures requests from all channels, uses AI to classify priority and category, auto-responds to common FAQ questions using a RAG knowledge base, and escalates complex issues to human agents — all with instant acknowledgment and full ticket logging.',
    howItWorks: [
      '`Gmail Trigger`, `Webhook`, and `Telegram` listeners capture requests from all channels into a unified pipeline',
      '`AI Classification` node analyzes each ticket: Billing, Technical, Feature Request, General Inquiry',
      '`Priority Detection` identifies urgent issues and VIP customers automatically',
      '`Switch` nodes route tickets to the right team based on category, priority, and current workload',
      '`AI Agent` checks the knowledge base (via RAG) and auto-responds to common FAQ questions',
      'If the bot fails to resolve after 3 attempts, it escalates to a human agent with full conversation context',
      '`Notion` or `Zendesk` logs all tickets and resolutions for tracking',
      'Instant acknowledgment emails are sent for every new ticket regardless of channel',
    ],
    impact: [
      'Up to 80% reduction in first-response time',
      '70% of routine inquiries resolved automatically by AI',
      'Scales support without additional headcount',
      'Unified view of all support interactions in one place',
    ],
    diagramImage: '/automations/customer-support.png',
    nodes: ['Gmail Trigger', 'Webhook', 'Telegram', 'AI Agent', 'Switch', 'Notion', 'Slack'],
    templateUrl: 'https://n8n.io/workflows/5135-multi-channel-customer-support-automation-suite/',
  },

  // ===== 7. E-Commerce Order & Inventory =====
  {
    id: 'ecommerce-sync',
    title: 'E-Commerce Order & Inventory Sync',
    subtitle: 'Automate order processing, fulfillment alerts, and cross-platform inventory',
    category: 'ecommerce',
    icons: [
      { name: 'Shopify', color: SERVICE_COLORS['Shopify'] },
      { name: 'WooCommerce', color: SERVICE_COLORS['WooCommerce'] },
      { name: 'Slack', color: SERVICE_COLORS['Slack'] },
      { name: 'Google Sheets', color: SERVICE_COLORS['Google Sheets'] },
    ],
    problem:
      'Online stores face repetitive manual tasks: sending order confirmations, updating fulfillment status, monitoring stock levels, and syncing inventory across multiple platforms. Overselling due to stock mismatches hurts revenue and customer trust.',
    solution:
      'A comprehensive n8n automation suite that processes new orders instantly (confirmations, fulfillment notifications, CRM updates), monitors inventory levels with smart alerts, and keeps stock counts synchronized across Shopify and WooCommerce in real time.',
    howItWorks: [
      '`Shopify Webhook` triggers on every new order placement',
      '`Gmail/SendGrid` sends a professional order confirmation email to the customer',
      '`Slack` notifies the fulfillment team with order details and priority level',
      'When marked fulfilled, a personalized email with tracking link is sent automatically',
      '`Schedule Trigger` runs daily inventory checks across all product SKUs',
      '`Function` node identifies products below the restock threshold (e.g., 10 units)',
      '`Slack` and `Gmail` fire low-stock alerts to the purchasing team',
      '`HTTP Request` syncs inventory counts between Shopify and WooCommerce using SKU matching',
    ],
    impact: [
      '98% reduction in overselling incidents',
      '5+ hours saved per week on manual inventory management',
      'Customers receive instant order updates at every stage',
      '~$15/mo self-hosted vs $189/mo equivalent on Zapier',
    ],
    diagramImage: '/automations/ecommerce-sync.png',
    nodes: ['Shopify Trigger', 'Gmail', 'SendGrid', 'Slack', 'Schedule Trigger', 'Function', 'HTTP Request', 'Google Sheets'],
    templateUrl: 'https://n8n.io/workflows/7518-automate-e-commerce-order-processing-with-email-notifications-and-webhooks/',
  },

  // ===== 8. Brand Sentiment & Social Listening =====
  {
    id: 'sentiment-analysis',
    title: 'Brand Sentiment & Social Listening',
    subtitle: 'Monitor brand mentions across social platforms with AI sentiment analysis',
    category: 'ai',
    icons: [
      { name: 'Twitter', color: SERVICE_COLORS['Twitter'] },
      { name: 'Reddit', color: SERVICE_COLORS['Reddit'] },
      { name: 'AI Agent', color: SERVICE_COLORS['AI Agent'] },
      { name: 'Google Sheets', color: SERVICE_COLORS['Google Sheets'] },
    ],
    problem:
      'Brands need to know what people are saying about them online. Manual monitoring of Twitter, Reddit, LinkedIn, and review sites is impossible at scale. Negative mentions can escalate into crises within hours if not caught early.',
    solution:
      'An n8n social listening workflow that continuously monitors brand mentions across major platforms, uses AI to classify sentiment (positive, neutral, negative) with confidence scores, triggers instant alerts for negative mentions, and compiles everything into a real-time brand health dashboard.',
    howItWorks: [
      '`Schedule Trigger` runs at regular intervals (every 15 minutes or hourly)',
      '`HTTP Request` nodes fetch recent mentions from Twitter API, Reddit API, and LinkedIn',
      '`Function` node deduplicates and normalizes mention data across platforms',
      '`AI Sentiment Analysis` (GPT-4 with temperature 0) classifies each mention with confidence scores',
      'Negative mentions above a severity threshold trigger immediate `Slack` alerts to the communications team',
      '`Google Sheets` logs all mentions with sentiment, platform, reach, and timestamp',
      'A weekly `Schedule Trigger` generates a brand health summary report',
      '`Gmail` auto-sends the weekly report to stakeholders with trends and highlights',
    ],
    impact: [
      'Detect negative mentions within minutes, not days',
      'Data-driven brand health monitoring dashboard',
      'Prevent PR crises through early detection',
      'Sellable as a service to clients',
    ],
    diagramImage: '/automations/sentiment-analysis.png',
    nodes: ['Schedule Trigger', 'HTTP Request', 'Function', 'AI Agent', 'Google Sheets', 'Slack', 'Gmail'],
    templateUrl: 'https://n8n.io/workflows/6430-social-media-sentiment-analysis-dashboard-with-custom-ai-for-twitter-reddit-and-linkedin/',
  },
];
