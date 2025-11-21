import {createContext} from "react";
export const LoggedUserContext = createContext({
    loggedUser: null,
    setLoggedUser: () => {}
});