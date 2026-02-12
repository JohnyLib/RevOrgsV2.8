"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Info, Braces, MessageSquare } from "lucide-react";
import { Footer } from "@/components/Footer";
import { TerminalWindow } from "@/components/TerminalWindow";
import { Header } from "@/components/Header";
import { ContactForm } from "@/components/ContactForm";

// TODO: Replace with Supabase fetch — `supabase.from('contacts').insert({...})`

export default function HomePage() {
  const [typingText, setTypingText] = useState("");
  const fullText = "RevOrgs";

  useEffect(() => {
    // Check for auth code in URL (Google OAuth redirect might have landed here)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code) {
        // Redirect to callback route to complete auth
        window.location.href = `/auth/callback${window.location.search}`;
      }
    }
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
          <div className="inline-block relative">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-2">
              <span className="text-gray-400 dark:text-gray-600">
                &lt;
              </span>
              {typingText}
              <span className="animate-blink">|</span>
              <span className="text-gray-400 dark:text-gray-600">
                {" "}
                /&gt;
              </span>
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-2 uppercase tracking-widest">
              Moldovan Web Agency
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            <span className="text-code-blue">const</span> mission ={" "}
            <span className="text-code-green">
              &quot;Crafting digital experiences with precision.&quot;
            </span>
            ;
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8"
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-black dark:bg-white dark:text-black border border-transparent rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 ease-in-out"
            >
              <span className="mr-2">Start Project</span>
              <Terminal
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>
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
          <div className="prose dark:prose-invert max-w-none font-mono text-sm md:text-base leading-relaxed">
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
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-20 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Braces size={24} className="text-code-blue" />
              Services.json
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-gray-200 dark:from-gray-800 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="group p-6 border border-gray-200 dark:border-gray-800 rounded hover:border-gray-400 dark:hover:border-gray-600 transition-all bg-white dark:bg-terminal-black hover:shadow-lg dark:hover:shadow-neon-blue"
            >
              <div className="text-code-purple mb-4 text-sm">// 01</div>
              <h3 className="text-xl font-bold mb-3">
                {"<WebDevelopment />"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Full-stack solutions using modern frameworks. Scalable, fast, and
                SEO optimized architecture.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                  React
                </span>
                <span className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                  Node
                </span>
                <span className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                  Tailwind
                </span>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="group p-6 border border-gray-200 dark:border-gray-800 rounded hover:border-gray-400 dark:hover:border-gray-600 transition-all bg-white dark:bg-terminal-black hover:shadow-lg dark:hover:shadow-neon-blue"
            >
              <div className="text-code-blue mb-4 text-sm">// 02</div>
              <h3 className="text-xl font-bold mb-3">
                {"<UI_UX_Design />"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                User-centric interfaces that convert. Minimalist aesthetics
                meeting functional requirements.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                  Figma
                </span>
                <span className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                  Prototyping
                </span>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="group p-6 border border-gray-200 dark:border-gray-800 rounded hover:border-gray-400 dark:hover:border-gray-600 transition-all bg-white dark:bg-terminal-black hover:shadow-lg dark:hover:shadow-neon-blue"
            >
              <div className="text-code-green mb-4 text-sm">// 03</div>
              <h3 className="text-xl font-bold mb-3">
                {"<Consulting />"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Technical strategy and digital transformation advisory for
                growing businesses.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                  Audit
                </span>
                <span className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                  Strategy
                </span>
              </div>
            </motion.div>
          </div>
        </section>

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
                <span className="text-gray-500">// CEO, TechMoldova</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded border-l-4 border-code-green font-mono text-sm">
              <div className="text-gray-900 dark:text-white mt-2 font-bold">
                {"const client = \"Maria D.\"; "}
                <span className="text-gray-500">
                  // Marketing Lead, ShopSmart
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-gray-200 dark:border-gray-800 my-12 bg-gray-50 dark:bg-gray-900/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "50+", label: "<Projects />" },
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
                <span className="text-code-blue" suppressHydrationWarning>
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
            {/* TODO: Wire up to Supabase — supabase.from('contacts').insert({ email, message }) */}
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
    </div>
  );
}
