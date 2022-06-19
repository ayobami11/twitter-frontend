import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';

// import { AppContext } from '../../contexts/app';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from '../../axios';

import { formatTimeElapsed } from '../../utils/formatTimeElapsed';
import { setRgbaValue } from '../../utils/setRgbaValue';
import { ProfileContext } from '../../contexts/profile';

const Li = styled.li`
    border-bottom: 1px solid ${({ theme }) => theme.colors['#2f3336']};
    padding: 1em 5%;
`;

const Figure = styled.figure`
    display: flex;
`;

const Figcaption = styled.figcaption`
    margin-left: 1em;
    flex: 100%;
`;

const UserInfo = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AuthorDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 2px solid green;
    width: 90%;
`;

const Author = styled.div`
    border: 1px solid blue;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Name = styled.p`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
    font-weight: ${({ theme }) => theme.font.weights.bold};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    display: inline-block;
    /* max-width: 100px; */

    border: 1px solid red;
`;
const Handle = styled.span`
    color: ${({ theme }) => theme.colors['#71767b']};
    border: 1px solid red;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    /* display: inline-block; */
    /* min-width: 0;
    width: 20%; */
`;
const VerifiedIconSC = styled(VerifiedIcon)`
    font-size: 1rem;
    margin-left: 0.25em;
`;

const Button = styled.button`

    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors['#71767b']};
    cursor: pointer;
    position: relative;
    z-index: 3;
    
    /* pointer-events: none; */
`;

const Reaction = styled(Button)`
display: flex;
align-items: center;
gap: 0.5em;

`;

const FontAwesomeIconSC = styled(FontAwesomeIcon)`
    padding: 0.5em;
    border-radius: 50%;

    font-size: 1.125rem;
`;

const EllipsisIcon = styled(FontAwesomeIconSC)`
    color: ${({ theme }) => theme.colors['#71767b']};

    :hover {
        background: ${({ theme }) => setRgbaValue(theme.colors.blue, 0.09)};
        color: ${({ theme }) => theme.colors.blue};
    }
`;

const CommentIcon = styled(Reaction)`
    :hover {
        svg {
            background: ${({ theme }) => setRgbaValue(theme.colors.blue, 0.09)};
        }

        path,
        span {
            color: ${({ theme }) => theme.colors.blue};
        }
    }
`;

const RetweetIcon = styled(Reaction)`
    path, 
    span {
        color: ${({ theme, $retweeted }) => $retweeted && theme.colors.green};
    }

    :hover {
        svg {
            background: ${({ theme }) =>
        setRgbaValue(theme.colors.green, 0.09)};
        }

        path,
        span {
            color: ${({ theme }) => theme.colors.green};
        }
    }
`;

const LikeIcon = styled(Reaction)`
    path, 
    span {
        color: ${({ theme, $liked }) => $liked && theme.colors.pink};
    }

    :hover {
        svg {
            background: ${({ theme }) => setRgbaValue(theme.colors.pink, 0.09)};
        }

        path,
        span {
            color: ${({ theme }) => theme.colors.pink};
        }
    }
`;

const ShareIcon = styled(Reaction)`
    :hover {
        svg {
            background: ${({ theme }) => setRgbaValue(theme.colors.blue, 0.09)};
        }

        path,
        span {
            color: ${({ theme }) => theme.colors.blue};
        }
    }
`;

const Time = styled.time`
    color: ${({ theme }) => theme.colors['#71767b']};

    white-space: nowrap;
`;

const Menu = styled.menu`
    display: flex;
    justify-content: space-between;

    margin-top: 0.75em;

    color: ${({ theme }) => theme.colors['#71767b']};
`;

const LikedTweet = ({ tweet, index }) => {
    const { state: { currentUserId }, dispatch } = useContext(ProfileContext);

    const navigate = useNavigate();

    const navigateToTweet = (event) => {
        if (!event.target.classList.contains('reaction')
            && ![...document.getElementsByClassName('reaction')]
                .some(element => element.contains(event.target))) {
            navigate(`../../${tweet.handle}/status/${tweet.tweetId}`);
        }
    }

    const likeTweet = async () => {
        try {
            const response = await axios.post(`/tweets/${tweet.tweetId}/like`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_LIKE', payload: { index, reactionTab: 'likes' } });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const unlikeTweet = async () => {
        try {
            const response = await axios.delete(`/tweets/${tweet.tweetId}/unlike`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_UNLIKE', payload: { index, reactionTab: 'likes' } })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const retweetTweet = async () => {
        try {
            const response = await axios.post(`/tweets/${tweet.tweetId}/retweet`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_RETWEET', payload: { index, reactionTab: 'likes' } })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const undoRetweet = async () => {
        try {
            const response = await axios.delete(`/tweets/${tweet.tweetId}/undo-retweet`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_UNDO_RETWEET', payload: { index, reactionTab: 'likes' } })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isTweetLiked = tweet.likes?.includes(currentUserId);
    const isTweetRetweeted = tweet.retweets?.includes(currentUserId);

    return (
        <Li onClick={navigateToTweet}>
            <article>
                <Figure>
                    <Avatar
                        sx={{ width: 50, height: 50 }}
                        src={tweet.avatarUrl}
                        alt={`${tweet.handle} profile picture`}
                    />
                    <Figcaption>

                        <UserInfo>
                            <AuthorDetails>
                                <Author>
                                    <Name>{tweet.name}</Name>
                                    {tweet.verified && <VerifiedIconSC />}
                                </Author>
                                <Handle>@{tweet.handle}</Handle>
                                <Time>
                                    {formatTimeElapsed(tweet.createdAt)}
                                </Time>
                            </AuthorDetails>
                            <Button className='reaction'>
                                <EllipsisIcon icon='fa-solid fa-ellipsis' />
                            </Button>
                        </UserInfo>
                        <p>{tweet.message}</p>

                        <Menu>
                            <li>
                                <CommentIcon className='reaction'>
                                    <FontAwesomeIconSC icon='fa-regular fa-comment' />
                                    <span>{tweet.comments.length || ''}</span>
                                </CommentIcon>
                            </li>
                            <li>
                                <RetweetIcon className='reaction' onClick={
                                    isTweetRetweeted ? undoRetweet : retweetTweet} $retweeted={isTweetRetweeted}>
                                    <FontAwesomeIconSC icon='fa-solid fa-retweet' />
                                    <span>{tweet.retweets.length || ''}</span>
                                </RetweetIcon>
                            </li>
                            <li>
                                <LikeIcon className='reaction' onClick={
                                    isTweetLiked ? unlikeTweet : likeTweet} $liked={isTweetLiked}>
                                    {isTweetLiked ?
                                        <FontAwesomeIconSC icon='fa-solid fa-heart' />
                                        :
                                        <FontAwesomeIconSC icon='fa-regular fa-heart' />
                                    }
                                    <span>{tweet.likes.length || ''}</span>
                                </LikeIcon>
                            </li>
                            <li>
                                <ShareIcon className='reaction'>
                                    <FontAwesomeIconSC icon='fa-solid fa-arrow-up-from-bracket' />
                                </ShareIcon>
                            </li>
                        </Menu>
                    </Figcaption>
                </Figure>
            </article>
        </Li>
    );
};

export default LikedTweet;
