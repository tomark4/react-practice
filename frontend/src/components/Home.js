import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Welcome to my todo app</h1>
        <p className="lead">
          this is an app to practice react, nodejs, mongodb, redux
        </p>
        <hr className="my-4" />
        <p>Enjoy!</p>
        <p className="lead">
          <Link className="btn btn-primary" to="/register">
            Go to register
          </Link>
        </p>
        <div className="text-center my-2">
          <p className="text-center">Created by Jose Quintero</p>
          <a
            href="http://jottasistemas.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to my web page
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
