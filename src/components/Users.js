import { useEffect, useContext, Children } from 'react';

import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AppContext } from '../contexts/app';

import UserItem from './UserItem';

import axios from '../axios';

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

const ArrowBackIconSC = styled(ArrowBackIcon)`

    color: ${({ theme }) => theme.colors['#e7e9ea']};
    
    `;

const H1 = styled.h1`
    font-size: 1.5rem;
`;

const Main = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;

    ${({ $users }) => !$users && `
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

const Users = () => {
    const { state, dispatch } = useContext(AppContext);

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate(`/home`);
    }

    useEffect(() => {
        const getUsers = async () => {
            try {

                const response = await axios.get(`/users`);

                if (response?.data.success) {
                    dispatch({ type: 'SET_USERS', payload: { users: response.data.users } });

                    dispatch({ type: 'SET_CURRENT_USER_ID', payload: { currentUserId: response.data.currentUserId } });
                }

            } catch (error) {
                console.log(error);
            }

        }

        getUsers();
    }, [dispatch])

    return (
        <FlexContainer>
            <Header>
                <IconButton onClick={navigateToHome}>
                    <ArrowBackIconSC />
                </IconButton>
                <H1>Users</H1>
            </Header>
            <Main $users={state.users.length}>
                {
                    state.users.length ?
                        <ul>
                            {Children.toArray(state.users.map((user, index) => <UserItem {...user} currentUserId={state.currentUserId} index={index} />))}
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

export default Users;