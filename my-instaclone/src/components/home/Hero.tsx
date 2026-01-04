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
          href="/register"
          className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          Create an account
        </a>
        <h1 className="px-6 py-3 ">OR</h1>
        <a
          href="/login"
          className="px-6 py-3 border bg-red-500 text-white border-gray-300 rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          Log in to your account.
        </a>
      </div>
    </section>
  );
}
