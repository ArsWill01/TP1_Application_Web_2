import './App.css'
import './Modal.css'
import React, {useContext, useEffect, useState} from "react";
import {nouvelles} from "./Scripts/nouvelles.js";
import {utilisateurs} from "./Scripts/utilisateurs.js";
import NewsDisplay from "./components/NewsDisplay.jsx";
import Menu from "./components/Menu.jsx";
import Statistique from "./components/Statistique.jsx";
import {LoggedUserContext} from "./components/LoggedUserContext.jsx";

const NEWS_API_URL = 'http://localhost:8080/nouvelles';
const USERS_API_URL = 'http://localhost:8080/utilisateurs';
const CRITERIAS_API_URL = 'http://localhost:8080/criteres';

function App() {
    const [navId, setNavId] = useState(0);
    const [currentLoggedUser, setCurrentLoggedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [news, setNews] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async (url, localStorageKey, setter) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status} pour ${url}`);
                }
                const data = await response.json();
                if(setter){
                    setter(data);
                }
                localStorage.setItem(localStorageKey, JSON.stringify(data));
            } catch (error) {
                console.error(`Erreur de récupération pour ${url}:`, error);
            }
        };

        const loadAllData = async () => {
            setLoading(true);
            await fetchData(NEWS_API_URL, "newsList", setNews);
            await fetchData(USERS_API_URL, "usersList", setUsers);
            await fetchData(CRITERIAS_API_URL, "searchCriteriaList", null);
        };

        loadAllData().then(r => setLoading(false));
    }, []);

    return (
        <>
            <LoggedUserContext.Provider value={{
                loggedUser: currentLoggedUser,
                setLoggedUser: setCurrentLoggedUser
            }}>
                <Menu users={users}/>
                {currentLoggedUser && (
                    <>
                        <div className="nav-links-container">
                            <a
                                onClick={() => setNavId(0)}
                                className={`nav-link ${navId === 0 ? 'active' : ''}`}
                            >
                                Nouvelles
                            </a>
                            {currentLoggedUser.type === "ADMIN" && (
                                <a
                                    onClick={() => setNavId(1)}
                                    className={`nav-link ${navId === 1 ? 'active' : ''}`}
                                >
                                    Statistiques
                                </a>
                            )}
                        </div>

                        <div className="main-content-area">
                            {navId === 0 && (
                                <NewsDisplay newsState={news} setNewsState={setNews} usersState={users}/>
                            )}
                            {navId === 1 && (
                                <Statistique newsState={news}/>
                            )}
                        </div>
                    </>

                )}
            </LoggedUserContext.Provider>
        </>
    )
}

export default App;