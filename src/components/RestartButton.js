import React from "react";
import "../../src/style/RestartButton.scss";

function reload() {
  window.location.reload();
}


function RestartButton() {
  return (
    <div className="restart-button-part">
        <button className="restart-button" onClick={reload}>
            Restart Game
        </button>
    </div>
  );
}

export default RestartButton;
