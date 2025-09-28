export default function Statistique({newsState: news}){

    const newsLengths = news.map(item => item.texte.length);

    const newsDates = news.map(item => item.date);


    const shortestLength = Math.min(...newsLengths);
    const longestLength = Math.max(...newsLengths);

    const totalLength = newsLengths.reduce((sum, length) => sum + length, 0);
    const averageLength = news.length > 0 ? (totalLength / news.length).toFixed(0) : 0;


    const oldestTimestamp = Math.min(...newsDates);
    const mostRecentTimestamp = Math.max(...newsDates);

    const oldestDate = new Date(oldestTimestamp).toLocaleDateString('fr-CA');
    const mostRecentDate = new Date(mostRecentTimestamp).toLocaleDateString('fr-CA');

    const searchCriteriaListJSON = localStorage.getItem("searchCriteriaList");
    let searchCriteriaList = [];
    try {
        searchCriteriaList = searchCriteriaListJSON ? JSON.parse(searchCriteriaListJSON) : [];
    } catch (error) {
        console.error("Erreur lors de la lecture de l'historique de recherche:", error);
        searchCriteriaList = [];
    }

    const formatSearchDate = (date) => {
        return new Date(date).toLocaleString();
    };

    const criteriaWithCounts = searchCriteriaList.map(criteria => {
        const searchText = criteria.textRecherche.toLowerCase().trim();
        const filterDateString = criteria.dateRecherche;
        const dateToFilter = filterDateString ? new Date(filterDateString) : null;

        const count = news.filter((nouvelle) => {
            const textMatches = searchText === '' || nouvelle.resume.toLowerCase().includes(searchText);
            const itemDate = new Date(nouvelle.date);
            const dateMatches = !dateToFilter || itemDate >= dateToFilter;
            return textMatches && dateMatches;
        }).length;

        return { ...criteria, count };
    });

    return(
        <>
            <h2>Statistiques des Nouvelles</h2>
            <div>
                Nombre total de nouvelles : {news.length}
            </div>

            <hr/>

            <h3>Tailles des Nouvelles (caractères dans le champ 'texte')</h3>
            <div>
                Nouvelle la plus courte : {shortestLength} caractères
            </div>
            <div>
                Nouvelle la plus longue : {longestLength} caractères
            </div>
            <div>
                Taille moyenne des nouvelles : {averageLength} caractères
            </div>

            <hr/>

            <h3>Dates des Nouvelles</h3>
            <div>
                Date de la plus ancienne nouvelle : {oldestDate}
            </div>
            <div>
                Date de la plus récente nouvelle : {mostRecentDate}
            </div>
            <h2>Historique de Recherche ({searchCriteriaList.length} critères)</h2>
            {criteriaWithCounts.length === 0 ? (
                <p>Aucun critère de recherche n'a été enregistré.</p>
            ) : (
                <ul className="search-history-list">
                    {criteriaWithCounts.map((criteria, index) => (
                        <li key={index} className="search-history-list-item">
                            <p>
                                <strong>Recherche # {index + 1}</strong> (Effectuée le
                                : {formatSearchDate(criteria.dateCreation)})
                            </p>
                            <ul>
                                <li>
                                    Résultats :
                                    <strong> {criteria.count} nouvelles</strong>
                                </li>
                                <li>
                                    Critère Texte :
                                    <strong> {criteria.textRecherche || 'Aucun'}</strong>
                                </li>
                                <li>
                                    Critère Date :
                                    <strong> {criteria.dateRecherche || 'Aucune'}</strong>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}