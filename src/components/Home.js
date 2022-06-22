import { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { AppContext } from '../contexts/app';
import { ProfileContext } from '../contexts/profile';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddIcon from '@mui/icons-material/Add';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { CircularProgressWithIcon } from './general/CircularProgressWithIcon';
import { Button } from './general/Button';
import Sidebar from './general/Sidebar';

import TweetList from './tweet/TweetList';

import axios from '../axios';

const AddIconSC = styled(AddIcon)`
    background: ${({ theme }) => theme.colors.blue};
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.white};

    font-size: 3rem;
    padding: .1em;

`;

const HomeContainer = styled.div`    
    max-width: 800px;
    margin: 0 auto;
    
    @media (min-width: 800px) {
        border: 1px solid ${({ theme }) => theme.colors['#2f3336']};
        border-radius: .5em;
        margin: 1em auto;
    }
`;

const Header = styled.header`
    border-radius: .5em .5em 0 0;
    padding: calc(.5em + .5vw) 5%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: sticky;
    top: 0;
    z-index: 5;

    background: ${({ theme }) => theme.colors.black};
    border-bottom: 1px solid ${({ theme }) => theme.colors['#2f3336']};
`;

const Div = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
`;

const Main = styled.main`
    
`;

const TweetLink = styled(Link)`
    display: block;
    border-radius: 50%;
    
    position: fixed;
    z-index: 5;
    
    bottom: 20px;
    right: 20px;
`;


const H1 = styled.h1``;

const ErrorContainer = styled.div`
    margin: 2em;
    text-align: center;

    p {
        font-size: 1.25rem;
        font-weight: ${({ theme }) => theme.font.weights.bold};
    }

    button {
        margin: 2em auto;
    }
`;

const handleRefresh = () => window.location.reload();


const Home = () => {
    const { state: { profile }, dispatch } = useContext(ProfileContext);
    const { dispatch: appDispatch } = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setisSidebarOpen] = useState(false);

    const openSidebar = () => {
        setisSidebarOpen(true);
    }

    const closeSidebar = () => {
        setisSidebarOpen(false);
    }

    useEffect(() => {
        const getInitialData = async () => {
            try {
                const response = await Promise.all([axios.get('/user'), axios.get('/tweets')]);

                if (Array.isArray(response)) {
                    const [userResponse, tweetsResponse] = response;

                    if (userResponse.data.success) {
                        dispatch({ type: 'SET_PROFILE', payload: { profile: userResponse.data.user } })
                    }

                    if (tweetsResponse.data.success) {
                        appDispatch({ type: 'SET_TWEETS', payload: { tweets: tweetsResponse.data.tweets } });

                        appDispatch({ type: 'SET_CURRENT_USER_ID', payload: { currentUserId: tweetsResponse.data.currentUserId } });
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);

            }
        }

        getInitialData();
    }, [appDispatch, dispatch])

    return (
        <>
            {
                loading ? <CircularProgressWithIcon /> :
                    profile ? (
                        <HomeContainer>
                            <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />

                            <Header>
                                <Div>
                                    <IconButton onClick={openSidebar}>

                                        <Avatar
                                            sx={{ width: 50, height: 50 }}
                                            src={profile?.avatarUrl ?? ''}
                                            alt={`${profile?.handle ?? ''} profile picture`}
                                        />
                                    </IconButton>
                                    <H1>Home</H1>
                                </Div>
                                <AutoAwesomeIcon />
                            </Header >
                            <Main>
                                <TweetList />
                                <TweetLink to='/tweet'>
                                    <AddIconSC />
                                </TweetLink>
                            </Main>
                        </HomeContainer>
                    ) : (
                        <ErrorContainer>
                            <p>Something went wrong, but don't fret - it's not your fault.</p>
                            <Button onClick={handleRefresh}>Refresh</Button>
                        </ErrorContainer>
                    )}
        </>
    );
};

export default Home;
