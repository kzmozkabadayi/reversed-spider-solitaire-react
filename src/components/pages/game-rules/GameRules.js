import React from "react";
import "./GameRules.scss";
import GameRulesHeader from "./GameRulesHeader";
import HomeButton from "../../HomeButton";
import RulesInformation from "./RulesInformation";


function GameRules() {
    return(
        <> 
            <HomeButton/>
            <GameRulesHeader/>
            <RulesInformation/>
        </>
    )
    

}

export default GameRules;