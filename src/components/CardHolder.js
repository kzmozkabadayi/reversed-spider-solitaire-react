import React, { useState, useEffect } from "react";

import "../../src/style/CardHolder.scss";

function CardHolder({ isHighlighted }) {
  const [highlighted, sethighlighted] = useState("");
  useEffect(() => {
    if (isHighlighted) {
      sethighlighted(" cardholder-highlight");
    } else {
      sethighlighted("");
    }
  }, [isHighlighted]);
  return <div className={"cardholder" + highlighted}></div>;
}

export default CardHolder;
