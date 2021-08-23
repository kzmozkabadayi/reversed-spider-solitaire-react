import React from "react";
import "./RulesInformation.scss";


function RulesInformation(){
    return(
    <>
        <div className="rules-information-part">
            <div className="rules-information">
                <ul>
                    <li>The cards must always be arranged in order A, 2, 3, 4, 5, 6, 7, 8 ,9 , 10, J, Q, K.</li>
                    <li>Of the 54 cards laid out on the table at the beginning of the game, it should be only the top cards are face up.</li>
                    <li>If the face-up card changes its place, the card before it is no longer of the order. Since it will be the top card, that card must also be face up.</li>
                    <li>8 sets arranged in an s-shaped order at the end of the game so that the player can win the game.</li>
                    <li>If the game is blocked and there is no ranking, the top 10 groups of the other 50 cards on the table, it is placed on the sequential cards on the table from left to right.</li>
                </ul>
            </div>

        </div>
    </>
    )
}

export default RulesInformation;