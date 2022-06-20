import { useEffect, useContext } from 'react';
import axios from '../../axios';

import { AppContext } from '../../contexts/app';

import TweetItem from '../tweet/TweetItem';

const TweetList = () => {
    const {
        state: { tweets }, dispatch
    } = useContext(AppContext);

    useEffect(() => {
        const getTweets = async () => {
            try {
                const response = await axios.get('/tweets');

                if (response?.data.success) {
                    dispatch({ type: 'SET_TWEETS', payload: { tweets: response.data.tweets } });

                    dispatch({ type: 'SET_CURRENT_USER_ID', payload: { currentUserId: response.data.currentUserId } });
                }
            } catch (error) {
                console.log(error);
            }
        }

        getTweets();
    }, [dispatch]);

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
