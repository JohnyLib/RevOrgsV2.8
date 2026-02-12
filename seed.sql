-- Seed Data for RevOrgs

-- 1. Services
INSERT INTO public.services (title, slug, short_description, full_description, price_from, is_published, is_featured, seo_title, seo_description)
VALUES
('Web Development', 'web-development', 'Full-stack solutions using React, Next.js, and Node.js.', 'We build scalable, high-performance web applications tailored to your business needs.', '$1500', true, true, 'Web Development Services | RevOrgs', 'Expert web development in Moldova using React and Next.js.'),
('UI/UX Design', 'ui-ux-design', 'User-centric interfaces that convert visitors into customers.', 'Our design process focuses on usability, accessibility, and modern aesthetics.', '$800', true, true, 'UI/UX Design Services | RevOrgs', 'Professional UI/UX design services for web and mobile apps.'),
('Technical Consulting', 'consulting', 'Strategic advice to optimize your digital infrastructure.', 'We help you choose the right technology stack and architecture for long-term success.', '$100/hr', true, true, 'IT Consulting | RevOrgs', 'Expert technical consulting for startups and enterprises.');

-- 2. Projects
INSERT INTO public.projects (title, slug, short_description, client_name, year, is_published, is_featured, seo_title, seo_description)
VALUES
('E-Commerce Platform', 'ecommerce-platform', 'A modern online store built with Next.js and Stripe.', 'ShopSmart', 2025, true, true, 'E-Commerce Platform Case Study', 'Building a scalable e-commerce platform with Next.js.'),
('Corporate Dashboard', 'corporate-dashboard', 'Internal analytics dashboard for a logistics company.', 'LogisticsCo', 2024, true, true, 'Corporate Dashboard Case Study', 'Real-time analytics dashboard development.');

-- 3. Blog Posts
INSERT INTO public.posts (title, slug, excerpt, content, reading_time, author_name, is_published, published_at, seo_title)
VALUES
('Why We Choose Next.js', 'why-nextjs', 'Next.js offers superior performance and SEO benefits.', '# Why We Choose Next.js\n\nNext.js is our framework of choice...', 5, 'Johan Libert', true, now(), 'Why We Choose Next.js for Web Development'),
('The Future of Web Development', 'future-web-dev', 'Examining trends in AI and server-side rendering.', '# The Future\n\nWeb development is evolving...', 7, 'Johan Libert', true, now(), 'The Future of Web Development in 2026');
