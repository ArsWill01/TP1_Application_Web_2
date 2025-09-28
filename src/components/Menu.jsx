import React, {useState} from "react";
import {utilisateurs} from "../Scripts/utilisateurs.js";
import {FaCaretDown, FaUserCircle} from 'react-icons/fa';

export default function Menu(){
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelect = (utilisateur) => {
        setSelectedUser(utilisateur);
        setIsOpen(false);
    };

    return(
        <div className={"menu"}>
            <h1>Nouvelle Minute</h1>
            <div className="select-container">
                <div className="selected-option" onClick={handleToggle}>
                    <div className="option-content">
                        <FaUserCircle className="user-icon" />
                        <span>{selectedUser ? selectedUser.nom : 'Select a user...'}</span>
                    </div>
                    <FaCaretDown className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
                </div>

                {isOpen && (
                    <div className="options-list">
                        {utilisateurs.map(utilisateur => (
                            <div key={utilisateur.id} className="option-item" onClick={() => handleSelect(utilisateur)}>
                                <FaUserCircle className="user-icon" />
                                <span>{utilisateur.nom}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}