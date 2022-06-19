import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { ProfileContext } from '../../contexts/profile';

import Avatar from '@mui/material/Avatar';

import { Button } from '../general/Button';

import axios from '../../axios';

const Li = styled.li`
    margin: 1em 0;
`;

const Figure = styled.figure`
    display: flex;
    gap: 1.25em;
`;

const Figcaption = styled.figcaption`
    display: flex;
    flex-direction: column;

    line-height: 1.3;
    width: 100%;

    > div {
        display: flex;
        gap: 1em;
        justify-content: space-between;

        margin: .25em 0;
        
        button {
            align-self: center;
        }
    }
`;

const Name = styled.span`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
    font-weight: ${({ theme }) => theme.font.weights.bold};
    display: block;
`;


const Handle = styled.span`
    color: ${({ theme }) => theme.colors['#71767b']};
    display: block;
`;

const Bio = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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

const FollowingItem = ({ name, handle, avatarUrl, bio = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores placeat itaque ipsam officia quidem praesentium fugit accusamus odio quaerat fuga, consequatur molestias ullam expedita commodi laudantium quasi dolorum voluptatum necessitatibus!', followers, currentUserId, index }) => {

    const { dispatch } = useContext(ProfileContext);

    const navigate = useNavigate();

    const navigateToProfile = (event) => {
        if (event.target.nodeName !== 'BUTTON') {
            navigate(`../${handle}`);
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
                    <Avatar sx={{ width: 50, height: 50 }}
                        src={avatarUrl}
                        alt={`${handle} profile picture`} />
                    <Figcaption>
                        <div>
                            <div>
                                <Name>{name}</Name>
                                <Handle>@{handle}</Handle>
                            </div>

                            {followers.includes(currentUserId) ?
                                <UnfollowButton onClick={unfollowUser}>Following</UnfollowButton> :
                                <FollowButton onClick={followUser}>Follow</FollowButton>
                            }
                        </div>
                        <Bio>{bio}</Bio>

                    </Figcaption>
                </Figure>
            </article>

        </Li>
    )
}

export default FollowingItem;