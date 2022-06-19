export const initialState = {
    loginDetails: {
        email: '',
        password: ''
    },
    validationMessages: {
        email: '',
        password: ''
    },
    isPasswordVisible: false
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_PASSWORD':
            return {
                ...state,
                isPasswordVisible: true
            };

        case 'HIDE_PASSWORD':
            return {
                ...state,
                isPasswordVisible: false
            };

        case 'UPDATE_LOGIN_DETAILS':
            return {
                ...state,
                loginDetails: { ...state.loginDetails, ...action.payload }
            };

        case 'VALIDATE_LOGIN_DETAILS':
            return {
                ...state,
                validationMessages: { ...state.validationMessages, ...action.payload }
            };

        default:
            return state;
    }
};
