"use client";

import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for people or tags..."
        className="w-full pl-10 pr-10 py-2 bg-gray-900 border border-gray-800 rounded-full text-white placeholder-gray-500 focus:border-gray-700 focus:outline-none transition"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
