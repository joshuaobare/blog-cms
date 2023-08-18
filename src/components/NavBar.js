import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          EchoesCMS
        </Link>
        <button
          id="nav-btn"
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          aria-controls=".navbar-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/">
              Home
            </Link>
            {props.loggedIn ? (
              <Link className="nav-item nav-link" to="/post">
                Create Post
              </Link>
            ) : null}
            {props.loggedIn ? (
              <Link
                className="nav-item nav-link"
                to="/"
                onClick={props.userLogout}
              >
                Logout
              </Link>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
