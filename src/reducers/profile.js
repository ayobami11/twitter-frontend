export const initialState = {
    currentUserId: '',
    profile: null,
    validationMessages: {
        name: '',
        bio: ''
    },
    followers: [],
    following: [],
    tweets: [],
    likedTweets: [],
    retweetedTweets: [],
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROFILE': {

            return {
                ...state,
                profile: action.payload.profile
            }
        }

        case 'UPDATE_PROFILE_DETAILS':
            return {
                ...state,
                profile: { ...state.profile, ...action.payload }
            };

        case 'VALIDATE_PROFILE_DETAILS':
            return {
                ...state,
                validationMessages: { ...state.validationMessages, ...action.payload }
            };

        case 'SET_CURRENT_USER_ID': {
            return {
                ...state,
                currentUserId: action.payload.currentUserId
            }
        }

        case 'SET_TWEETS': {

            return {
                ...state,
                tweets: action.payload.tweets
            }
        }

        case 'SET_LIKED_TWEETS': {

            return {
                ...state,
                likedTweets: action.payload.likedTweets
            }
        }

        case 'SET_RETWEETED_TWEETS': {

            return {
                ...state,
                retweetedTweets: action.payload.retweetedTweets
            }
        }

        case 'SET_FOLLOWERS': {

            return {
                ...state,
                followers: action.payload.followers,
                currentUserId: action.payload.currentUserId
            }
        }

        case 'SET_FOLLOWING': {

            return {
                ...state,
                following: action.payload.following,
                currentUserId: action.payload.currentUserId
            }
        }

        // actions for following/unfollowing a user on the profile page
        case 'HANDLE_FOLLOW_PROFILE': {
            const modifiedProfile = { ...state.profile };
            modifiedProfile.followers = [...modifiedProfile.followers, action.payload.followerId]

            return {
                ...state,
                profile: modifiedProfile
            }
        }

        case 'HANDLE_UNFOLLOW_PROFILE': {
            const modifiedProfile = { ...state.profile };
            modifiedProfile.followers = modifiedProfile.followers.filter(followerId => followerId !== action.payload.oldFollowerId);

            return {
                ...state,
                profile: modifiedProfile
            }
        }

        // actions for following / unfollowing a user on the followers and following pages
        case 'HANDLE_FOLLOWERS_LIST': {
            const followers = state.followers.map((follower, index) => {
                if (index === action.payload.index) {
                    follower.followers = [...follower.followers, action.payload.followerId];

                    return follower;
                }

                return follower
            });

            return {
                ...state,
                followers
            }
        }

        case 'HANDLE_UNFOLLOWERS_LIST': {
            const followers = state.followers.map((follower, index) => {
                if (index === action.payload.index) {
                    follower.followers = follower.followers.filter(followerId => followerId !== action.payload.oldFollowerId);

                    return follower;
                }

                return follower
            });

            return {
                ...state,
                followers
            }
        }

        case 'HANDLE_FOLLOWING_LIST': {
            const following = state.following.map((follower, index) => {
                if (index === action.payload.index) {
                    follower.followers = [...follower.followers, action.payload.followerId];

                    return follower;
                }

                return follower
            });

            return {
                ...state,
                following
            }
        }

        case 'HANDLE_UNFOLLOWING_LIST': {
            const following = state.following.map((follower, index) => {
                if (index === action.payload.index) {
                    follower.followers = follower.followers.filter(followerId => followerId !== action.payload.oldFollowerId);

                    return follower;
                }

                return follower
            });

            return {
                ...state,
                following
            }
        }

        case 'HANDLE_LIKE': {
            const tweetType = action.payload.reactionTab === 'likes' ? 'likedTweets' : 'retweetedTweets';

            const tweets = state[tweetType].map((tweet, index) => {
                if (index === action.payload.index) {
                    const modifiedTweet = { ...tweet };
                    modifiedTweet.likes = [...modifiedTweet.likes, state.currentUserId];

                    return modifiedTweet;
                }

                return tweet;
            })

            return {
                ...state,
                [tweetType]: tweets
            }

        }

        case 'HANDLE_UNLIKE': {
            const tweetType = action.payload.reactionTab === 'likes' ? 'likedTweets' : 'retweetedTweets';

            const tweets = state[tweetType].map((tweet, index) => {
                if (index === action.payload.index) {
                    const modifiedTweet = { ...tweet };
                    modifiedTweet.likes = modifiedTweet.likes.filter(userId => userId !== state.currentUserId);

                    return modifiedTweet;
                }

                return tweet;
            })

            return {
                ...state,
                [tweetType]: tweets
            }

        }

        case 'HANDLE_RETWEET': {
            const tweetType = action.payload.reactionTab === 'likes' ? 'likedTweets' : 'retweetedTweets';

            const tweets = state[tweetType].map((tweet, index) => {
                if (index === action.payload.index) {
                    const modifiedTweet = { ...tweet };
                    modifiedTweet.retweets = [...modifiedTweet.retweets, state.currentUserId];

                    return modifiedTweet;
                }

                return tweet;
            })

            return {
                ...state,
                [tweetType]: tweets
            }

        }

        case 'HANDLE_UNDO_RETWEET': {
            const tweetType = action.payload.reactionTab === 'likes' ? 'likedTweets' : 'retweetedTweets';

            const tweets = state[tweetType].map((tweet, index) => {
                if (index === action.payload.index) {
                    const modifiedTweet = { ...tweet };
                    modifiedTweet.retweets = modifiedTweet.retweets.filter(userId => userId !== state.currentUserId);

                    return modifiedTweet;
                }

                return tweet;
            })

            return {
                ...state,
                [tweetType]: tweets
            }

        }

        default: {
            return state
        }
    }
}