import React, {useState} from 'react';
export const ShoppingCardContext = React.createContext(null);

const ShoppingCardState = ({ children }) => {
    const [isCardChange, setIsCardChange] = useState(false);

    return(
        <ShoppingCardContext.Provider value={{isCardChange, setIsCardChange}}>
            {children}
        </ShoppingCardContext.Provider>
    )
};

export default ShoppingCardState
