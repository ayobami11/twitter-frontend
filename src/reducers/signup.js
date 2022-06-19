export const initialState = {
    signupDetails: {
        name: '',
        handle: '',
        email: '',
        password: ''
    },
    validationMessages: {
        name: '',
        handle: '',
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

        case 'UPDATE_SIGNUP_DETAILS':
            return {
                ...state,
                signupDetails: { ...state.signupDetails, ...action.payload }
            };

        case 'VALIDATE_SIGNUP_DETAILS':
            return {
                ...state,
                validationMessages: {
                    ...state.validationMessages,
                    ...action.payload
                }
            };

        default:
            return state;
    }
};
