export type ServiceCategory = 'DEVELOPMENT' | 'TECHNICAL' | 'ADD_ON' | 'SUPPORT';

export interface Service {
    id: string;
    category: ServiceCategory;
    title: string;
    priceEUR: number; // One-time price
    priceMonthlyEUR?: number; // Monthly recurring price
    durationDays: number; // 0 means instant or monthly
    description: string;
    isCore?: boolean;
}

export const EXCHANGE_RATE_EUR_MDL = 19.5;

export const SERVICES: Service[] = [
    // DEVELOPMENT (Single Selection)
    {
        id: 'landing-page',
        category: 'DEVELOPMENT',
        title: 'Landing Page "Fast Start"',
        priceEUR: 150,
        durationDays: 3,
        isCore: true,
        description: '1 page, 5-7 blocks, mobile version, contact form.',
    },
    {
        id: 'corporate-website',
        category: 'DEVELOPMENT',
        title: 'Business Website',
        priceEUR: 250,
        durationDays: 7,
        isCore: true,
        description: 'Up to 5 pages (Home, Services, About, Contacts), admin panel.',
    },

    // TECHNICAL
    {
        id: 'hosting-setup',
        category: 'TECHNICAL',
        title: 'Launch & Hosting',
        priceEUR: 50,
        durationDays: 1,
        description: 'Domain purchase, hosting setup, SSL, corporate email.',
    },

    // ADD_ONS
    {
        id: 'multilingual',
        category: 'ADD_ON',
        title: 'Multilingual (RU/RO)',
        priceEUR: 80,
        durationDays: 2,
        description: 'Language switcher implementation + content addition.',
    },
    {
        id: 'google-maps',
        category: 'ADD_ON',
        title: 'Google Maps Business',
        priceEUR: 40,
        durationDays: 1,
        description: 'Map point registration, verification, design.',
    },
    {
        id: 'logo-express',
        category: 'ADD_ON',
        title: 'Logo (Express)',
        priceEUR: 50,
        durationDays: 2,
        description: 'Text logo + favicon (site icon).',
    },
    {
        id: 'crm-telegram',
        category: 'ADD_ON',
        title: 'CRM/Telegram Integration',
        priceEUR: 30,
        durationDays: 1,
        description: 'Site requests sent directly to Telegram or CRM.',
    },

    // SUPPORT
    {
        id: 'tech-support',
        category: 'SUPPORT',
        title: 'Technical Support',
        priceEUR: 0,
        priceMonthlyEUR: 20,
        durationDays: 0, // Monthly
        description: 'Monitoring, backups, minor edits (text/photo).',
    },
];
