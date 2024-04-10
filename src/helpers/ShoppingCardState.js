import React, {useState} from 'react';
import {useCleanLocalStorage} from "../hooks/useCleanLocalStorage";

export const ShoppingCardContext = React.createContext(null);

const ShoppingCardState = ({children}) => {
    const [isCardChange, setIsCardChange] = useState(false);
    useCleanLocalStorage();

    return (
        <ShoppingCardContext.Provider value={{isCardChange, setIsCardChange}}>
            {children}
        </ShoppingCardContext.Provider>
    )
};

export default ShoppingCardState
