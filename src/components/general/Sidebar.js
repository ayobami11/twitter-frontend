import { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import VerifiedIcon from '@mui/icons-material/Verified';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';

import axios from '../../axios';

import { ProfileContext } from '../../contexts/profile';

const Aside = styled.aside`
    background: ${({ theme }) => theme.colors.black};
    border-bottom: 1px solid ${({ theme }) => theme.colors['#2f3336']};
    border-right: 1px solid ${({ theme }) => theme.colors['#2f3336']};
    white-space: nowrap;

    /* height: 100%; */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;

    width: ${({ $sidebarOpen }) => $sidebarOpen ? '300px' : '0'};
    opacity: ${({ $sidebarOpen }) => $sidebarOpen ? '1' : '0'};
    height: ${({ $sidebarOpen }) => $sidebarOpen ? '100%' : '0'};
    /* min-width: 300px; */

    transition: all 500ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    overflow: hidden;
    line-height: 1.5;
`;

const Header = styled.header`
    margin: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const H1 = styled.h1`
    font-size: 1.25rem;
`;

const ProfileInfo = styled.section`
    margin: 1em;
`;


// const Figure = styled.figure``;

const Figcaption = styled.figcaption`
    margin-top: .5em;
`;

const Name = styled.p`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
    font-weight: ${({ theme }) => theme.font.weights.bold};

    display: flex;
    align-items: center;
    gap: .25em;
    /* prevents flex parent from growing bigger than necessary */
    max-width: fit-content;
    
    span {
        flex: 1;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const VerifiedIconSC = styled(VerifiedIcon)`
    font-size: 1rem;
`;

const Handle = styled.p`
    color: ${({ theme }) => theme.colors['#71767b']};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const CloseIconSC = styled(CloseIcon)`
    color: ${({ theme }) => theme.colors.white};
`;


const FollowDetails = styled.div`
    margin-top: 1em;
    display: flex;
    gap: 2em;

    div {
        color: ${({ theme }) => theme.colors['#71767b']};
    }

    span {
        color: ${({ theme }) => theme.colors['#e7e9ea']};
        font-weight: ${({ theme }) => theme.font.weights.bold};
    }
    `;

const Nav = styled.nav`
    border-bottom: 1px solid ${({ theme }) => theme.colors['#2f3336']};
    border-top: 1px solid ${({ theme }) => theme.colors['#2f3336']};
    margin: .25em 0;
`;

const Li = styled.li`
    a,
    button {
        background: transparent;
        color: ${({ theme }) => theme.colors['#e7e9ea']};
        font-size: 1.1rem;
        padding: 1em;

        display: flex;
        align-items: center;
        gap: 1em;

        &:hover {
            background: rgba(18, 18, 18, 0.625);
        }
    }
`;

const LogoutButton = styled.button`
    cursor: pointer;
    border: none;
    width: 100%;
`;

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
    const { state: { profile } } = useContext(ProfileContext);

    const navigate = useNavigate();

    const logoutUser = async () => {
        const response = await axios.post('/user/logout');

        if (response?.data.success) {
            navigate('/login');
        }
    }

    return (
        <Aside $sidebarOpen={isSidebarOpen}>
            <Header>
                <H1>Account info</H1>

                <IconButton onClick={closeSidebar} aria-label='Close'>
                    <CloseIconSC />
                </IconButton>
            </Header>

            <ProfileInfo>

                <figure>
                    <Link to={`/${profile?.handle}`}>
                        <Avatar
                            sx={{ width: 55, height: 55, background: 'hsl(0, 3%, 42%)' }}
                            src={profile?.avatarUrl ?? ''}
                            alt={`${profile?.handle ?? ''} profile picture`}
                        />
                    </Link>
                    <Figcaption>
                        <Link to={`/${profile?.handle}`}>
                            <Name>
                                <span>{profile?.name}</span>

                                {profile?.verified && <VerifiedIconSC />}
                            </Name>
                            <Handle>@{profile?.handle}</Handle>
                        </Link>
                    </Figcaption>
                </figure>


                <FollowDetails>
                    <div><Link to={`/${profile?.handle}/following`}><span>{profile?.following.length}</span> Following</Link></div>
                    <div><Link to={`/${profile?.handle}/followers`}><span>{profile?.followers.length}</span> Followers</Link></div>
                </FollowDetails>
            </ProfileInfo>
            <Nav>
                <ul>
                    <Li>
                        <Link to={`/${profile?.handle}`}>
                            <PersonIcon />
                            Profile
                        </Link>
                    </Li>
                    <Li>
                        <Link to='/users'>
                            <PeopleAltIcon />
                            Users
                        </Link>
                    </Li>
                    <Li>
                        <LogoutButton onClick={logoutUser}>
                            <LogoutIcon />
                            Logout
                        </LogoutButton>
                    </Li>
                </ul>
            </Nav>
        </Aside>
    )
}

export default Sidebar;