
import React, { useState, useEffect } from "react";
import cardInfo from "../utils/cardInfo";

import "../../src/style/Card.scss";

function Card({ card, isSelected, isDown, isHighlighted }) {
  const [down, setdown] = useState("");
  const [select, setselect] = useState("");
  const [highlight, sethighlight] = useState("");
  useEffect(() => {
    if (isDown) {
      setdown(" card-down");
    } else {
      setdown(" " + card.suit);
    }
    if (isSelected) {
      setselect(" card-selected");
    } else {
      setselect("");
    }
    if (isHighlighted) {
      sethighlight(" card-highlighted");
    } else {
      sethighlight("");
    }
  }, [isDown, isSelected, isHighlighted, card.suit]);
  return (
    <div className={"card" + down + select + highlight}>
      <div className="card-content card-rank-left">{card.rank}</div>
      <div className="card-content card-suite-left ">
        {cardInfo["symbol"][card.suit]}
      </div>
    </div>
  );
}

export default Card;
