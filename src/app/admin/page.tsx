import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut, LayoutDashboard, MessageSquare, FolderGit2 } from "lucide-react";
import Image from "next/image";

export default async function AdminPage() {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch Stats
    const { count: projectsCount } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

    const { count: contactsCount } = await supabase
        .from("contacts")
        .select("*", { count: "exact", head: true });

    // Fetch Data
    const { data: contacts } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

    const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-mono">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-terminal-black border-r border-gray-200 dark:border-gray-800 z-50 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                        Admin<span className="text-code-green">_</span>
                    </span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-code-green bg-code-green/10 rounded-sm">
                        <LayoutDashboard size={18} />
                        Dashboard
                    </a>
                    <a href="#orders" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm transition-colors">
                        <MessageSquare size={18} />
                        Orders / Contacts
                    </a>
                    <a href="#projects" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm transition-colors">
                        <FolderGit2 size={18} />
                        Projects
                    </a>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                        {/* Avatar placeholder */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-code-blue to-code-purple flex items-center justify-center text-xs text-white font-bold">
                            {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{user.email}</p>
                            <p className="text-[10px] text-gray-500 truncate">Administrator</p>
                        </div>
                    </div>
                    <form action="/auth/signout" method="post">
                        <button className="flex items-center gap-2 text-xs text-red-500 hover:text-red-600 transition-colors w-full">
                            <LogOut size={14} />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h1>
                    <p className="text-sm text-gray-500">Welcome back, {user.email}</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white dark:bg-terminal-black p-6 rounded-sm border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                            <MessageSquare size={16} className="text-code-blue" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{contactsCount || 0}</div>
                    </div>
                    <div className="bg-white dark:bg-terminal-black p-6 rounded-sm border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
                            <FolderGit2 size={16} className="text-code-green" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{projectsCount || 0}</div>
                    </div>
                </div>

                {/* Recent Orders */}
                <section id="orders" className="mb-12">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <MessageSquare size={18} className="text-code-blue" />
                        Recent Orders
                    </h2>
                    <div className="bg-white dark:bg-terminal-black border border-gray-200 dark:border-gray-800 rounded-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                                    <tr>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Message</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts?.map((contact) => (
                                        <tr key={contact.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                                                {contact.email}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400 max-w-md truncate">
                                                {contact.message}
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 dark:text-gray-500 text-xs">
                                                {new Date(contact.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 text-[10px] font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                                                    New
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!contacts || contacts.length === 0) && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                                No messages found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Active Projects */}
                <section id="projects">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <FolderGit2 size={18} className="text-code-green" />
                        Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects?.map((project) => (
                            <div key={project.id} className="group bg-white dark:bg-terminal-black border border-gray-200 dark:border-gray-800 rounded-sm p-4 hover:border-code-green transition-colors">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="font-bold text-gray-900 dark:text-white">{project.name}</div>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 border border-gray-200 dark:border-gray-800 px-2 py-0.5 rounded-sm">
                                        {project.status}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8">
                                    {project.description}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <div className="text-[10px] text-gray-400 font-mono">
                                        {project.language}
                                    </div>
                                    <button className="text-xs text-code-blue hover:underline">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}
