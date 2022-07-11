import { createContext, useReducer } from 'react';

import { initialState, reducer } from '../reducers/app';

import { NotificationPopup } from '../components/general/NotificationPopup';
import { DeleteTweetDialog } from '../components/general/DeleteTweetDialog';

export const AppContext = createContext(null);

export const AppContextWrapper = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
            
            <NotificationPopup />

            <DeleteTweetDialog />
        </AppContext.Provider>
    );
};
