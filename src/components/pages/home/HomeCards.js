import React from "react";
import "./HomeCards.scss";
import imageKing from "../../../assets/snape-king.png";
import imageQueen from "../../../assets/snape-queen.png";
import imageJoker from "../../../assets/snape-joker.png";
import {Link} from "react-router-dom";


function HomeCards(){
    return (
        <>
          <div className="cardRotation">
            <div className="card-inner-section">
                <div className="card-inner">
                    <div className="card-face card-face-front">
                        <img src={imageKing} alt="" class="king" />
                    </div>
                    <div className="card-face card-face-back">
                        <div className="card-content">
                            <div className="card-header">
                                <p>Time to Play Game</p>
                            </div>
                            <div className="card-body">
                                <p>If you want to play solitaire, you can continue with button.</p>
                            </div>
                            <div className="card-button-play">
                                <Link to={"/one-suite"}>
                                    <button className="letsplay-button">
                                        LETS PLAY
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-inner-second">
                    <div className="card-face card-face-front">
                        <img src={imageQueen} alt="" class="queen" />
                    </div>
                    <div className="card-face card-face-back">
                        <div className="card-content">
                            <div className="card-header">
                                <p>How to Play?</p>
                            </div>
                            <div className="card-body">
                                <p>If you want to learn how to play game, you can visit the game rules section.</p>
                            </div>
                            <div className="card-button-rule">
                                <Link to={"/game-rules"}>
                                    <button className="gamerules-button">
                                        GAME RULES
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-inner-third">
                    <div className="card-face card-face-front">
                        <img src={imageJoker} alt="" class="joker" />
                    </div>
                    <div className="card-face card-face-back">
                        <div className="card-content">
                            <div className="card-header">
                                <p>Have a Nice Game</p>
                            </div>
                            <div className="card-body">
                                <p>I hope you have a good time playing the game :)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </>
      );
    }




export default HomeCards;