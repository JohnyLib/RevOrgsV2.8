import { MetadataRoute } from 'next'
import { getAllProjectSlugs } from '@/app/actions/projects'
import { getAllBlogPostSlugs } from '@/app/actions/blog'
import { getAllServiceSlugs } from '@/app/actions/services'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.revorgs.xyz'

    // Static routes
    const routes = [
        '',
        '/portfolio',
        '/blog',
        '/services',
        '/manifesto',
        '/contact', // Assuming contact section/page exists
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes
    const projects = await getAllProjectSlugs()
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/portfolio/${project.slug}`,
        lastModified: new Date(project.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const posts = await getAllBlogPostSlugs()
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const services = await getAllServiceSlugs()
    const serviceRoutes = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(service.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    return [...routes, ...projectRoutes, ...blogRoutes, ...serviceRoutes]
}
