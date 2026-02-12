import React from "react";

interface TerminalWindowProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
    title,
    children,
    className = "",
}) => {
    return (
        <div
            className={`bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-2xl ${className}`}
        >
            <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500 font-mono">{title}</div>
                <div className="w-10"></div>
            </div>
            <div className="p-6 md:p-8 font-mono">{children}</div>
        </div>
    );
};
