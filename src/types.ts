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
    status?: string; // Optional if not in DB schema yet, but used in form
    language?: string; // from form state, check if in DB?
}
