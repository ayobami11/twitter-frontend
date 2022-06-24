import { useState, useReducer, useContext } from 'react';

import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';

import { AppContext } from '../../contexts/app';

import { reducer, initialState } from '../../reducers/signup';

import axios from '../../axios';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Twitter from '@mui/icons-material/Twitter';

import { Button } from '../general/Button';

const SignupPage = styled.div`
    * {
        font-family: 'Inter', sans-serif;
    }
`;

const Header = styled.header`
    margin: 1em 0;
    text-align: center;
`;

const TwitterLogo = styled(Twitter)`
    color: ${({ theme }) => theme.colors.white};
`;

const LoginLink = styled(Link)`
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
        color: hsl(0, 85%, 60%);
    }
`;

const AtIcon = styled.span`
    color: ${({ theme }) => theme.colors['#71767b']};
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

const Signup = () => {
    const { dispatch: appDispatch } = useContext(AppContext);

    const [state, dispatch] = useReducer(reducer, initialState);

    const [checkValidity, setCheckValidity] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = ({ target }) => {
        dispatch({
            type: 'UPDATE_SIGNUP_DETAILS',
            payload: { [target.name]: target.value }
        });

        dispatch({
            type: 'VALIDATE_SIGNUP_DETAILS',
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
                type: 'VALIDATE_SIGNUP_DETAILS',
                payload: { [input.name]: input.validationMessage }
            });

            return input.validity.valid;
        });

        if (inputsValid.some(inputValidity => !inputValidity) ||
            Object.values(state.validationMessages).some(message => message.length)) return false;

        hidePassword();

        const submitSignupDetails = async () => {

            try {

                const response = await axios.post('/auth/signup', state.signupDetails);

                if (response?.data.success) {
                    appDispatch({ type: 'SET_ALERT', payload: { message: 'Signup successful.' } });

                    setTimeout(() => navigate('/login'), 2500);
                }
            } catch (error) {
                console.log(error);

                if (error?.response) {
                    if (error.response.data?.message?.startsWith('email')) {
                        appDispatch({ type: 'SET_ALERT', payload: { message: 'Email has been taken.' } });
                    } else if (error.response?.data.message?.startsWith('handle')) {
                        appDispatch({ type: 'SET_ALERT', payload: { message: 'Handle has been taken.' } });
                    } else {
                        appDispatch({ type: 'SET_ALERT', payload: { message: 'Something went wrong. Please try again.' } });
                    }
                } else if (error?.message === 'Network Error') {
                    appDispatch({ type: 'SET_ALERT', payload: { message: 'Network error. Please try again.' } });
                }
            }
        }

        submitSignupDetails();

    };

    return (
        <SignupPage>
            <Header>
                <TwitterLogo fontSize='large' />
            </Header>
            <main>
                <Section>

                    <H1>Join Twitter today</H1>
                    <form onSubmit={handleSubmit} noValidate>
                        <TextFieldSC
                            $checkValidity={checkValidity}
                            $isInputValid={!state.validationMessages.name}
                            id='name'
                            type='text'
                            name='name'
                            value={state.signupDetails.name}
                            onChange={handleInputChange}
                            variant='filled'
                            label='Name'
                            placeholder='John Doe'
                            inputProps={{ className: 'form-input', maxLength: 20 }}
                            fullWidth
                            required
                            helperText={checkValidity && state.validationMessages.name}
                            error={checkValidity && Boolean(state.validationMessages.name)}
                        />
                        <TextFieldSC
                            $checkValidity={checkValidity}
                            $isInputValid={!state.validationMessages.handle}
                            id='handle'
                            type='text'
                            name='handle'
                            value={state.signupDetails.handle}
                            placeholder='johndoe'
                            inputProps={{ className: 'form-input', maxLength: 20 }}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <InputAdornment position='start'><AtIcon>@</AtIcon></InputAdornment>
                            }}
                            variant='filled'
                            label='Handle'
                            fullWidth
                            required
                            helperText={checkValidity && state.validationMessages.handle}
                            error={checkValidity && Boolean(state.validationMessages.handle)}
                        />
                        <TextFieldSC
                            $checkValidity={checkValidity}
                            $isInputValid={!state.validationMessages.email}
                            id='email'
                            type='email'
                            name='email'
                            value={state.signupDetails.email}
                            placeholder='johndoe@email.com'
                            inputProps={{ className: 'form-input' }}
                            onChange={handleInputChange}
                            variant='filled'
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
                            inputProps={{ className: 'form-input', minLength: 8 }}
                            value={state.signupDetails.password}
                            onChange={handleInputChange}
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
                            required
                            fullWidth
                            helperText={checkValidity && state.validationMessages.password}
                            error={checkValidity && Boolean(state.validationMessages.password)}
                        />

                        <ButtonSC type='submit'>Sign up</ButtonSC>
                    </form>
                    <P>Have an account already? <LoginLink to='/login'>Log in</LoginLink></P>
                </Section>
            </main>
        </SignupPage>
    );
};

export default Signup;
