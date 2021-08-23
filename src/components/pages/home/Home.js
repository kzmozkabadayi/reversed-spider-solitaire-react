import React from "react";
import Header from "./Header";
import ScreenSizeWarn from "../../ScreenController";
import HomeCards from "./HomeCards";


function Home() {
  return (
    <>
      <ScreenSizeWarn />
      <div className="home">
        <Header/>
        <HomeCards/>    
      </div>
    </>
  );
}

export default Home;
