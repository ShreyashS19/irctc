import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100 px-4 text-center">
      <h1 className="text-7xl font-bold text-blue-900 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mb-2">
        Looks like this train doesn't stop here.
      </p>
      <p className="text-gray-500 mb-6">
        The page you're looking for has either been cancelled or never existed.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;