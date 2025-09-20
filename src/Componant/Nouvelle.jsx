

export default function Nouvelle({id, titre, resume, date, img}){

    return(
        <>
        <img
            alt='aucune'
            src={img}
        />
        <p>{id} {titre} : {date.toLocaleString()}</p>
        <br/>
        <p>{resume}</p>
        <br/>
                <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '20px'
                }}>
                        <button>Modifier</button>
                        <button>Enlever</button>
                        <button>Ajouter</button>
                </div>
        </>
    )
}