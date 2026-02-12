"use client";

import React, { useState, useEffect } from "react";

export function HeroTyper() {
    const [typingText, setTypingText] = useState("");
    const fullText = "RevOrgs";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTypingText(fullText.slice(0, index + 1));
            index++;
            if (index === fullText.length) clearInterval(interval);
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
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
    );
}
