export interface Project {
    id: string;
    filename: string;
    name: string;
    description: string;
    language: string;
    framework: string;
    status: string;
    performance: number;
    size: string;
    url: string;
    imageUrl: string;
    catCommand: string;
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
