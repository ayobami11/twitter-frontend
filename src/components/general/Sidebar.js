import { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import VerifiedIcon from '@mui/icons-material/Verified';
import CloseIcon from '@mui/icons-material/Close';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';

import axios from '../../axios';

// import { setRgbaValue } from '../../utils/setRgbaValue';

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

    transition: all 750ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
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




const Name = styled(Link)`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
    font-weight: ${({ theme }) => theme.font.weights.bold};
        display: block;

    > span {
        margin-left: .25em;
    }
`;

const VerifiedIconSC = styled(VerifiedIcon)`
    font-size: 1rem;
    margin-left: 0.25em;
`;

const Handle = styled(Link)`
    color: ${({ theme }) => theme.colors['#71767b']};
    display: block;
    margin-top: .25em;
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
            navigate('../login');
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
                    <Link to={`../${profile?.handle}`}>
                        <Avatar
                            sx={{ width: 55, height: 55 }}
                            src={profile?.avatarUrl ?? ''}
                            alt={`${profile?.handle ?? ''} profile picture`}
                        />
                    </Link>
                    <Figcaption>
                        <Name to={`../${profile?.handle}`}>

                            {profile?.name || 'Ayobami'} {true && <VerifiedIconSC />}
                        </Name>
                        <Handle to={`../${profile?.handle}`}>

                            @{profile?.handle || 'ayobami11'}
                        </Handle>
                    </Figcaption>
                </figure>


                <FollowDetails>
                    <div><Link to={`../${profile?.handle}/following`}><span>{profile?.following.length || 44}</span> Following</Link></div>
                    <div><Link to={`../${profile?.handle}/followers`}><span>{profile?.followers.length || 20}</span> Followers</Link></div>
                </FollowDetails>
            </ProfileInfo>
            <Nav>
                <ul>
                    <Li>
                        <Link to={`../${profile?.handle}/profile`}>
                            <PermIdentityIcon />
                            Profile
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