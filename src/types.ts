export interface Project {
    id: string;
    created_at: string;

    // Core (New Schema)
    title: string;
    slug: string;
    short_description: string | null;
    full_description: string | null;
    cover_image: string | null;

    // Legacy mapping / UI fields
    name: string; // mapped from title
    description: string | null; // mapped from short_description
    image_url: string | null; // mapped from cover_image

    tech_stack: string[] | null;
    repo_url: string | null;
    demo_url: string | null;
    company_name: string | null; // client_name from DB
    price: string | null; // metrics? or kept as specific field if added to DB, schema didn't have price but had metrics jsonb. I'll map from metrics if possible or just null.

    // UI/Derived fields (ProjectList)
    filename?: string;
    status?: string;
    language?: string | null;
    framework?: string | null;
    performance?: number;
    size?: string;
    catCommand?: string;
}

export interface ManifestoItem {
    id: string;
    commitHash: string;
    branch: string;
    date: string;
    title: string;
    description: string;
    tags: string[];
    color: 'blue' | 'purple' | 'green' | 'orange';
}

export interface Service {
    id: string;
    code: string;
    title: string;
    description: string;
    tags: string[];
    color: 'blue' | 'purple' | 'green';
}

export interface ContactFormData {
    email: string;
    message: string;
}
