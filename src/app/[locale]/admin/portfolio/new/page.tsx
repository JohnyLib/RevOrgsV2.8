import { AdminProjectForm } from "@/components/admin/ProjectForm";
import { createClient } from "@/lib/supabase/server";

export default async function NewProjectPage() {
    const supabase = await createClient();
    const { data: technologies } = await supabase.from("technologies").select("id, name").order("name");
    const { data: categories } = await supabase.from("categories").select("id, name").order("name");

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Add New Project</h1>
            <AdminProjectForm
                availableTechnologies={technologies || []}
                availableCategories={categories || []}
            />
        </div>
    );
}
