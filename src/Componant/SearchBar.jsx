import React from "react";

export default function SearchBar(){



    return(
        <>
            <div className="topnav">
                <input type="text" placeholder="Search.."/>
                <button onClick={handleClick}>Rechercher</button>
            </div>
        </>
    )
}