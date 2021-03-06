
import React, { useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { populateOneSuitCards } from "../../../logic/one-suite";
import {
  dragStart,
  drag,
  dragEnter,
  selectCard,
  drop,
  distributeRemCards,
} from "../../../logic/functions";
import CardHolder from "../../CardHolder";
import Card from "../../Card";
import Back from "../../HomeButton";
import Timer from "../../Timer";
import RestartGame from "../../RestartButton";

import "./OneSuite.css";
import BackButton from "../../HomeButton";

function OneSuite() {
  const minSecs = {minutes: 0, seconds: 0}
  const [cards, setcards] = useState({});
  const [game, setgame] = useState({
    cards: [],
    decks: [],
    selectedCard: "",
    selectedDeck: "",
    selected: [],
    hands: 0,
    x: -1,
    y: -1,
    highlightedDeck: "",
    highlightedCard: "",
  });
  useEffect(() => {
    const val = populateOneSuitCards();
    setcards(val);
    setgame((prevState) => ({
      ...prevState,
      cards: val.cards,
      decks: val.decks,
    }));
  }, []);

  return (
    <div className="onesuite-main">
      <div className="menu-part">
          <BackButton></BackButton>
          <RestartGame></RestartGame>
          <Timer minSecs={minSecs}/>
      </div>  
      {cards.hasOwnProperty("decks") && game.decks[10].length > 0 && (
          <div
            onClick={(e) => {
              distributeRemCards(game, setgame);
            }}
            className="card card-down card-remcards"
          ></div>
        )}
      <div className="onesuite">  
        {cards.hasOwnProperty("decks") &&
          game.decks.slice(0, 10).map((deck, index) => (
            <React.Fragment>
              {deck.length === 0 ? (
                <div
                  id="holder"
                  key={index + "0"}
                  onClick={() => {
                    selectCard("", deck, true, game, setgame);
                  }}
                  onDragEnter={(e) => {
                    dragEnter(e, game, setgame, "", deck);
                  }}
                >
                  <CardHolder key={index + " 1"} deck={deck} />
                </div>
              ) : (
                <div key={index + " 2"} deck={deck}>
                  <ReactCSSTransitionGroup
                    transitionName="card"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    key={index + " 3"}
                    deck={deck}
                  >
                    {deck.map((card, key) => (
                      <div
                        key={card.rank + " " + card.suit + " " + card.deck + " 0"}
                        id={card.rank + " " + card.suit + " " + card.deck}
                        className="card-wrapper card-stack"
                        draggable={true}
                        onDragStart={(e) => {
                          dragStart(e, card, deck, game, setgame);
                        }}
                        onDrag={(e) => {
                          drag(e, card, game, setgame);
                        }}
                        onDragEnter={(e) => {
                          if (card.isDown === false) {
                            dragEnter(e, game, setgame, card, deck);
                          }
                        }}
                        onDragEnd={(e) => {
                          drop(e, card, game, setgame);
                        }}
                        onClick={(e) => {
                          selectCard(card, deck, null, game, setgame);
                        }}
                      >
                        <Card
                          key={card.rank + " " + card.suit + " " + card.deck}
                          card={card}
                          isSelected={card.isSelected}
                          isDown={card.isDown}
                          isHighlighted={card.isHighlighted}
                        />
                      </div>
                    ))}
                  </ReactCSSTransitionGroup>
                </div>
              )}
            </React.Fragment>
          ))}   
      </div>
    </div>
  );
}

export default OneSuite;
