import { useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import axios from '../../axios';

import { ProfileContext } from '../../contexts/profile';

import RetweetedTweet from './RetweetedTweet';

const SectionNil = styled.section`
  margin: 2em auto;
  width: 90%;
`;

const H2Nil = styled.h2`
  font-size: 1.75rem;
`;

const PNil = styled.p`
color: ${({ theme }) => theme.colors['#71767b']};
margin: .75em 0;
`;

const UserRetweets = () => {
  const {
    state: { retweetedTweets, currentUserHandle }, dispatch
  } = useContext(ProfileContext);

  const { handle } = useParams();

  useEffect(() => {
    const getRetweets = async () => {
      try {
        const response = await axios.get(`/user/${handle}/retweets`);

        if (response?.data.success) {
          dispatch({ type: 'SET_RETWEETED_TWEETS', payload: { retweetedTweets: response.data.retweetedTweets } });

        }
      } catch (error) {
        console.log(error);
      }
    }

    getRetweets();
  }, [dispatch, handle]);

  return (<>
    {retweetedTweets.length ?
      (
        <ul>
          {retweetedTweets.map((tweet, index) => (
            <RetweetedTweet
              key={tweet._id}
              tweet={tweet}
              index={index}
            />
          ))}
        </ul>
      ) : (
        <SectionNil>
          {handle === currentUserHandle ?
            <>
              <H2Nil>You don't have any retweets yet</H2Nil>
              <PNil>Tap the retweet icon on any Tweet to show it some love. When you do, it'll show up here.</PNil>
            </> :
            <H2Nil>@{handle} doesn't have any retweets yet</H2Nil>
          }
        </SectionNil>
      )
    }
  </>
  );

}

export default UserRetweets;