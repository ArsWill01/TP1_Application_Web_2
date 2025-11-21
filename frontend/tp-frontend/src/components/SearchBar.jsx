import React, {useContext, useMemo, useRef, useState} from "react";
import {LoggedUserContext} from "./LoggedUserContext.jsx";

export default function SearchBar({setSearchCriteria}) {
    const [isEditable, setIsEditable] = useState(true);

    const {loggedUser, setLoggedUser} = useContext(LoggedUserContext);

    const textRef = useRef('');
    const dateRef = useRef('');

    const handleSearchClick = async () => {
        if (textRef.current.value || dateRef.current.value) {
            setIsEditable(!isEditable);
            setSearchCriteria([textRef.current.value, dateRef.current.value])
            await saveSearchCriteria(textRef.current.value, dateRef.current.value);
        }
    };

    const handleDeleteClick = async () => {
        console.log(critere)
        setIsEditable(!isEditable);
        textRef.current.value = '';
        dateRef.current.value = '';
        setSearchCriteria(['', ''])
    };

    async function saveSearchCriteria(text, date) {
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
            await postCritere(newSearchCriteria, searchCriteriaList)
        }
    }

    async function postCritere(newCritere, searchCriteriaList) {
        const url = `http://localhost:8080/criteres`;
        console.log(newCritere)
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCritere)
            });

            if (response.ok || response.status === 201) {
                const createdCritere = await response.json();
                searchCriteriaList.push(createdCritere);

                localStorage.setItem("searchCriteriaList", JSON.stringify(searchCriteriaList));

                console.log(`Ajouter critere dans le serveur et localement.`);

            } else {
                console.error(`Échec de la création de la critere. Statut HTTP: ${response.status}`);
            }

        } catch (error) {
            console.error(`Erreur réseau lors de la création de la critere :`, error);
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