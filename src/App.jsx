import './App.css'
import './Modal.css'
import React, {useContext, useEffect, useState} from "react";
import {nouvelles} from "./Scripts/nouvelles.js";
import {utilisateurs} from "./Scripts/utilisateurs.js";
import NewsDisplay from "./components/NewsDisplay.jsx";
import Menu from "./components/Menu.jsx";
import Statistique from "./components/Statistique.jsx";
import {LoggedUserContext} from "./components/LoggedUserContext.jsx";

function App() {
    const [navId, setNavId] = useState(0);
    const [currentLoggedUser, setCurrentLoggedUser] = useState(null);

    const [news, setNews] = useState(() => {
        const savedNews = localStorage.getItem("newsList");
        if (savedNews) {
            try {
                return JSON.parse(savedNews);
            } catch (e) {
                console.error("Error parsing news from localStorage:", e);
                return nouvelles;
            }
        }
        return nouvelles;
    });

    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem("usersList");
        if (savedUsers) {
            try {
                return JSON.parse(savedUsers);
            } catch (e) {
                console.error("Error parsing users from localStorage:", e);
                return utilisateurs;
            }
        }
        return utilisateurs;
    });

    useEffect(() => {
        localStorage.setItem("newsList", JSON.stringify(news));
    }, [news]);

    useEffect(() => {
        localStorage.setItem("usersList", JSON.stringify(users));
    }, [users]);

    return (
        <>
            <LoggedUserContext.Provider value={{
                loggedUser: currentLoggedUser,
                setLoggedUser: setCurrentLoggedUser
            }}>
                <Menu/>
                {currentLoggedUser && (
                    <>
                        <div className="nav-links-container">
                            <a
                                onClick={() => setNavId(0)}
                                className={`nav-link ${navId === 0 ? 'active' : ''}`}
                            >
                                Nouvelles
                            </a>
                            {currentLoggedUser && currentLoggedUser.type === "ADMIN" && (
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
