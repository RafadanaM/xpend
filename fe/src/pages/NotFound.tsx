import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-2">
      <h1 className="text-9xl lg:text-10xl text-primary font-semibold">
        4<span className="text-accent-orange">0</span>4
      </h1>
      <p className="text-primary font-medium">
        Whoops, the page you are looking for does not{" "}
        <span className="text-accent-orange">exists!</span>
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-5 rounded border border-accent-orange text-accent-orange bg-white hover:bg-accent-orange hover:text-white transition-colors duration-200 px-2 py-1"
      >
        Back to Home
      </button>
    </div>
  );
};
