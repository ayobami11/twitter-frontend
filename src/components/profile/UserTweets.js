import { useEffect, useContext } from 'react';

import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components';

import axios from '../../axios';

import { ProfileContext } from '../../contexts/profile';

import TweetItem from '../tweet/TweetItem';

import { Button } from '../general/Button';

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

const ButtonSC = styled(Button)`
  padding: .75em;
  margin: 1.5em 0;
`;

const UserTweets = () => {
  const {
    state: { tweets, currentUserHandle }, dispatch
  } = useContext(ProfileContext);

  const { handle } = useParams();

  useEffect(() => {
    const getTweets = async () => {
      try {
        const response = await axios.get(`/user/${handle}/tweets`);

        if (response?.data.success) {
          dispatch({ type: 'SET_TWEETS', payload: { tweets: response.data.tweets } });
        }
      } catch (error) {
        console.log(error);
      }
    }

    getTweets();
  }, [dispatch, handle]);

  return (<>
    {
      tweets.length ? (
        <ul>
          {tweets.map((tweet, index) => (
            <TweetItem
              key={tweet._id}
              tweet={tweet}
              index={index}
            />
          ))}
        </ul>
      ) : (
        <SectionNil>
          {handle === currentUserHandle ? <>
            <H2Nil>You haven't Tweeted yet</H2Nil>
            <PNil>When you post a Tweets, it'll show up here.</PNil>

            <ButtonSC as={Link} to='/tweet'>Tweet now</ButtonSC>
          </> :
            <H2Nil>@{handle} doesn't have any tweets yet</H2Nil>
          }
        </SectionNil>
      )
    }
  </>
  );

}

export default UserTweets