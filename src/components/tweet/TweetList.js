import { useContext } from 'react';

import styled from 'styled-components';

import { AppContext } from '../../contexts/app';

import TweetItem from '../tweet/TweetItem';

const H2 = styled.h2`
    margin: 1em;
`;

const TweetList = () => {
    const {
        state: { tweets }
    } = useContext(AppContext);

    return (
        <>
            {tweets.length ?
                <ul>
                    {tweets.map((tweet, index) => (
                        <TweetItem
                            key={tweet._id}
                            tweet={tweet}
                            index={index}
                        />
                    ))}
                </ul> : <H2>No tweets.</H2>
            }
        </>
    );
};

export default TweetList;
