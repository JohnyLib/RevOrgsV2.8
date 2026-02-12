export interface Project {
    id: string;
    created_at: string;
    name: string;
    description: string | null;
    image_url: string | null;
    tech_stack: string[] | null; // Frameworks
    repo_url: string | null;     // GitRepo
    demo_url: string | null;     // Link
    company_name: string | null; // Company Name
    price: string | null;        // Price
    status?: string;
    language?: string | null;
    framework?: string | null;

    // UI/Derived fields (ProjectList)
    filename?: string;
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
