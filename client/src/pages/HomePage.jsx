import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex items-center justify-center px-4">

      {/* Background decorative blobs */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-indigo-400/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-purple-400/30 rounded-full blur-3xl"></div>

      {/* Main container */}
      <div className="relative z-10 max-w-3xl text-center p-10 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl">

        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-sm tracking-wide mb-6">
          Welcome to <span className="text-indigo-600">Our Bookstore</span>
        </h1>

        <p className="text-xl text-gray-700 mb-10 leading-relaxed">
          Explore timeless classics, discover new releases and enrich your library
          with the books you love.
        </p>

        <Link
          to="/products"
          className="px-10 py-4 text-lg font-semibold text-white rounded-full 
                     bg-indigo-600 hover:bg-indigo-700 
                     shadow-lg hover:shadow-indigo-500/40 
                     transition-all duration-300 hover:scale-105"
        >
          Browse Books
        </Link>

      </div>
    </div>
  );
}
