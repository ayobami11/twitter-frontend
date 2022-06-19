import { createContext, useReducer } from 'react';

import { initialState, reducer } from '../reducers/tweet';

export const TweetContext = createContext(null);

export const TweetContextWrapper = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TweetContext.Provider value={{ state, dispatch }}>
            {children}
        </TweetContext.Provider>
    );
};
