import { createContext, useReducer } from 'react';

import { initialState, reducer } from '../reducers/profile';

export const ProfileContext = createContext(null);

export const ProfileContextWrapper = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    );
};
