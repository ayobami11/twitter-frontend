import { useContext } from 'react';

import { AppContext } from '../../contexts/app';

import TweetItem from '../tweet/TweetItem';

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
                </ul> : <p>No tweets.</p>
            }
        </>
    );
};

export default TweetList;
