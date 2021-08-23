import * as _ from "lodash";

// Function to return rank for "A", "J", "Q" and "K"
export const getRank = (rank) => {
    switch (rank) {
      case "A":
        return 1;
      case "J":
        return 11;
      case "Q":
        return 12;
      case "K":
        return 13;

      default:
        return parseInt(rank)
    }
};

//Checks whether or not the current move to drop the presently chosen card to a target is valid.
export const controllMove = (target, deck, game) => {
  if (target.suit === game.selectedCard.suit && getRank(game.selectedCard.rank) - getRank(target.rank) === 1) {
    if (deck.indexOf(target) === deck.length - 1) {
      return true;
    }
  }
  alert('You cant move, please change your move');
  return false;
};

// Checks if a given card or cards may be selected to be moved or not.
export const controllMovable = (card, deck) => {
  const tempDeck = [...deck];
  const movingCards = tempDeck.slice(deck.indexOf(card));
  const ranks = movingCards.map((elem) => getRank(elem.rank));
  let currentRank = getRank(card.rank);
  for (let i = 1; i < ranks.length; i++) {
    if (ranks[i] - currentRank !== 1) return false;
    currentRank = ranks[i];
  }
  return true;
};

// Deletes the currently chosen card from the selected state and the currently highlighted card from the highlighted state.
export const removeSelectedCard = (game, setgame) => {
  if (game.selectedCard !== "" || game.highlightedCard !== "") {
    const decks = [...game.decks];
    for (let i = 0; i < decks.length; i++) {
      for (let j = 0; j < decks[i].length; j++) {
        decks[i][j].isSelected = false;
        decks[i][j].isHighlighted = false;
      }
    }
    setgame((prevState) => ({
      ...prevState,
      selected: [],
      decks: decks,
      selectedCard: "",
      selectedDeck: "",
      highlightedCard: "",
      highlightedDeck: "",
    }));
  }
};


//Enables the dragging of chosen cards.
export const dragStart = (event, card, deck, game, setgame) => {
  const x = event.pageX;
  const y = event.pageY;
  event.dataTransfer.setData("text", event.target.id);
  event.dataTransfer.setDragImage(new Image("0", "0"), -10, -10);
  setgame((prevState) => ({
    ...prevState,
    x: x,
    y: y,
  }));
  if (game.selectedCard === card) {
    return;
  }
  removeSelectedCard(game, setgame);
  selectCard(card, deck, null, game, setgame);
};

// Function to add css animation to show movement of selected card and decks
export const drag = (event, card, game, setgame) => {
  game.selected.forEach((card) => {
    let css;
    const child = document.getElementById(
        card.rank + " " + card.suit + " " + card.deck
    ).children[0];
    const moveX = event.pageX - game.x;
    const moveY = event.pageY - game.y;
    if (event.pageX === 0) {
      css = "z-index:9999;transform:translate(0px,0px);display:none;";
    } else {
       css =
        "z-index:9999;pointer-events: none; transform: scale(1.05, 1.05) rotate(0deg) translate(" +
        moveX +
        "px, " +
        moveY +
        "px);";
    }
    child.style.cssText = css;
  });
};

// Set Highlighted cards ( Cards which will be potential drop targets based on user movements)
export const dragEnter = (event, game, setGame, card, deck) => {
  const tempDecks = [...game.decks];
  if (card === "" && game.selectedCard !== "") {
    tempDecks.forEach((deck) =>
      deck.forEach((tempCard) => (tempCard.isHighlighted = false))
    );
  } else if (card !== "" && card !== game.selectedCard) {
    if (game.selected.indexOf(card) !== -1) return;
    const deckIdx = tempDecks.indexOf(deck);
    const cardIdx = tempDecks[deckIdx].indexOf(card);
    if (cardIdx !== tempDecks[deckIdx].length - 1) return;
    tempDecks.forEach((deck) =>
      deck.forEach((tempCard) => (tempCard.isHighlighted = false))
    );
    tempDecks[deckIdx][cardIdx].isHighlighted = true;
  }
  setGame((prevState) => ({
    ...prevState,
    highlightedCard: card,
    highlightedDeck: deck,
    decks: tempDecks,
  }));
};

// Transferring cards from one deck to another is possible with this feature.
export const moveCards = function (toDeck, fromDeck, fromCard, setgame, game) {
  const tempDeck = [...game.decks];
  const to = tempDeck.indexOf(toDeck);
  const from = tempDeck.indexOf(fromDeck);
  const cardIdx = tempDeck[from].indexOf(fromCard);

  const movedCards = tempDeck[from].splice(cardIdx);

  movedCards.forEach((card) => {
    tempDeck[to].push(card);
  });
  try {
    if (tempDeck[from][tempDeck[from].length - 1].isDown === true) {
      tempDeck[from][tempDeck[from].length - 1].isDown = false;
    }
  } catch (err) {
    console.log(err);
  }
  setgame((prevState) => ({
    ...prevState,
    decks: tempDeck,
  }));
};

// Function to mantain Selection of cards
// ( Also handles cases of select and drop in case of click events )
export const selectCard = (card, deck, holder, game, setgame) => {
  // Handle drop of card on CardHolder(Blank) by click functionality
  if (holder && game.selectedCard !== "") {
    if (game.selectedCard.rank === "A") {
      moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
      isHandComplete(deck, game, setgame);
      removeSelectedCard(game, setgame);
    }
  }
  const tempCard = card;
  // Handling select card by on click and drag and drop
  if (game.selectedCard === "") {
    if (holder) return;
    if (card.isDown) {
      return;
    }

    if (controllMovable(card, deck)) {
      tempCard.isSelected = true;
      const tempDeck = [...deck];
      const selected = tempDeck.slice(deck.indexOf(card));
      selected.forEach((currentCard) => {
        currentCard.isSelected = true;
      });
      setgame((prevState) => ({
        ...prevState,
        selected: selected,
        selectedCard: card,
        selectedDeck: deck,
      }));
    }
  } else {
    // Handling moving of cards by click functionality
    if (controllMove(tempCard, deck, game)) {
      moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
      isHandComplete(deck, game, setgame);
      removeSelectedCard(game, setgame);
    } else {
      removeSelectedCard(game, setgame);
    }
  }
};

// Function to handle when selected cards are dropped on some other cards
export const drop = (event, card, game, setgame) => {
  // Case when deck is empty ( Drop event occurs on CardHolder )
  if (game.highlightedCard === "") {
    if (card.rank === "A") {
      if (controllMovable(game.selectedCard, game.selectedDeck)) {
        moveCards(
          game.highlightedDeck,
          game.selectedDeck,
          game.selectedCard,
          setgame,
          game
        );
        isHandComplete(game.highlightedDeck, game, setgame);
        removeSelectedCard(game, setgame);
      } else {
        removeSelectedCard(game, setgame);
      }
    }
  }
  // Drop on cards Case
  if (controllMove(game.highlightedCard, game.highlightedDeck, game)) {
    if (controllMovable(game.selectedCard, game.selectedDeck)) {
      game.selected.forEach((card) => {
        const child = document.getElementById(
            card.rank + " " + card.suit + " " + card.deck
        ).children[0];
        const css = "z-index:0;pointer-events:auto;display:none;";
        child.style.cssText = css;
      });
      moveCards(
        game.highlightedDeck,
        game.selectedDeck,
        game.selectedCard,
        setgame,
        game
      );
      isHandComplete(game.highlightedDeck, game, setgame);
      removeSelectedCard(game, setgame);
      return;
    } else {
      game.selected.forEach((card) => {
        const child = document.getElementById(
            card.rank + " " + card.suit + " " + card.deck
        ).children[0];
        const css = "z-index:0;pointer-events:auto;";
        child.style.cssText = css;
      });
      removeSelectedCard(game, setgame);
    }
  } else {
    game.selected.forEach((card) => {
      const child = document.getElementById(
          card.rank + " " + card.suit + " " + card.deck
      ).children[0];
      const css = "z-index:0;pointer-events:auto;";
      child.style.cssText = css;
    });
    removeSelectedCard(game, setgame);
  }
};

// Add the rest of the cards to the decks.
export const distributeRemCards = (game, setgame) => {
  if (game.decks[10].length !== 0) {
    const tempDecks = [...game.decks];
    tempDecks.forEach((tempDeck) => {
      if (tempDecks[10].length > 0) {
        const tempCard = tempDecks[10].pop();
        tempCard.isDown = false;
        tempDeck.push(tempCard);
      }
    });
    setgame((prevState) => ({
      ...prevState,
      decks: tempDecks,
    }));
    tempDecks.forEach((tempDeck) => {
      isHandComplete(tempDeck, game, setgame);
    });
  }
};

// Function to check the desired arrangement of cards "A 2 3 4 5 6 7 8 9 10 J Q K"
export const isHandComplete = (deck, game, setgame) => {
  const len = checkDeck(deck);
  if (len !== false) {
    const tempDecks = [...game.decks];
    const curDeckIdx = tempDecks.indexOf(deck);
    tempDecks[curDeckIdx].splice(len);
    const currentHands = game.hands;
    if (tempDecks[curDeckIdx].length !== 0) {
      tempDecks[curDeckIdx][tempDecks[curDeckIdx].length - 1].isDown = false;
    }
    setgame((prevState) => ({
      ...prevState,
      decks: tempDecks,
      hands: currentHands + 1,
    }));
    // Send Congratulations message for winner gamer
    if (currentHands + 1 === 8) alert("Congratulations! You won this game :)");
  }
};

// Util function to check "A 2 3 4 5 6 7 8 9 10 J Q K" Set is formed or not
export const checkDeck = (deck) => {
  const ranks = deck.map((card) => {
    return getRank(card.rank);
  });
  const expectedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return !!_.isEqual(expectedArray, ranks.slice(-13))
};