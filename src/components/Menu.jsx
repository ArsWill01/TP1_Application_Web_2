import React, {useContext, useState} from "react";
import {LoggedUserContext} from "./LoggedUserContext.jsx";
import {utilisateurs} from "../Scripts/utilisateurs.js";
import {FaCaretDown, FaUserCircle} from 'react-icons/fa';

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);
    const {loggedUser, setLoggedUser} = useContext(LoggedUserContext);

    const handleSelect = (utilisateur) => {
        setLoggedUser(utilisateur);
        setIsOpen(false);
    };

    return (
        <div className={"menu"}>
            <h1>Nouvelle Minute</h1>
            <div className="select-container">
                <div className="selected-option" onClick={handleToggle}>
                    <div className="option-content">
                        <FaUserCircle className="user-icon"/>
                        <span>{loggedUser ? loggedUser.nom : 'Sélectionner un usager...'}</span>
                    </div>
                    <FaCaretDown className={`dropdown-icon ${isOpen ? 'open' : ''}`}/>
                </div>

                {isOpen && (
                    <div className="options-list">
                        {utilisateurs.map(utilisateur => (
                            <div key={utilisateur.id} className="option-item" onClick={() => handleSelect(utilisateur)}>
                                <FaUserCircle className="user-icon"/>
                                <span>{utilisateur.nom}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}