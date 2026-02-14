interface SearchTabsProps {
  active: string;
  onChange: (tab: string) => void;
}

export function SearchTabs({ active, onChange }: SearchTabsProps) {
  const tabs = ["all", "users", "posts", "tags"];

  return (
    <div className="flex gap-6 border-b mt-4">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`pb-2 capitalize ${
            active === t
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
