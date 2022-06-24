import { useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import axios from '../../axios';

import { ProfileContext } from '../../contexts/profile';

import LikedTweet from './LikedTweet';

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

const UserLikes = () => {
  const {
    state: { likedTweets, currentUserHandle }, dispatch
  } = useContext(ProfileContext);

  const { handle } = useParams();

  useEffect(() => {
    const getLikes = async () => {
      try {
        const response = await axios.get(`/user/${handle}/likes`);

        if (response?.data.success) {
          dispatch({ type: 'SET_LIKED_TWEETS', payload: { likedTweets: response.data.likedTweets } });
        }
      } catch (error) {
        console.log(error);
      }
    }

    getLikes();
  }, [dispatch, handle]);


  return (<>

    {
      likedTweets.length ? (
        <ul>
          {likedTweets.map((tweet, index) => (
            <LikedTweet
              key={tweet.tweetId}
              tweet={tweet}
              index={index}
            />
          ))}
        </ul>
      ) : (
        <SectionNil>
          {handle === currentUserHandle ?
            <>
              <H2Nil>You don't have any likes yet</H2Nil>
              <PNil>Tap the heart on any Tweet to show it some love. When you do, it'll show up here.</PNil>
            </> :
            <H2Nil>@{handle} doesn't have any likes yet</H2Nil>
          }
        </SectionNil>
      )
    }
  </>
  );

}

export default UserLikes;