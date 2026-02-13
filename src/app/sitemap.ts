import { MetadataRoute } from 'next'
import { getAllProjectSlugs } from '@/app/actions/projects'
import { getAllBlogPostSlugs } from '@/app/actions/blog'
import { getAllServiceSlugs } from '@/app/actions/services'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.revorgs.xyz'
    const locales = ['ro', 'ru'];

    // Static routes
    const staticRoutes = [
        '',
        '/portfolio',
        '/blog',
        '/services',
        '/manifesto',
    ]

    const routes: MetadataRoute.Sitemap = [];

    // Generate static routes for each locale
    staticRoutes.forEach(route => {
        locales.forEach(locale => {
            routes.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: route === '' ? 1 : 0.8,
            })
        })
    })

    // Dynamic routes
    const projects = await getAllProjectSlugs()
    projects.forEach((project) => {
        locales.forEach(locale => {
            routes.push({
                url: `${baseUrl}/${locale}/portfolio/${project.slug}`,
                lastModified: new Date(project.updated_at),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            })
        })
    })

    const posts = await getAllBlogPostSlugs()
    posts.forEach((post) => {
        locales.forEach(locale => {
            routes.push({
                url: `${baseUrl}/${locale}/blog/${post.slug}`,
                lastModified: new Date(post.updated_at),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            })
        })
    })


    const services = await getAllServiceSlugs()
    services.forEach((service) => {
        locales.forEach(locale => {
            routes.push({
                url: `${baseUrl}/${locale}/services/${service.slug}`,
                lastModified: new Date(service.updated_at),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            })
        })
    })

    return routes
}
