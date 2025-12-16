"use client";

export function SearchInput({ value, onChange }: any) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search"
      className="w-full px-4 py-2 border rounded-md"
    />
  );
}
