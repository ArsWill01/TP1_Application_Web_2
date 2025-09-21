import Nouvelle from "./Nouvelle.jsx";
import React, {useState} from "react";

let lastId = 10;

export default function NewsDisplay({newsState}) {
    const [news, setNews] = newsState
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);

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

    return (
        <>
            {news.map((nouvelle) => (
                <React.Fragment key={nouvelle.id}>
                    <Nouvelle {...nouvelle} />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '20px'
                    }}>
                        {editingId === nouvelle.id ? (
                            <form onSubmit={modifierNouvelle}>
                                <input type="hidden" name="id" value={nouvelle.id} />
                                <label htmlFor="titre">Titre de la nouvelle:</label><br />
                                <input type="text" name="titre" defaultValue={nouvelle.titre} /><br />
                                <label htmlFor="texte">Contenu de la nouvelle:</label><br />
                                <input type="text" name="texte" defaultValue={nouvelle.texte} /><br />
                                <label htmlFor="resume">Résumé de la nouvelle:</label><br />
                                <input type="text" name="resume" defaultValue={nouvelle.resume} /><br />
                                <label htmlFor="img">Src de l'image:</label><br />
                                <input type="text" name="img" defaultValue={nouvelle.img} /><br />
                                <label htmlFor="date">Date :</label><br />
                                <input type="date" name="date" defaultValue={nouvelle.date.toString()} /><br />
                                <button type='submit'>Enregistrer</button>
                                <button type="button" onClick={handleCancelEdit}>Annuler</button>
                            </form>
                        ) : (
                            <>
                                <button onClick={() => handleToggleEditing(nouvelle.id)}>Modifier</button>
                                <button onClick={() => handleErase(nouvelle.id)}>Enlever</button>
                            </>
                        )}
                    </div>
                </React.Fragment>
            ))}

            <button onClick={handleToggleAdding}>Ajouter</button>

            {isAdding && (
                <form onSubmit={ajouteNouvelle}>
                    <label htmlFor="titre">Titre de la nouvelle:</label><br/>
                    <input type="text" name="titre"/><br/>
                    <label htmlFor="texte">Contenu de la nouvelle:</label><br/>
                    <input type="text" name="texte"/><br/>
                    <label htmlFor="resume">Résumé de la nouvelle:</label><br/>
                    <input type="text" name="resume"/><br/>
                    <label htmlFor="img">Src de l'image:</label><br/>
                    <input type="text" name="img"/><br/>
                    <label htmlFor="date">Date :</label><br/>
                    <input type="date" name="date"/><br/>
                    <button type='submit'>Ajouter une nouvelle</button>
                </form>
            )}
        </>
    );
}