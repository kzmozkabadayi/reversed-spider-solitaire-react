import React from "react";
import { Link } from "react-router-dom";
import "../../src/style/HomeButton.scss";


function HomeButton() {
  return (
    <div className="home-button-part">
      <Link to={"/"}>
        <button className="home-button">
            Home Page
        </button>
      </Link>
    </div>
  );
}

export default HomeButton;
