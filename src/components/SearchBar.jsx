import React, {useMemo, useRef, useState} from "react";

export default function SearchBar({setSearchCriteria}) {
    const [isEditable, setIsEditable] = useState(true);

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
                <input
                    type="text"
                    disabled={!isEditable}
                    ref={textRef}
                    placeholder="Search.."
                />
                <input type="date" disabled={!isEditable} ref={dateRef}></input>
                <button onClick={handleSearchClick} disabled={!isEditable}>Rechercher</button>
                <button onClick={handleDeleteClick} disabled={isEditable}>Supprimer</button>
            </div>
        </>
    )
}