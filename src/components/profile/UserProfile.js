import { useEffect, useContext } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import Linkify from 'react-linkify';

import axios from '../../axios';

import { Button } from '../general/Button'

import { Link, NavLink, Outlet } from 'react-router-dom';

import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedIcon from '@mui/icons-material/Verified';

import { formatTweetDate } from '../../utils/formatTweetDate';

import { ProfileContext } from '../../contexts/profile';

const Header = styled.header`
border-bottom: 1px solid ${({ theme }) => theme.colors['#71767b']};
    color: ${({ theme }) => theme.colors['#e7e9ea']};
    padding: .75em;

    display: flex;
    align-items: center;
    gap: 1em;
`;

const ArrowBackIconSC = styled(ArrowBackIcon)`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
`;

const H1 = styled.h1`
    font-size: 1.4rem;
    margin-left: 1em;
`;

const Main = styled.main`
    max-width: 1000px;
    margin: 0 auto;

`;

const ProfileDetails = styled.section`
    margin: 1.5em auto .5em;
    width: 90%;
`;

const Figure = styled.figure`

`;

const Figcaption = styled.figcaption`
    display: flex;
    justify-content: space-between;

    > div {
        margin-top: .75em;
    }
`;

const Name = styled.h2`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
margin-bottom: .1em;
`;

const VerifiedIconSC = styled(VerifiedIcon)`
    font-size: 1rem;
    margin-left: 0.25em;
    `;

const Handle = styled.span`
    color: ${({ theme }) => theme.colors['#71767b']};
`;

const Bio = styled.p`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
    margin: 1em 0;

    a {
        color: ${({ theme }) => theme.colors.blue};
        display: inline-block;
        max-width: 200px;

        /* fixes weird vertical misalignment to the top created when linkify renders links */
        vertical-align: bottom;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
`;

const ButtonSC = styled(Button)`
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors['#eff3f4']};
    border: 1px solid rgb(83, 100, 113);
    border-radius: 1.25em;
    font-weight: ${({ theme }) => theme.font.weights.bold};

    align-self: center;
`;

const FollowButton = styled(Button)`
    background: ${({ theme }) => theme.colors.white};
    color: rgb(15, 20, 25);
    margin: 1em 0;
`;

const FollowDetails = styled.div`
    margin-top: .5em;
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

const NavLinkSC = styled(NavLink)`

    color: ${({ theme }) => theme.colors['#71767b']};
    font-weight: ${({ theme }) => theme.font.weights.bold};

    display: inline-block;
    padding: .4em;
    
    &.active {
        border-bottom: 3px solid ${({ theme }) => theme.colors.blue};
        color: ${({ theme }) => theme.colors['#e7e9ea']};
    }
`;

const Nav = styled.nav`
    border-bottom: 1px solid ${({ theme }) => theme.colors['#71767b']};
`;

const Ul = styled.ul`
    display: flex;
    gap: .25em;
    justify-content: space-between;

    width: 90%;
    max-width: 300px;

    li:first-child {
        margin-left: 2em;
    }
`;

const JoinDate = styled.span`
    display: flex;
    gap: .5em;
    align-items: center;

color: ${({ theme }) => theme.colors['#71767b']};

`;

const SectionNil = styled.section`
    margin: 2em;
`;

const FigcaptionNil = styled.figcaption`
    margin: 1em 0;
`;

const HandleNil = styled.span`
color: ${({ theme }) => theme.colors['#e7e9ea']};
font-weight: ${({ theme }) => theme.font.weights.bold};
font-size: 1.25rem;
`;

const H2Nil = styled.h2`
    font-size: 1.75rem;
    margin: .5em 0;
`;

const PNil = styled.p`
color: ${({ theme }) => theme.colors['#71767b']};

`;

const UserProfile = () => {
    const { state, dispatch } = useContext(ProfileContext);

    const { handle } = useParams();

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('../');
    }


    const followUser = async () => {
        try {

            const response = await axios.post(`/user/${handle}/follow`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_FOLLOW_PROFILE', payload: { followerId: response.data.followerId } });
            }
        } catch (error) {
            console.log(error);
        }

    }

    const unfollowUser = async () => {
        try {

            const response = await axios.post(`/user/${handle}/unfollow`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_UNFOLLOW_PROFILE', payload: { oldFollowerId: response.data.oldFollowerId } })
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const getUserProfile = async () => {
            try {

                const response = await axios.get(`/user/${handle}`);

                if (response?.data.success) {
                    dispatch({ type: 'SET_PROFILE', payload: { profile: response.data.user } })

                }
            } catch (error) {
                console.log(error)
            }
        }

        getUserProfile();
    }, [dispatch, handle]);

    const following = state.profile?.following;
    const followers = state.profile?.followers;

    return (
        <>

            <Header>
                <IconButton onClick={navigateToHome}>
                    <ArrowBackIconSC />
                </IconButton>
                <H1>Profile</H1>
            </Header>
            {
                state.profile ? (<>
                    <Main>
                        <ProfileDetails>
                            <Figure>
                                <Avatar sx={{ width: 70, height: 70, background: 'hsl(0, 3%, 42%)' }}
                                    src={state.profile?.avatarUrl}
                                    alt={`${state.profile?.handle} profile picture`} />

                                <Figcaption>
                                    <div>
                                        <Name>{state.profile?.name}</Name>
                                        {state.profile?.verified && <VerifiedIconSC />}
                                        <Handle>@{state.profile?.handle}</Handle>
                                    </div>

                                    {state.profile?._id === state.profile?.currentUserId ?
                                        <ButtonSC as={Link} to='edit-profile'>Edit profile</ButtonSC> :
                                        followers?.includes(state.profile?.currentUserId) ?
                                            <ButtonSC onClick={unfollowUser}>Following</ButtonSC> :
                                            <FollowButton onClick={followUser}>Follow</FollowButton>
                                    }
                                </Figcaption>
                            </Figure>
                            <Bio>
                                <Linkify componentDecorator={(decoratedHref, decoratedText, key) =>
                                    <a href={decoratedHref} target='_blank' key={key} rel="noreferrer">{decoratedText}</a>
                                }>
                                    {state.profile?.bio}
                                </Linkify>
                            </Bio>

                            <JoinDate><CalendarTodayIcon /> Joined {formatTweetDate(state.profile?.createdAt, true)}</JoinDate>

                            <FollowDetails>
                                <div><Link to='following'><span>{following?.length}</span> Following</Link></div>
                                <div><Link to='followers'><span>{followers?.length}</span> Followers</Link></div>
                            </FollowDetails>
                        </ProfileDetails>
                        <Nav>
                            <Ul>
                                <li><NavLinkSC to='tweets'>Tweets</NavLinkSC></li>
                                <li><NavLinkSC to='likes'>Likes</NavLinkSC></li>
                                <li><NavLinkSC to='retweets'>Retweets</NavLinkSC></li>
                            </Ul>
                        </Nav>

                        <Outlet />
                    </Main>
                </>) : (
                    <>
                        <SectionNil>
                            <figure>
                                <Avatar sx={{ width: 70, height: 70 }}
                                    src=''
                                    alt=''
                                />

                                <FigcaptionNil><HandleNil>@{handle}</HandleNil></FigcaptionNil>
                            </figure>

                            <H2Nil>This account doesn't exist</H2Nil>
                            <PNil>Try searching for another.</PNil>
                        </SectionNil>
                    </>
                )
            }

        </>
    )
}

export default UserProfile;