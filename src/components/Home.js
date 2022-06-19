import { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { ProfileContext } from '../contexts/profile';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import Sidebar from './general/Sidebar';
import TweetList from './tweet/TweetList';

import axios from '../axios';

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
    padding: 1em 5%;

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
    /* border: 1px solid red; */
    
    position: fixed;
    z-index: 5;
    
    bottom: 20px;
    right: 20px;
    `;

const AddCircleRoundedIconSC = styled(AddCircleRoundedIcon)`
    border-radius: 50%;
    font-size: 3rem;
    
    background: white;
    color: ${({ theme }) => theme.colors.blue};
    `;

const H1 = styled.h1``;

const Home = () => {
    const { state: { profile }, dispatch } = useContext(ProfileContext);

    const [isSidebarOpen, setisSidebarOpen] = useState(false);

    const openSidebar = () => {
        setisSidebarOpen(true);
    }

    const closeSidebar = () => {
        setisSidebarOpen(false);
    }

    useEffect(() => {
        const getUserProfile = async () => {
            try {

                const response = await axios.get('/user');

                if (response?.data.success) {
                    dispatch({ type: 'SET_PROFILE', payload: { profile: response.data.user } })
                }
            } catch (error) {
                console.log(error)
            }
        }

        getUserProfile();

    }, [dispatch]);

    return (<>
        {profile ? (
            <HomeContainer>
                <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />

                <Header>
                    <Div>
                        {/* <Link to={`../${profile?.handle}`}> */}
                        <IconButton onClick={openSidebar}>

                            <Avatar
                                sx={{ width: 50, height: 50 }}
                                src={profile?.avatarUrl ?? ''}
                                alt={`${profile?.handle ?? ''} profile picture`}
                            />
                        </IconButton>
                        {/* </Link> */}
                        <H1>Home</H1>
                    </Div>
                    <AutoAwesomeIcon />
                </Header >
                <Main>
                    <TweetList />
                    <TweetLink to='../tweet'>
                        <AddCircleRoundedIconSC />
                    </TweetLink>
                </Main>
            </HomeContainer>
        ) : null}</>
    );
};

export default Home;
