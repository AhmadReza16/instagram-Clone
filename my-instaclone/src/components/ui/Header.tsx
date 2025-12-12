export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold">Instagram</div>
        <div>
          <input
            className="border rounded px-3 py-1 text-sm"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
      </div>
    </header>
  );
}
