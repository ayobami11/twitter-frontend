import { useState, useContext, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import axios from '../../axios';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraEnhanceOutlinedIcon from '@mui/icons-material/CameraEnhanceOutlined';

import { AppContext } from '../../contexts/app';
import { ProfileContext } from '../../contexts/profile';

import TextField from '@mui/material/TextField';

const Header = styled.header`
    border-bottom: 1px solid ${({ theme }) => theme.colors['#71767b']};
    color: ${({ theme }) => theme.colors['#e7e9ea']};

    display: flex;
    justify-content: space-between;
    padding: .75em;

    div {
        display: flex;
        align-items: center;
        gap: 1em;
    }
`;

const ArrowBackIconSC = styled(ArrowBackIcon)`
color: ${({ theme }) => theme.colors['#e7e9ea']};
`;

const H1 = styled.h1`
    font-size: 1.4rem;
    margin-left: 1em;
`;

const Button = styled.button`
    background: transparent;
    color: ${({ theme }) => theme.colors.white};
    border: none;
    font-weight: ${({ theme }) => theme.font.weights.bold};
    font-size: 1.125rem;
`;

const Section = styled.section`
    margin: 2em auto;
    width: 90%;

    max-width: 750px;
`;

const ImageContainer = styled.div`
    cursor: pointer;
    position: relative;
    width: fit-content;

    margin: 2em auto;
`;

const Input = styled.input`
  width: 1px;
  height: 1px;
  opacity: 0;
  position: absolute;
`;

const AvatarSC = styled(Avatar)`
    filter: brightness(80%);
`;

const CameraEnhanceOutlinedIconSC = styled(CameraEnhanceOutlinedIcon)`
    color: ${({ theme }) => theme.colors.white};

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2em;
`;

const TextFieldSC = styled(TextField)`
    margin: 1em auto;
    
    .MuiInputLabel-root {
        color: ${({ theme }) => theme.colors['#71767b']};

    }

    .MuiInputLabel-root.Mui-focused {
        /* color: ${({ theme }) => theme.colors.white}; */
    }
    
    .MuiFilledInput-root {
        background: transparent;
    }

    .MuiFilledInput-root::after {
        border-color: ${({ theme }) => theme.colors.blue};

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
        border-color: ${({ theme }) => theme.colors['#71767b']};
    }
    
    .MuiFilledInput-underline:hover:not(.Mui-disabled):before {
        border-color: gray;
    }

    .MuiInputLabel-asterisk {
        color: hsl(0, 85%, 60%);
    }
    `;

const EditProfile = () => {
    const { dispatch: appDispatch } = useContext(AppContext);
    const { state, dispatch } = useContext(ProfileContext);

    const navigate = useNavigate();

    const { handle } = useParams();

    const [checkValidity, setCheckValidity] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleInputChange = ({ target }) => {
        dispatch({
            type: 'UPDATE_PROFILE_DETAILS',
            payload: { [target.name]: target.value }
        });

        dispatch({
            type: 'VALIDATE_PROFILE_DETAILS',
            payload: { [target.name]: target.validationMessage }
        });
    }

    const handleFileChange = (event) => {
        // order of conditionals is important
        if (event.target.files[0]?.name) setProfilePicture(event.target.files[0]);

        if (imageUrl) URL.revokeObjectURL(imageUrl);

        if (event.target.files[0]?.name) setImageUrl(URL.createObjectURL(event.target.files[0]));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setCheckValidity(true);

        // always checks the validity of inputs before submission incase the onChange function (validity) 
        // handler is not triggered
        const formInputs = [...document.getElementsByClassName('form-input')];

        const inputsValid = formInputs.map(input => {
            dispatch({
                type: 'VALIDATE_USER_DETAILS',
                payload: { [input.name]: input.validationMessage }
            });

            return input.validity.valid;
        });

        if (inputsValid.some(inputValidity => !inputValidity) ||
            Object.values(state.validationMessages).some(message => message.length)) return false;

        const updateUserProfile = async () => {
            try {
                const formData = new FormData();

                formData.append('name', state.profileDetails.name);
                formData.append('bio', state.profileDetails.bio);
                formData.append('profile_picture', profilePicture);

                const response = profilePicture?.name ?
                    await axios.put('/user/edit-profile?avatar=true', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }) :
                    await axios.put('/user/edit-profile', { name: state.profileDetails.name, bio: state.profileDetails.bio });

                if (response?.data.success) {
                    appDispatch({ type: 'SET_ALERT', payload: { message: 'Profile updated successfully.' } })
                }
            } catch (error) {
                console.log(error);
            }
        };

        updateUserProfile();
    }

    const navigateToProfile = () => {
        navigate(`../${handle}`);
    }

    useEffect(() => {
        const getUserProfile = async () => {
            try {

                const response = await axios.get('/user');

                if (response?.data.success) {
                    dispatch({ type: 'SET_PROFILE', payload: { profile: response.data.user } });
                }
            } catch (error) {
                console.log(error)
            }
        }

        getUserProfile();

    }, [dispatch]);


    return (
        <>
            <Header>
                <div>
                    <IconButton onClick={navigateToProfile}>
                        <ArrowBackIconSC />
                    </IconButton>
                    <H1>Edit profile</H1>
                </div>
                <Button type='submit' form='profile-form'>Save</Button>
            </Header>

            <main>
                <Section>

                    <form id='profile-form' onSubmit={handleSubmit} noValidate>

                        <label htmlFor="profile_picture">
                            <ImageContainer>

                                <AvatarSC
                                    sx={{ width: 100, height: 100 }}
                                    src={imageUrl || state.profile?.avatarUrl}
                                    alt={`${state.profile?.handle} profile picture`}
                                />

                                <CameraEnhanceOutlinedIconSC />
                            </ImageContainer>
                        </label>

                        <Input type="file" name="profile_picture" id="profile_picture" accept='image/*' onChange={handleFileChange} />

                        <TextFieldSC
                            $checkValidity={checkValidity}
                            $isInputValid={!state.validationMessages.name}
                            id='name'
                            type='text'
                            name='name'
                            value={state.profileDetails.name}
                            onChange={handleInputChange}
                            variant='filled'
                            label='Name'
                            inputProps={{ className: 'form-input' }}
                            fullWidth
                            required
                            helperText={checkValidity && state.validationMessages.name}
                            error={checkValidity && Boolean(state.validationMessages.name)}
                        />
                        <TextFieldSC
                            $checkValidity={checkValidity}
                            $isInputValid={!state.validationMessages.bio}
                            id='bio'
                            type='text'
                            name='bio'
                            value={state.profileDetails.bio}
                            onChange={handleInputChange}
                            variant='filled'
                            label='Bio'
                            inputProps={{ className: 'form-input' }}
                            fullWidth
                            multiline
                            helperText={checkValidity && state.validationMessages.bio}
                            error={checkValidity && Boolean(state.validationMessages.bio)}
                        />

                    </form>
                </Section>

            </main>
        </>
    )
}

export default EditProfile;