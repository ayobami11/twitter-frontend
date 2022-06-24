import styled from 'styled-components';

import Linkify from 'react-linkify';

import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';

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
    margin-top: .25em;

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

const Time = styled.time`
    color: ${({ theme }) => theme.colors['#71767b']};
    white-space: nowrap;
    flex-shrink: 0;

    > span {
        margin-left: .5em;
    }
`;

const CommentItem = ({ message, handle, name, avatarUrl, verified, createdAt }) => {
    return (
        <Li>
            <article>
                <Figure>
                    <Avatar
                        sx={{ width: 50, height: 50, background: 'hsl(0, 3%, 42%)' }}
                        imgProps={{ loading: 'lazy' }}
                        src={avatarUrl}
                        alt={`${handle} profile picture`}
                    />
                    <Figcaption>
                    <UserInfo>
                            <Author>
                                <Name>
                                    <span>{name}</span>
                                    {verified && <VerifiedIconSC />}
                                </Name>
                                <Handle>@{handle}</Handle>
                            </Author>
                            <Time>&middot;<span>{formatTimeElapsed(createdAt)}</span></Time>
                        </UserInfo>

                        {message && (
                            <Bio>
                                <Linkify componentDecorator={(decoratedHref, decoratedText, key) =>
                                    <a href={decoratedHref} target='_blank' key={key} rel="noreferrer">{decoratedText}</a>
                                }>
                                    {message}
                                </Linkify>
                            </Bio>
                        )
                        }

                        
                    </Figcaption>
                </Figure>
            </article>
        </Li>
    );
};

export default CommentItem;
