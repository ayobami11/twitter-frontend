import { useEffect, useContext } from 'react';

import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components';

import { TweetContext } from '../../contexts/tweet';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';

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

    background: ${({ theme }) => theme.colors.black};
    padding: 1em;
`;

const H2 = styled.h2``;

const ArticleHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 1em 0;
`;

const Article = styled.article`
    padding: 1em;
`;

const Figure = styled.figure`
    display: flex;
    align-items: center;
    gap: 1em;
`;

const Figcaption = styled.figcaption``;

const FontAwesomeIconSC = styled(FontAwesomeIcon)`
    padding: 0.5em;
    border-radius: 50%;

    color: ${({ theme }) => theme.colors['#71767b']};
    font-size: 1.125rem;
    cursor: pointer;
`;

const EllipsisIcon = styled(FontAwesomeIconSC)`
    color: ${({ theme }) => theme.colors['#71767b']};

    :hover {
        background: ${({ theme }) => setRgbaValue(theme.colors.blue, 0.09)};
        color: ${({ theme }) => theme.colors.blue};
    }
`;

const Name = styled.p`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
    font-weight: ${({ theme }) => theme.font.weights.bold};
`;

const VerifiedIconSC = styled(VerifiedIcon)`
    font-size: 1rem;
    margin-left: 0.25em;
`;

const Handle = styled.p`
    color: ${({ theme }) => theme.colors['#71767b']};
`;

const Engagements = styled.div`
    border-bottom: 1px solid rgb(47, 51, 54);
    border-top: 1px solid rgb(47, 51, 54);
    margin: 1em 0;
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

    span {
        padding-right: 0.25em;
    }
`;

const Reactions = styled.div`
    border-bottom: 1px solid rgb(47, 51, 54);
`;

const Menu = styled.menu`
    display: flex;
    justify-content: space-around;

    max-width: 900px;

    margin: 1em 0;

    color: ${({ theme }) => theme.colors['#71767b']};
`;

const Button = styled.button`
    background: transparent;
    color: ${({ theme }) => theme.colors['#71767b']};
    border: none;
`;

const CommentIcon = styled(Button)`
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

const RetweetIcon = styled(Button)`
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

const LikeIcon = styled(Button)`
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

const ShareIcon = styled(Button)`
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

const TweetDetails = () => {
    const { state: { tweet, currentUserId }, dispatch } = useContext(TweetContext);

    const { tweetId } = useParams();

    useEffect(() => {
        const getTweetDetails = async () => {
            try {
                const response = await axios.get(`/tweets/${tweetId}`);

                if (response?.data.success) {
                    dispatch({ type: 'SET_TWEET', payload: { tweet: response.data.tweet } });

                    dispatch({ type: 'SET_CURRENT_USER_ID', payload: { currentUserId: response.data.currentUserId } });

                }
            } catch (error) {
                console.log(error);
            }
        }

        getTweetDetails();
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
            {
                tweet ? (
                    <><Header>
                        <Link to='../../../home'>
                            <ArrowBackIcon />
                        </Link>
                        <H2>Tweet</H2>
                    </Header>

                        <Article>
                            <ArticleHeader>
                                <Figure>
                                    <Avatar
                                        sx={{ width: 50, height: 50 }}
                                        src={tweet.avatarUrl}
                                        alt={`${tweet.handle} profile picture`}
                                    />
                                    <Figcaption>
                                        <Link to={`../${tweet.handle}`}>
                                            <Name>
                                                {tweet.name}
                                                {tweet.verified && <VerifiedIconSC />}
                                            </Name>
                                            <Handle>@{tweet.handle}</Handle>
                                        </Link>
                                    </Figcaption>
                                </Figure>
                                <Button>
                                    <EllipsisIcon icon='fa-solid fa-ellipsis' />
                                </Button>
                            </ArticleHeader>
                            <p>{tweet.message}</p>
                            <Time>
                                <span>{formatTweetTime(tweet.createdAt)}</span>&middot;
                                <span>{formatTweetDate(tweet.createdAt)}</span>
                            </Time>

                            <Engagements>
                                <Dl>
                                    <ListItem>
                                        <Dt>{tweet.comments.length || ''}</Dt>
                                        <Dd>Comments</Dd>
                                    </ListItem>
                                    <ListItem>
                                        <Dt>{tweet.retweets.length || ''}</Dt>
                                        <Dd>Retweets</Dd>
                                    </ListItem>
                                    <ListItem>
                                        <Dt>{tweet.likes.length || ''}</Dt>
                                        <Dd>Likes</Dd>
                                    </ListItem>
                                </Dl>
                            </Engagements>

                            <Reactions>
                                <Menu>
                                    <li>
                                        <CommentIcon>
                                            <FontAwesomeIconSC icon='fa-regular fa-comment' />
                                        </CommentIcon>
                                    </li>
                                    <li>
                                        <RetweetIcon onClick={isTweetRetweeted ? undoRetweet : retweetTweet} $retweeted={isTweetRetweeted}>
                                            <FontAwesomeIconSC icon='fa-solid fa-retweet' />
                                        </RetweetIcon>
                                    </li>
                                    <li>
                                        <LikeIcon onClick={isTweetLiked ? unlikeTweet : likeTweet} $liked={isTweetLiked}>
                                            {
                                                isTweetLiked ?
                                                    <FontAwesomeIconSC icon='fa-solid fa-heart' /> :
                                                    <FontAwesomeIconSC icon='fa-regular fa-heart' />
                                            }
                                        </LikeIcon>
                                    </li>
                                    <li>
                                        <ShareIcon>
                                            <FontAwesomeIconSC icon='fa-solid fa-arrow-up-from-bracket' />
                                        </ShareIcon>
                                    </li>
                                </Menu>
                            </Reactions>
                        </Article>

                        <CommentForm />

                        <CommentList comments={tweet.comments} />
                    </>
                )
                    :
                    <p>Tweet</p>
            }

        </>
    );
};

export default TweetDetails;
