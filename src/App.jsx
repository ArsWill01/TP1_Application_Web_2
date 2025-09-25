import './App.css'
import React, {useState} from "react";
import {nouvelles} from "./Componant/nouvelles.js";
import NewsDisplay from "./Componant/NewsDisplay.jsx";
import Menu from "./Componant/Menu.jsx";

function App() {
    const newsState = useState(nouvelles);

  return (
      <>
          <Menu></Menu>
          <div>
              <NewsDisplay newsState={newsState}/>
          </div>
      </>
  )
}

export default App
