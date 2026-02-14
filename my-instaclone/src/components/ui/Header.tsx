/* eslint-disable @next/next/no-img-element */

export default function Header() {
  return (
    <header className="w-full border-b flex  items-center">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold flex items-center gap-2">
          <img
            src="favicon.ico"
            alt="icon"
            width={24}
            height={24}
            className="pt-1"
          />
          <p>Instagram Clone</p>
        </div>

        {/* <div>
          <input
            className="border rounded px-3 py-1 text-sm"
            placeholder="Search"
            aria-label="Search"
          />
        </div> */}
      </div>
    </header>
  );
}
