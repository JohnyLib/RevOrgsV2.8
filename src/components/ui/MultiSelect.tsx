"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

interface Option {
    id: string;
    name: string;
}

interface MultiSelectProps {
    label: string;
    options: Option[];
    selected: string[]; // List of selected Names
    onChange: (selected: string[]) => void;
    placeholder?: string;
    allowCustom?: boolean;
}

export function MultiSelect({
    label,
    options,
    selected,
    onChange,
    placeholder = "Select...",
    allowCustom = false
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter options based on search
    const filteredOptions = options.filter(opt =>
        opt.name.toLowerCase().includes(search.toLowerCase())
    );

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleSelection = (name: string) => {
        if (selected.includes(name)) {
            onChange(selected.filter(item => item !== name));
        } else {
            onChange([...selected, name]);
        }
    };

    const handleCustomAdd = () => {
        if (search && !selected.includes(search)) {
            onChange([...selected, search]);
            setSearch("");
        }
    };

    return (
        <div className="relative" ref={containerRef}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
            </label>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
                {selected.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm border border-indigo-100 dark:border-indigo-800">
                        {item}
                        <button
                            type="button"
                            onClick={() => toggleSelection(item)}
                            className="hover:text-indigo-900 dark:hover:text-white"
                        >
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>

            {/* Input / Dropdown Trigger */}
            <div
                className="relative"
                onClick={() => setIsOpen(true)}
            >
                <div className="flex items-center justify-between w-full px-4 py-2 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg cursor-text min-h-[42px]">
                    <input
                        type="text"
                        className="bg-transparent border-none outline-none w-full text-sm text-gray-900 dark:text-white placeholder-gray-400"
                        placeholder={selected.length === 0 ? placeholder : ""}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                    />
                    <ChevronsUpDown size={16} className="text-gray-400" />
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {filteredOptions.length === 0 && !search && (
                            <div className="px-4 py-2 text-sm text-gray-500">No options available.</div>
                        )}

                        {/* Custom Add Option */}
                        {allowCustom && search && !options.some(o => o.name.toLowerCase() === search.toLowerCase()) && (
                            <div
                                onClick={handleCustomAdd}
                                className="px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-2"
                            >
                                <Plus size={14} />
                                Create "{search}"
                            </div>
                        )}

                        {/* Options List */}
                        {filteredOptions.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => toggleSelection(option.name)}
                                className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 ${selected.includes(option.name) ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}
                            >
                                <span>{option.name}</span>
                                {selected.includes(option.name) && <Check size={16} />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

import { Plus } from "lucide-react";
