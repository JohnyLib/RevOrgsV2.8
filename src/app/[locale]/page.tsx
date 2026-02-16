import React from "react";
import Image from "next/image";
import { Terminal, Info, Braces, MessageSquare, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { TerminalWindow } from "@/components/TerminalWindow";
import { Header } from "@/components/Header";
import { ContactForm } from "@/components/ContactForm";
import PricingCalculator from "@/components/PricingCalculator";
import { Link } from "@/i18n/routing";
import { getServices } from "@/app/actions/services";
import { getTranslations } from 'next-intl/server';
import { getAllProjectSlugs } from "@/app/actions/projects";

// Client component for typing effect to keep mostly server-side
import { HeroTyper } from "@/components/HeroTyper";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Hero' });
  const tCommon = await getTranslations({ locale, namespace: 'Common' });

  // Fetch dynamic data
  // Note: Actions might need to be updated to support locale if content is localized in DB
  const services = await getServices();
  const projects = await getAllProjectSlugs();
  const projectCount = projects ? projects.length : 0;

  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 relative z-10">
          {/* Hero Background Image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] -z-10 opacity-30 dark:opacity-40 pointer-events-none">
            <Image
              src="/hero-abstract.svg"
              alt="Abstract Tech Background"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="inline-block relative">
            <HeroTyper />
            <p className="text-xs md:text-sm text-gray-500 mt-2 uppercase tracking-widest">
              {t('subtitle')}
            </p>
          </div>

          <div
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed animate-fade-in-up"
          >
            <span className="text-code-blue">const</span> mission ={" "}
            <span className="text-code-green">
              &quot;{t('title')}&quot;
            </span>
            ;
          </div>

          <div className="mt-8 animate-fade-in-up delay-200">
            <Link href="/#contact" className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-black dark:bg-white dark:text-black border border-transparent rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 ease-in-out">
              <span className="mr-2">{tCommon('getStarted')}</span>
              <Terminal
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* About Section */}
        <section
          id="about"
          className="py-20 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Info size={24} className="text-code-purple" />
              README.md
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-gray-200 dark:from-gray-800 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="prose dark:prose-invert max-w-none font-mono text-sm md:text-base leading-relaxed order-2 lg:order-1">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                ## About Us
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                At RevOrgs, we are more than just coders; we are architects of the
                digital web. Based in Eastern Europe, we have established ourselves
                as a premier source for{" "}
                <strong>Moldova web development</strong>. Our team understands that
                modern businesses require robust, scalable, and fast digital
                solutions.
              </p>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                We pride ourselves on being{" "}
                <strong>SPA experts</strong> (Single Page Application), crafting
                seamless user journeys that feel like native apps. Whether you need
                a dashboard, a complex e-commerce platform, or a corporate portal,
                our proficiency ensures top-tier performance.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                As dedicated{" "}
                <strong>Next.js specialists</strong>, we leverage server-side
                rendering and static site generation to boost your SEO and load
                times. Our commitment to clean code and modern architecture makes
                us the ideal partner for your next ambitious project.
              </p>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3]">
                <Image
                  src="/about-illustration.svg"
                  alt="RevOrgs Team Collaboration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section (Dynamic) */}
        <section
          id="services"
          className="py-20 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Braces size={24} className="text-code-blue" />
                Services.json
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-gray-200 dark:from-gray-800 to-transparent"></div>
            </div>
            <Link href="/services" className="text-sm text-code-blue hover:underline hidden md:block">
              View All Services
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.length > 0 ? (
              services.slice(0, 3).map((service, index) => (
                <Link href={`/services/${service.slug}`} key={service.id} className="block group p-6 border border-gray-200 dark:border-gray-800 rounded hover:border-code-blue transition-all bg-white dark:bg-terminal-black hover:shadow-lg dark:hover:shadow-neon-blue">
                  <div className={`mb-4 text-sm font-bold ${index === 0 ? 'text-code-purple' : index === 1 ? 'text-code-blue' : 'text-code-green'}`}>
                    {"// 0" + (index + 1)}
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {`<${service.title.replace(/\s+/g, '')} />`}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {service.short_description || "Premium digital service."}
                  </p>
                  <div className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">
                    {tCommon('learnMore')} <ArrowRight size={12} className="ml-1" />
                  </div>
                </Link>
              ))
            ) : (
              // Fallback if no services in DB
              [
                { id: 1, title: "WebDevelopment", desc: "Full-stack solutions using modern frameworks.", color: "text-code-purple" },
                { id: 2, title: "UI_UX_Design", desc: "User-centric interfaces that convert.", color: "text-code-blue" },
                { id: 3, title: "Consulting", desc: "Technical strategy and advisory.", color: "text-code-green" }
              ].map((s, i) => (
                <div key={s.id} className="group p-6 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-terminal-black opacity-60">
                  <div className={`${s.color} mb-4 text-sm`}>{"// 0" + (i + 1)}</div>
                  <h3 className="text-xl font-bold mb-3">{`<${s.title} />`}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-4 text-xs text-red-400 italic">Database empty. Populate 'services' table.</div>
                </div>
              ))
            )}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/services" className="text-sm text-code-blue hover:underline">
              View All Services
            </Link>
          </div>
        </section>

        {/* Pricing Calculator Section */}
        <div id="pricing">
          <PricingCalculator />
        </div>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="py-20 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <MessageSquare size={24} className="text-code-green" />
              Client_Feedback
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-gray-200 dark:from-gray-800 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded border-l-4 border-code-blue font-mono text-sm">
              <div className="text-gray-900 dark:text-white mt-2 font-bold">
                {"const client = \"Alexei V.\"; "}
                <span className="text-gray-500">{"// CEO, TechMoldova"}</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded border-l-4 border-code-green font-mono text-sm">
              <div className="text-gray-900 dark:text-white mt-2 font-bold">
                {"const client = \"Maria D.\"; "}
                <span className="text-gray-500">
                  {"// Marketing Lead, ShopSmart"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-gray-200 dark:border-gray-800 my-12 bg-gray-50 dark:bg-gray-900/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: `${projectCount}+`, label: "<Projects />" },
              { val: "100%", label: "<Uptime />" },
              { val: "24/7", label: "<Support />" },
              { val: "MD", label: "<Location />" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.val}
                </div>
                <h3 className="text-xs text-gray-500 mt-1 uppercase">
                  {stat.label}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 max-w-3xl mx-auto w-full">
          <TerminalWindow title="contact_form.exe">
            <div className="mb-6 text-gray-500 dark:text-gray-400 text-sm">
              <p>
                Last login:{" "}
                <span className="text-code-blue">
                  {new Date().toDateString()}
                </span>{" "}
                on ttys000
              </p>
              <p>
                RevOrgs:~/contact ${" "}
                <span className="text-gray-900 dark:text-white">
                  ./initiate_conversation.sh
                </span>
              </p>
            </div>
            <ContactForm />
          </TerminalWindow>
        </section>
      </main>

      {/* Tech Stack Marquee */}
      <div
        id="tech"
        className="w-full bg-gray-100 dark:bg-terminal-black border-y border-gray-200 dark:border-gray-800 overflow-hidden py-6"
      >
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex space-x-12 px-4 group-hover:[animation-play-state:paused]">
            {/* Static marquee content */}
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-xl font-mono text-gray-500 dark:text-gray-400 font-bold flex items-center gap-2">
                  <span className="text-code-blue">import</span> React{" "}
                  <span className="text-code-gray">from</span>{" "}
                  &apos;react&apos;;
                </span>
                <span className="text-xl font-mono text-gray-500 dark:text-gray-400 font-bold flex items-center gap-2">
                  <span className="text-code-green">import</span> Vue{" "}
                  <span className="text-code-gray">from</span>{" "}
                  &apos;vue&apos;;
                </span>
                <span className="text-xl font-mono text-gray-500 dark:text-gray-400 font-bold flex items-center gap-2">
                  <span className="text-code-purple">require</span>
                  (&apos;node.js&apos;);
                </span>
                <span className="text-xl font-mono text-gray-500 dark:text-gray-400 font-bold flex items-center gap-2">
                  <span className="text-yellow-500">import</span> python;
                </span>
                <span className="text-xl font-mono text-gray-500 dark:text-gray-400 font-bold flex items-center gap-2">
                  <span className="text-code-blue">import</span>{" "}
                  {"{ Next }"}{" "}
                  <span className="text-code-gray">from</span>{" "}
                  &apos;next&apos;;
                </span>
                <span className="text-xl font-mono text-gray-500 dark:text-gray-400 font-bold flex items-center gap-2">
                  <span className="text-code-green">use</span> Tailwind;
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div >
  );
}
