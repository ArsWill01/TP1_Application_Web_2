import './App.css'
import {useState} from "react";
import {nouvelles} from "./Componant/nouvelles.js";
import NewsDisplay from "./Componant/NewsDisplay.jsx";

function App() {
    const newsState = useState(nouvelles);

  return (
      <>
          <div>
              <NewsDisplay newsState={newsState}/>
          </div>
      </>
  )
}

export default App
