import { useReducer, useState, useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { reducer, initialState } from '../../reducers/login';

import axios from '../../axios';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Twitter from '@mui/icons-material/Twitter';

import { Button } from '../general/Button';
import { AppContext } from '../../contexts/app';

const Header = styled.header`
    margin: 1em 0;
    text-align: center;
`;

const TwitterLogo = styled(Twitter)`
    color: ${({ theme }) => theme.colors.white};
`;

const SignupLink = styled(Link)`
    color: ${({ theme }) => theme.colors.blue};
`;

const Section = styled.section`
    margin: 2em auto;
    width: 90%;

    max-width: 750px;
`;

const H1 = styled.h1`
    color: ${({ theme }) => theme.colors.white};
`;

const TextFieldSC = styled(TextField)`
    margin: 1em auto;    
    
    .MuiInputLabel-root {
        color: ${({ theme }) => theme.colors['#71767b']};

    }

    .MuiInputLabel-root.Mui-focused {
        color: ${({ theme }) => theme.colors.white};
        font-weight: ${({ theme }) => theme.font.weights.bold};
    }
    
    .MuiFilledInput-root {
        background: transparent;
    }

    .MuiFilledInput-root::after {
        border-color: ${({ theme }) => theme.colors.white};

    ${({ $checkValidity, $isInputValid }) => $checkValidity && !$isInputValid && `border-color: red`};
    }
    
    .MuiFilledInput-input {
        color: ${({ theme }) => theme.colors.white};
    }

    .MuiFilledInput-input:-webkit-autofill, 
    .MuiFilledInput-input:-webkit-autofill:hover,
    .MuiFilledInput-input:-webkit-autofill:focus,
    .MuiFilledInput-input:-webkit-autofill:active {
        box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.black} inset;
        -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
        caret-color: ${({ theme }) => theme.colors.white};
        transition: background-color 5000s ease-in-out 0s;
    }
    
    .MuiFilledInput-underline::before {
        border-color: darkgrey;
    }
    
    .MuiFilledInput-underline:hover:not(.Mui-disabled):before {
        border-color: gray;
    }

    .MuiInputLabel-asterisk {
        display: none;
    }
`;

const VisibilitySC = styled(Visibility)`
    color: ${({ theme }) => theme.colors.white};
`;

const VisibilityOffSC = styled(VisibilityOff)`
    color: ${({ theme }) => theme.colors.white};
`;

const ButtonSC = styled(Button)`
    background: ${({ theme }) => theme.colors.white};
    color: rgb(15, 20, 25);
    margin: 1.5em 0;

    &:hover {
        filter: brightness(85%);
    }
`;

const P = styled.p`
    color: ${({ theme }) => theme.colors['#71767b']};
`;

const attachTokenToRequest = (token = null) => {
    axios.defaults.headers['Authorization'] = token ? `Bearer ${token}` : '';
};

const Login = () => {
    const { dispatch: appDispatch } = useContext(AppContext);
    
    const [state, dispatch] = useReducer(reducer, initialState);

    const [checkValidity, setCheckValidity] = useState(false);


    const navigate = useNavigate();

    const handleInputChange = ({ target }) => {
        dispatch({
            type: 'UPDATE_LOGIN_DETAILS',
            payload: { [target.name]: target.value }
        });

        dispatch({
            type: 'VALIDATE_LOGIN_DETAILS',
            payload: { [target.name]: target.validationMessage }
        });
    };

    const showPassword = () => {
        dispatch({ type: 'SHOW_PASSWORD' });
    };

    const hidePassword = () => {
        dispatch({ type: 'HIDE_PASSWORD' });
    };

    const handleSubmit = event => {
        event.preventDefault();

        setCheckValidity(true);

        // always checks the validity of inputs before submission incase the onChange function (validity) 
        // handler is not triggered
        const formInputs = [...document.getElementsByClassName('form-input')];

        const inputsValid = formInputs.map(input => {
            dispatch({
                type: 'VALIDATE_LOGIN_DETAILS',
                payload: { [input.name]: input.validationMessage }
            });

            return input.validity.valid;
        });

        if (inputsValid.some(inputValidity => !inputValidity) ||
            Object.values(state.validationMessages).some(message => message.length)) return false;

        hidePassword();

        const submitLoginDetails = async () => {
            try {
                const response = await axios.post('/auth/login', state.loginDetails);

                if (response?.data.success) {
                    attachTokenToRequest(response.data.user.accessToken);

                    navigate('../home');


                }
            } catch (error) {
                if (error?.response) {
                    if (error.response.status === 401 || error.response.status === 404) {
                        appDispatch({ type: 'SET_ALERT', payload: { message: 'Invalid email or password.' } });
                    } else {
                        appDispatch({ type: 'SET_ALERT', payload: { message: 'Something went wrong. Please try again.' } });
                    }
                } else if (error?.message === 'Network Error') {
                    appDispatch({ type: 'SET_ALERT', payload: { message: 'Network error. Please try again.' } });
                }

            }
        };

        submitLoginDetails();
    };

    return (
        <>
            <Header>
                <TwitterLogo fontSize='large' />
            </Header>
            <main>
                <Section>

                    <H1>Sign in to Twitter</H1>
                    <form onSubmit={handleSubmit} noValidate>
                        <TextFieldSC
                            $checkValidity={checkValidity}
                            $isInputValid={!state.validationMessages.email}
                            id='email'
                            type='email'
                            name='email'
                            value={state.loginDetails.email}
                            placeholder='johndoe@email.com'
                            onChange={handleInputChange}
                            variant='filled'
                            inputProps={{ className: 'form-input' }}
                            label='Email'
                            fullWidth
                            required
                            helperText={checkValidity && state.validationMessages.email}
                            error={checkValidity && Boolean(state.validationMessages.email)}
                        />
                        <TextFieldSC
                            $checkValidity={checkValidity}
                            $isInputValid={!state.validationMessages.password}
                            id='password'
                            type={state.isPasswordVisible ? 'text' : 'password'}
                            name='password'
                            value={state.loginDetails.password}
                            onChange={handleInputChange}
                            inputProps={{ className: 'form-input', minLength: 8 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='Toggle password visibility'
                                            onClick={
                                                state.isPasswordVisible
                                                    ? hidePassword
                                                    : showPassword
                                            }
                                        >
                                            {state.isPasswordVisible ? (
                                                <VisibilityOffSC />
                                            ) : (
                                                <VisibilitySC />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            variant='filled'
                            label='Password'
                            fullWidth
                            required
                            helperText={checkValidity && state.validationMessages.password}
                            error={checkValidity && Boolean(state.validationMessages.password)}
                        />

                        <ButtonSC type='submit'>Log in</ButtonSC>
                    </form>
                    <P>Don't have an account? <SignupLink to='../signup'>Sign up</SignupLink></P>
                </Section>
            </main>
        </>
    );
};

export default Login;
