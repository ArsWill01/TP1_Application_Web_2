import Nouvelle from "./Nouvelle.jsx";

//, setnews
export default function NewsDisplay({newsState}){
    const [news] = newsState

    return(
        <>
        {
        news.map((nouvelle) =>
            <Nouvelle {...nouvelle}></Nouvelle>
        )}
        </>
    )
}