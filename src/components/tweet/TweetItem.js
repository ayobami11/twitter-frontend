import { useContext, Children } from 'react';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Linkify from 'react-linkify';

import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';

import { AppContext } from '../../contexts/app';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from '../../axios';

import { formatTimeElapsed } from '../../utils/formatTimeElapsed';
import { setRgbaValue } from '../../utils/setRgbaValue';

// import Image from '../../assets/images/image.jpg';

const Li = styled.li`
    border-bottom: 1px solid ${({ theme }) => theme.colors['#2f3336']};
    padding: 1em 5%;
`;

const Figure = styled.figure`
    display: flex;
    gap: 1.25em;
`;

const Figcaption = styled.figcaption`
    /* flex-basis: 100%; */
    
    /* necessary to ensure text ellipsis works */
    overflow: hidden;
    width: 100%;
`;

const Images = styled.div`
    --grid-gap: .5em;
    --grid-column-count: 2;
    --grid-item-min-width: 150px;

    --gap-count: calc(var(--grid-column-count) - 1);
    --total-gap-width: calc(var(--gap-count) * var(--grid-gap));
    --grid-gap-max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

    border-radius: .75em;
    margin: 1.5em auto;
    max-width: 550px;
    overflow: hidden;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(max(var(--grid-item-min-width), var(--grid-gap-max-width)), 1fr));
    gap: .5em;
`;

const Img = styled.img`
    background: grey;
    min-height: 100%;

    aspect-ratio: 1 / 1;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;

    margin-bottom: .75em;

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

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Bio = styled.p`    
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

const Time = styled.time`
    color: ${({ theme }) => theme.colors['#71767b']};
    white-space: nowrap;
    flex-shrink: 0;

    > span {
        margin-left: .5em;
    }
`;

const Menu = styled.menu`
    display: flex;
    justify-content: space-between;

    margin-top: 0.75em;
    max-width: 400px;

    color: ${({ theme }) => theme.colors['#71767b']};
`;

const TweetItem = ({ tweet, index }) => {
    const { state: { currentUserId }, dispatch } = useContext(AppContext);

    const navigate = useNavigate();

    const navigateToTweet = (event) => {
        // Navigates to the tweet details page only when a link in the tweet or reaction (like, retweet) is not clicked
        if (event.target.nodeName !== 'A' && !event.target.classList.contains('reaction')
            && ![...document.getElementsByClassName('reaction')].some(element => element.contains(event.target))) {
            navigate(`../${tweet.handle}/status/${tweet._id}`);
        }
    }

    const likeTweet = async () => {
        try {
            const response = await axios.post(`/tweets/${tweet._id}/like`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_LIKE', payload: { index } })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const unlikeTweet = async () => {
        try {
            const response = await axios.delete(`/tweets/${tweet._id}/unlike`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_UNLIKE', payload: { index } })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const retweetTweet = async () => {
        try {
            const response = await axios.post(`/tweets/${tweet._id}/retweet`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_RETWEET', payload: { index } })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const undoRetweet = async () => {
        try {
            const response = await axios.delete(`/tweets/${tweet._id}/undo-retweet`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_UNDO_RETWEET', payload: { index } })
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
                            <Author>
                                <Name>
                                    <span>{tweet.name}</span>
                                    {tweet.verified && <VerifiedIconSC />}
                                </Name>
                                <Handle>@{tweet.handle}</Handle>
                            </Author>
                            <Time>&middot;<span>{formatTimeElapsed(tweet.createdAt)}</span></Time>
                        </UserInfo>
                        {tweet.message && (
                            <Bio>
                                <Linkify componentDecorator={(decoratedHref, decoratedText, key) =>
                                    <a href={decoratedHref} target='_blank' key={key} rel="noreferrer">{decoratedText}</a>
                                }>
                                    {tweet.message}
                                </Linkify>
                            </Bio>
                        )
                        }

                        {tweet.images.length && (
                            <Images>
                                {Children.toArray(tweet.images.map(imageUrl => <Img src={imageUrl} alt={`Tweet posted by @${tweet.handle}`} loading='lazy' />))}
                                {/* <Img src={Image} alt='' /> */}
                                {/* <Img src={Image} alt='' />
                                <Img src={Image} alt='' />
                                <Img src={Image} alt='' /> */}
                            </Images>
                        )}

                        <Menu>
                            <li>
                                <CommentIcon>
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
                        </Menu>
                    </Figcaption>
                </Figure>
            </article>
        </Li >
    );
};

export default TweetItem;
