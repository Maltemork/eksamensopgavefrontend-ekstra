import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div id="home-page-container">
      <h1>Welcome to the Athletics Result Tracker!</h1>
      <p>
        This is a simple app to track the results of athletic disciplines. You
        can add, edit, and delete disciplines and results.
      </p>
      <p>You can add results based on disciplines and athletes.</p>
      <Link to="/disciplines" className="HomePageButton">
        Go to disciplines
      </Link>
      <Link to="/athletes" className="HomePageButton">
        Go to athletes
      </Link>
    </div>
  );
}
