import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <div className="text-5xl">
        You've got lost? This happens when traveling, time to go
        <Link to="/" className="text-5xl text-green-800 hover:text-green-600">
          {" "}
          home
          {"."}
        </Link>
      </div>
      <p>This is no joke. Error 404 page not found.</p>
    </>
  );
}
