import React, {useContext, useMemo, useRef, useState} from "react";
import {LoggedUserContext} from "./LoggedUserContext.jsx";

export default function SearchBar({setSearchCriteria}) {
    const [isEditable, setIsEditable] = useState(true);

    const {loggedUser, setLoggedUser} = useContext(LoggedUserContext);

    const textRef = useRef('');
    const dateRef = useRef('');

    const handleSearchClick = () => {
        if (textRef.current.value || dateRef.current.value) {
            setIsEditable(!isEditable);
            setSearchCriteria([textRef.current.value, dateRef.current.value])
            saveSearchCriteria(textRef.current.value, dateRef.current.value);
        }
    };

    const handleDeleteClick = () => {
        setIsEditable(!isEditable);
        textRef.current.value = '';
        dateRef.current.value = '';
        setSearchCriteria(['', ''])
    };

    function saveSearchCriteria(text, date) {
        const newSearchCriteria = {
            idUser: loggedUser.id,
            textRecherche: text,
            dateRecherche: date,
            dateCreation: new Date().toISOString()
        };

        const searchCriteriaListJSON = localStorage.getItem("searchCriteriaList");
        let searchCriteriaList = [];
        try {
            searchCriteriaList = searchCriteriaListJSON ? JSON.parse(searchCriteriaListJSON) : [];
        } catch (error) {
            console.error("Erreur lors de la lecture de l'historique de recherche:", error);
            searchCriteriaList = [];
        }
        const isExisting = searchCriteriaList.some(criteria =>
            criteria.textRecherche === newSearchCriteria.textRecherche &&
            criteria.dateRecherche === newSearchCriteria.dateRecherche
        );

        if (!isExisting) {
            searchCriteriaList.push(newSearchCriteria);

            localStorage.setItem("searchCriteriaList", JSON.stringify(searchCriteriaList));
        }
    }

    return (
        <>
            <div className="topnav">
                <div className="search-group">
                    <input
                        type="text"
                        disabled={!isEditable}
                        ref={textRef}
                        placeholder="Rechercher..."
                    />
                </div>

                <input type="date" disabled={!isEditable} ref={dateRef}></input>

                <button
                    className="icon-btn search-btn"
                    onClick={handleSearchClick}
                    disabled={!isEditable}
                >
                    🔍
                </button>

                <button
                    className="icon-btn delete-btn"
                    onClick={handleDeleteClick}
                    disabled={isEditable}
                >
                    ❌
                </button>
            </div>
        </>
    )
}