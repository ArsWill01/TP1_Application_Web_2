import Nouvelle from "./Nouvelle.jsx";
import React, {useState} from "react";
import SearchBar from "./SearchBar.jsx";
import Modal from "./Modal.jsx";

let lastId = 10;

export default function NewsDisplay({newsState: news, setNewsState: setNews, usersState: users}) {

    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState(['', '']);

    function handleToggleEditing(id) {
        setEditingId(id);
        setIsAdding(false);
    }

    function handleToggleAdding() {
        setIsAdding((oldAdding) => !oldAdding);
        setEditingId(null);
    }

    function handleCancelEdit() {
        setEditingId(null);
    }

    function ajouteNouvelle(event) {
        event.preventDefault();
        console.log("ajoute nouvelle");
        const formData = new FormData(event.target);
        console.log(formData);
        const newNouvelle = {
            ...Object.fromEntries(formData),
            id: ++lastId,
            date: new Date(formData.get('date'))
        }
        setNews((oldNouvelle) => [newNouvelle, ...oldNouvelle]);
        setIsAdding(false);
    }

    function handleErase(id) {
        setNews(news => news.filter(
            nouvelle => nouvelle.id !== Number(id)
        ));
    }

    function modifierNouvelle(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newNouvelle = {
            ...Object.fromEntries(formData),
            id: Number(formData.get('id')),
            date: new Date(formData.get('date'))
        };

        setNews((oldNouvelle) =>
            oldNouvelle.map((nouvelle) =>
                nouvelle.id === newNouvelle.id ? newNouvelle : nouvelle
            )
        );
        setEditingId(null);
    }

    const [searchText, filterDateString] = searchCriteria;

    const lowercasedSearchText = searchText.toLowerCase().trim();
    const dateToFilter = filterDateString ? new Date(filterDateString) : null;

    const filteredNews = news.filter((nouvelle) => {

        const textMatches = lowercasedSearchText === '' ||
            nouvelle.resume.toLowerCase().includes(lowercasedSearchText);

        const itemDate = new Date(nouvelle.date);

        const dateMatches = !dateToFilter ||
            itemDate >= dateToFilter;

        return textMatches && dateMatches;
    });

    const isModalOpen = isAdding || editingId !== null;
    const nouvelleToEdit = news.find(n => n.id === editingId);

    const currentNouvelleData = isAdding
        ? {}
        : nouvelleToEdit || {};

    const formSubmitHandler = isAdding ? ajouteNouvelle : modifierNouvelle;
    const modalCloseHandler = isAdding ? handleToggleAdding : handleCancelEdit;
    const modalTitle = isAdding ? "Ajouter une nouvelle" : "Modification de la nouvelle";


    return (
        <>
            <SearchBar setSearchCriteria={setSearchCriteria}></SearchBar>
            <button onClick={handleToggleAdding} className={"btn-ajouter"}>Ajouter</button>

            {!isModalOpen && (
                <div className={"news-container"}>
                    {filteredNews.map((nouvelle) => (
                        <div key={nouvelle.id} className={"news-item"}>
                            <Nouvelle {...nouvelle}/>
                            <div className={"btn-nouvelle"}>
                                <button onClick={() => handleToggleEditing(nouvelle.id)}>Modifier</button>
                                <button onClick={() => handleErase(nouvelle.id)}>Enlever</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <Modal onClose={modalCloseHandler}>
                    <h3 className={"titremodnews"}>{modalTitle}</h3>

                    <form onSubmit={formSubmitHandler}>
                        {!isAdding && <input type="hidden" name="id" value={currentNouvelleData.id}/>}

                        <label htmlFor="titre">Titre de la nouvelle:</label><br/>
                        <input type="text" name="titre" defaultValue={currentNouvelleData.titre}/><br/>

                        <label htmlFor="texte">Contenu de la nouvelle:</label><br/>
                        <textarea rows="5" name="texte" defaultValue={currentNouvelleData.texte}></textarea><br/>

                        <label htmlFor="resume">Résumé de la nouvelle:</label><br/>
                        <textarea rows="5" name="resume" defaultValue={currentNouvelleData.resume}></textarea><br/>

                        <label htmlFor="img">Src de l'image:</label><br/>
                        <input type="text" name="img" defaultValue={currentNouvelleData.img}/><br/>

                        <label htmlFor="date">Date :</label><br/>
                        <input
                            type="date"
                            name="date"
                            defaultValue={currentNouvelleData.date ? new Date(currentNouvelleData.date).toISOString().slice(0, 10) : ''}
                        />
                        <br/>

                        <button type='submit'>{isAdding ? 'Ajouter une nouvelle' : 'Enregistrer'}</button>
                        <button type="button" onClick={modalCloseHandler}>Annuler</button>
                    </form>
                </Modal>
            )}
        </>
    );
}