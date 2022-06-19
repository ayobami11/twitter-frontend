import { createContext, useReducer } from 'react';

import { initialState, reducer } from '../reducers/user';

export const UserContext = createContext(null);

export const UserContextWrapper = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
