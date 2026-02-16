import { AdminProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Add New Project</h1>
            <AdminProjectForm />
        </div>
    );
}
