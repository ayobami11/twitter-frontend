import { useEffect, useContext, Children } from 'react';

import styled from 'styled-components';

import { useParams, useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { ProfileContext } from '../../contexts/profile';

import FollowerItem from './FollowerItem';

import axios from '../../axios';

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 1em;
    
    border-bottom: 1px solid ${({ theme }) => theme.colors['#2f3336']};
    padding: .5em 1em;
`;

const H1 = styled.h1`
    font-size: 1.5rem;
`;

const Main = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;

    ${({ $followers }) => !$followers && `
        align-items: center;
        justify-content: center;
        padding: 0 1em;
    `}
`;

const H2 = styled.h2`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
    font-size: 2rem;
    margin: .5em 0;
`;

const P = styled.p`
    color: ${({ theme }) => theme.colors['#71767b']};
`;

const Followers = () => {
    const { state, dispatch } = useContext(ProfileContext);

    const { handle } = useParams();

    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate(`/${handle}`);
    }

    useEffect(() => {
        const getFollowers = async () => {
            try {

                const response = await axios.get(`/user/${handle}/followers`);

                if (response?.data.success) {
                    dispatch({ type: 'SET_FOLLOWERS', payload: { followers: response.data.followers, currentUserId: response.data.currentUserId } });
                }

            } catch (error) {
                console.log(error);
            }

        }

        getFollowers();
    }, [dispatch, handle])

    return (
        <FlexContainer>
            <Header>
                <IconButton onClick={navigateToProfile}>
                    <ArrowBackIcon />
                </IconButton>
                <H1>Followers</H1>
            </Header>
            <Main $followers={state.followers.length}>
                {
                    state.followers.length ?
                        <ul>
                            {Children.toArray(state.followers.map((follower, index) => <FollowerItem {...follower} currentUserId={state.currentUserId} index={index} />))}
                        </ul> :
                        <>
                            <H2>Your nest is empty</H2>
                            <P>But it won't be for long! People following you will show up here.</P>
                        </>
                }
            </Main>
        </FlexContainer>
    )
}

export default Followers;