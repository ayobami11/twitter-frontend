export const initialState = {
    user: null,
    validationMessages: {
        name: '',
        bio: ''
    }
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER': {

            return {
                ...state,
                user: action.payload.user
            }
        }

        case 'UPDATE_USER_DETAILS':
            return {
                ...state,
                user: { ...state.user, ...action.payload }
            };

        case 'VALIDATE_USER_DETAILS':
            return {
                ...state,
                validationMessages: { ...state.validationMessages, ...action.payload }
            };

        default: {
            return state
        }
    }
}