import { useState, useEffect, useContext, Children } from 'react';

import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components';

import Linkify from 'react-linkify';

import { TweetContext } from '../../contexts/tweet';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';

import { CircularProgressWithIcon } from '../general/CircularProgressWithIcon';
import { DropdownMenu } from '../general/DropdownMenu';

import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';

import { formatTweetTime } from '../../utils/formatTweetTime';
import { formatTweetDate } from '../../utils/formatTweetDate';
import { setRgbaValue } from '../../utils/setRgbaValue';

import axios from '../../axios';

const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 1em;

    position: sticky;
    top: 0;
    z-index: 2;

    border-bottom: 1px solid ${({ theme }) => theme.colors['#2f3336']};
    background: ${({ theme }) => theme.colors.black};
    padding: 1em;
`;

const Tweet = styled.div`
    max-width: 800px;
    margin: 0 auto;

    @media (min-width: 800px) {
        border: 1px solid ${({ theme }) => theme.colors['#2f3336']};
        border-radius: .5em;
        margin: 2em auto;
    }
`;

const H2Nil = styled.h2`
    margin: 1em;
`;

const ArticleHeader = styled.header`
    margin: 1em 0;

    display: flex;
    justify-content: space-between;
`;

const Article = styled.article`
    padding: 1em;
`;

const Figure = styled.figure`
    display: flex;
    align-items: center;
    gap: 1em;
`;

const Figcaption = styled.figcaption`
    /* necessary to ensure text ellipsis works */
    overflow: hidden;
    width: 100%;
`;

const FontAwesomeIconSC = styled(FontAwesomeIcon)`
    padding: 0.5em;
    border-radius: 50%;

    color: ${({ theme }) => theme.colors['#71767b']};
    font-size: 1.125rem;
    cursor: pointer;
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

const Engagements = styled.div`
    border-top: 1px solid rgb(47, 51, 54);
`;

const Dl = styled.dl`
    display: flex;
    justify-content: space-between;

    max-width: 500px;

    padding: 0.75em 0;
`;

const ListItem = styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
`;

const Dt = styled.dt`
    font-weight: ${({ theme }) => theme.font.weights.bold};
`;

const Dd = styled.dd`
    color: ${({ theme }) => theme.colors['#71767b']};
`;

const Time = styled.time`
    color: ${({ theme }) => theme.colors['#71767b']};

    margin: 1em 0;
    display: block;

    span {
        padding: 0 0.5em;

        &:first-child {
            padding-left: 0;
        } 
    }
`;

const Message = styled.p`
    line-height: 1.5;
    white-space: pre-line;
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

const Reactions = styled.div`
    border-bottom: 1px solid rgb(47, 51, 54);
    border-top: 1px solid rgb(47, 51, 54);

    padding: .5em 0;
`;

const Menu = styled.menu`
    display: flex;
    justify-content: space-around;

    max-width: 900px;

    color: ${({ theme }) => theme.colors['#71767b']};
`;

const ReactionButton = styled.button`
    background: transparent;
    color: ${({ theme }) => theme.colors['#71767b']};
    border: none;
`;

const CommentButton = styled(ReactionButton)`
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

const RetweetButton = styled(ReactionButton)`
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

const LikeButton = styled(ReactionButton)`
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

const TweetDetails = () => {
    const { state: { tweet, currentUserId }, dispatch } = useContext(TweetContext);

    const { tweetId } = useParams();

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const controller = new AbortController();

        const getTweetDetails = async () => {
            try {

                const response = await axios.get(`/tweets/${tweetId}`, { signal: controller.signal });

                if (response?.data.success) {
                    dispatch({ type: 'SET_TWEET', payload: { tweet: response.data.tweet } });

                    dispatch({ type: 'SET_CURRENT_USER_ID', payload: { currentUserId: response.data.currentUserId } });

                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getTweetDetails();

        return () => {
            controller.abort();

            dispatch({ type: 'SET_TWEET', payload: { tweet: null } });
        }
    }, [dispatch, tweetId]);

    const likeTweet = async () => {
        try {
            const response = await axios.post(`/tweets/${tweetId}/like`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_LIKE' });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const unlikeTweet = async () => {
        try {
            const response = await axios.delete(`/tweets/${tweetId}/unlike`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_UNLIKE' });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const retweetTweet = async () => {
        try {
            const response = await axios.post(`/tweets/${tweetId}/retweet`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_RETWEET' });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const undoRetweet = async () => {
        try {
            const response = await axios.delete(`/tweets/${tweetId}/undo-retweet`);

            if (response?.data.success) {
                dispatch({ type: 'HANDLE_UNDO_RETWEET' });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isTweetLiked = tweet?.likes?.includes(currentUserId);
    const isTweetRetweeted = tweet?.retweets?.includes(currentUserId);

    return (
        <>
            <Header>
                <Link to='/home'>
                    <ArrowBackIcon />
                </Link>
                <h2>Tweet</h2>
            </Header>
            {
                loading ? <CircularProgressWithIcon /> : tweet ? (
                    <Tweet>
                        <Article>
                            <ArticleHeader>
                                <Figure>
                                    <Avatar
                                        sx={{ width: 50, height: 50, background: 'hsl(0, 3%, 42%)' }}
                                        src={tweet.avatarUrl}
                                        alt=''
                                    />
                                    <Figcaption>
                                        <Link to={`/${tweet.handle}`}>
                                            <Name>
                                                <span>{tweet.name}</span>

                                                {tweet.verified && <VerifiedIconSC />}
                                            </Name>
                                            <Handle>@{tweet.handle}</Handle>
                                        </Link>
                                    </Figcaption>
                                </Figure>

                                <DropdownMenu
                                    currentUserId={currentUserId}
                                    userId={tweet.userId}
                                    tweetId={tweet._id}
                                    message={tweet.message}
                                    images={tweet.images}
                                />
                            </ArticleHeader>
                            <Message>
                                <Linkify componentDecorator={(decoratedHref, decoratedText, key) =>
                                    <a href={decoratedHref} target='_blank' key={key} rel="noreferrer">{decoratedText}</a>
                                }>
                                    {tweet.message}
                                </Linkify>
                            </Message>

                            {
                                tweet.images.length ? (
                                    <Images>
                                        {Children.toArray(tweet.images.map(imageUrl => <Img src={imageUrl} alt={`Tweet posted by @${tweet.handle}`} loading='lazy' />))}
                                    </Images>
                                ) : null
                            }

                            <Time>
                                <span>{formatTweetTime(tweet.createdAt)}</span>&middot;
                                <span>{formatTweetDate(tweet.createdAt)}</span>
                            </Time>

                            {!tweet.comments.length && !tweet.retweets.length && !tweet.likes.length ?
                                null :
                                <Engagements>
                                    <Dl>
                                        {
                                            tweet.comments.length ? <ListItem>
                                                <Dt>{tweet.comments.length}</Dt>
                                                <Dd>{`Comment${tweet.comments.length > 1 ? 's' : ''}`}</Dd>
                                            </ListItem> : null
                                        }
                                        {
                                            tweet.retweets.length ? <ListItem>
                                                <Dt>{tweet.retweets.length}</Dt>
                                                <Dd>{`Retweet${tweet.retweets.length > 1 ? 's' : ''}`}</Dd>
                                            </ListItem> : null
                                        }
                                        {
                                            tweet.likes.length ? <ListItem>
                                                <Dt>{tweet.likes.length}</Dt>
                                                <Dd>{`Like${tweet.likes.length > 1 ? 's' : ''}`}</Dd>
                                            </ListItem> : null
                                        }
                                    </Dl>
                                </Engagements>}

                            <Reactions>
                                <Menu>
                                    <li>
                                        <CommentButton>
                                            <FontAwesomeIconSC icon='fa-regular fa-comment' />
                                        </CommentButton>
                                    </li>
                                    <li>
                                        <RetweetButton onClick={isTweetRetweeted ? undoRetweet : retweetTweet} $retweeted={isTweetRetweeted}>
                                            <FontAwesomeIconSC icon='fa-solid fa-retweet' />
                                        </RetweetButton>
                                    </li>
                                    <li>
                                        <LikeButton onClick={isTweetLiked ? unlikeTweet : likeTweet} $liked={isTweetLiked}>
                                            {
                                                isTweetLiked ?
                                                    <FontAwesomeIconSC icon='fa-solid fa-heart' /> :
                                                    <FontAwesomeIconSC icon='fa-regular fa-heart' />
                                            }
                                        </LikeButton>
                                    </li>
                                </Menu>
                            </Reactions>
                        </Article>

                        <CommentForm />

                        <CommentList comments={tweet.comments} />
                    </Tweet>
                )
                    :
                    <H2Nil>No tweet found.</H2Nil>
            }

        </>
    );
};

export default TweetDetails;
