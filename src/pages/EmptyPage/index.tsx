import { useNavigate } from "react-router-dom";

export const EmptyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
};
