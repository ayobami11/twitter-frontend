import styled from 'styled-components';

import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setRgbaValue } from '../../utils/setRgbaValue';

import { formatTimeElapsed } from '../../utils/formatTimeElapsed';

const Li = styled.li`
    border-bottom: 1px solid ${({ theme }) => theme.colors['#2f3336']};
    padding: 1em;
`;

const Figure = styled.figure`
    display: flex;
    gap: 1em;
`;

const Figcaption = styled.figcaption`
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

const Timestamp = styled.span`
    color: ${({ theme }) => theme.colors['#71767b']};

    white-space: nowrap;
`;

const Menu = styled.menu`
    display: flex;
    justify-content: space-between;

    margin-top: 0.75em;
    max-width: 700px;
`;

const MenuItem = styled.li`
    display: flex;
    align-items: center;
    gap: 0.5em;

    color: ${({ theme }) => theme.colors['#71767b']};
    cursor: pointer;
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

const CommentIcon = styled(MenuItem)`
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

const RetweetIcon = styled(MenuItem)`
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
const LikeIcon = styled(MenuItem)`
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

const ShareIcon = styled(MenuItem)`
    :hover {
        background: ${({ theme }) => setRgbaValue(theme.colors.blue, 0.09)};
        color: ${({ theme }) => theme.colors.blue};
    }
`;

const CommentItem = ({ message, handle, name, avatarUrl, verified, createdAt }) => {
    return (
        <Li>
            <article>
                <Figure>
                    <Avatar
                        sx={{ width: 50, height: 50 }}
                        src={avatarUrl}
                        alt={`${handle} profile picture`}
                    />
                    <Figcaption>
                        <UserInfo>
                            <AuthorDetails>
                                <Author>
                                    <Name>{name}</Name>
                                    {verified && <VerifiedIconSC />}
                                </Author>
                                <Handle>@{handle}</Handle>
                                <Timestamp>
                                    {formatTimeElapsed(createdAt)}
                                </Timestamp>
                            </AuthorDetails>
                            <EllipsisIcon icon='fa-solid fa-ellipsis' />
                        </UserInfo>
                        <p>{message}</p>
                        {/* <Menu>
                            <CommentIcon>
                                <FontAwesomeIconSC icon='fa-regular fa-comment' />
                                <span>{commentCount}</span>
                            </CommentIcon>
                            <RetweetIcon>
                                <FontAwesomeIconSC icon='fa-solid fa-retweet' />
                                <span>{retweetCount}</span>
                            </RetweetIcon>
                            <LikeIcon>
                                <FontAwesomeIconSC icon='fa-regular fa-heart' />
                                <span>{likeCount}</span>
                            </LikeIcon>
                            <ShareIcon>
                                <FontAwesomeIconSC icon='fa-solid fa-arrow-up-from-bracket' />
                            </ShareIcon>
                        </Menu> */}
                    </Figcaption>
                </Figure>
            </article>
        </Li>
    );
};

export default CommentItem;
