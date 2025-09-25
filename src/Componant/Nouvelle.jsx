export default function Nouvelle({id, titre, resume, date, img}){

    return(
        <div className={"cadre-nouvelle"}>
        <img
            alt='aucune'
            src={img}
        />
        <p>{id} {titre} : {date.toLocaleString()}</p>
        <br/>
        <p>{resume}</p>
        <br/>
        </div>
    )
}