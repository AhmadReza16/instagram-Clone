export default function Hero() {
  return (
    <section className="w-full py-20 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Share Your Story With The World
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        A beautiful and simple platform to write, share, and explore stories.
      </p>

      <div className="mt-8 flex justify-center space-x-4">
        <a
          href="/stories"
          className="px-6 py-3 bg-black text-white rounded-lg font-medium"
        >
          Explore Stories
        </a>
        <a
          href="/create"
          className="px-6 py-3 border border-gray-300 rounded-lg font-medium"
        >
          Write a Story
        </a>
      </div>
    </section>
  );
}
