import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { ProfileContext } from '../../contexts/profile';

import Avatar from '@mui/material/Avatar';

import VerifiedIcon from '@mui/icons-material/Verified';

import { Button } from '../general/Button';

import axios from '../../axios';

const Li = styled.li`
    border-bottom: 1px solid ${({ theme }) => theme.colors['#2f3336']};
    cursor: pointer;
    padding: 1em 5%;

    :hover {
        background: hsl(0, 0%, 5%);
    }
`;

const Figure = styled.figure`
    display: flex;
    gap: 1.25em;
`;

const Figcaption = styled.figcaption`
    flex: 100%;

    display: flex;
    flex-direction: column;

    line-height: 1.3;
    overflow: hidden;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
`;

const Author = styled.div`
    /* ensures text ellipsis works properly */
    overflow: hidden;
    width: 100%;

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
    margin-top: .25em;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Bio = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    margin-top: .75em;
`;

const UnfollowButton = styled(Button)`
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors['#eff3f4']};
    border: 1px solid rgb(83, 100, 113);
    border-radius: 1.25em;
    font-weight: ${({ theme }) => theme.font.weights.bold};
`;

const FollowButton = styled(Button)`
    background: ${({ theme }) => theme.colors.white};
    color: rgb(15, 20, 25);
`;

const FollowingItem = ({ name, handle, avatarUrl, bio, verified, followers, currentUserId, index }) => {

    const { dispatch } = useContext(ProfileContext);

    const navigate = useNavigate();

    const navigateToProfile = (event) => {
        if (event.target.nodeName !== 'BUTTON') {
            navigate(`/${handle}`);
        }

    }

    const followUser = async () => {
        try {

            const response = await axios.post(`/user/${handle}/follow`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_FOLLOWING_LIST', payload: { followerId: response.data.followerId, index } });
            }
        } catch (error) {
            console.log(error);
        }

    }

    const unfollowUser = async () => {
        try {

            const response = await axios.post(`/user/${handle}/unfollow`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_UNFOLLOWING_LIST', payload: { oldFollowerId: response.data.oldFollowerId, index } })
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Li onClick={navigateToProfile}>
            <article>
                <Figure>
                    <Avatar
                        sx={{ width: 50, height: 50, background: 'hsl(0, 3%, 42%)' }}
                        imgProps={{ loading: 'lazy' }}
                        src={avatarUrl}
                        alt={`${handle} profile picture`} />
                    <Figcaption>
                        <UserInfo>
                            <Author>
                                <Name>
                                    <span>{name}</span>
                                    {verified && <VerifiedIconSC />}
                                </Name>
                                <Handle>@{handle}</Handle>
                            </Author>

                            {followers.includes(currentUserId) ?
                                <UnfollowButton onClick={unfollowUser}>Following</UnfollowButton> :
                                <FollowButton onClick={followUser}>Follow</FollowButton>
                            }
                        </UserInfo>
                        
                        <Bio>{bio}</Bio>
                    </Figcaption>
                </Figure>
            </article>

        </Li>
    )
}

export default FollowingItem;