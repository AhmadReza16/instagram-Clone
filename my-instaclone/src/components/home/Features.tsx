const features = [
  {
    title: "Write Fast",
    desc: "A clean editor with zero distractions.",
  },
  {
    title: "Share Easily",
    desc: "Publish your stories publicly or privately.",
  },
  {
    title: "Explore Content",
    desc: "Find amazing stories written by others.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((f) => (
          <div
            key={f.title}
            className="p-6 bg-white shadow rounded-xl border border-gray-200"
          >
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
