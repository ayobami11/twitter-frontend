export const initialState = {
    loading: true,
    currentUserId: '',
    tweets: [],
    users: [],
    alert: {
        open: false,
        message: ''
    }
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING_FALSE': {

            return {
                ...state,
                loading: false
            }
        }

        case 'SET_TWEETS': {

            return {
                ...state,
                tweets: action.payload.tweets
            }
        }

        case 'SET_USERS': {

            return {
                ...state,
                users: action.payload.users
            }
        }

        case 'SET_CURRENT_USER_ID': {
            return {
                ...state,
                currentUserId: action.payload.currentUserId
            }
        }

        case 'HANDLE_LIKE': {
            const tweets = state.tweets.map((tweet, index) => {
                if (index === action.payload.index) {
                    const modifiedTweet = { ...tweet };
                    modifiedTweet.likes = [...modifiedTweet.likes, state.currentUserId];

                    return modifiedTweet;
                }

                return tweet;
            })

            return {
                ...state,
                tweets
            }

        }

        case 'HANDLE_UNLIKE': {
            const tweets = state.tweets.map((tweet, index) => {
                if (index === action.payload.index) {
                    const modifiedTweet = { ...tweet };
                    modifiedTweet.likes = modifiedTweet.likes.filter(userId => userId !== state.currentUserId);

                    return modifiedTweet;
                }

                return tweet;
            })

            return {
                ...state,
                tweets
            }

        }

        case 'HANDLE_RETWEET': {
            const tweets = state.tweets.map((tweet, index) => {
                if (index === action.payload.index) {
                    const modifiedTweet = { ...tweet };
                    modifiedTweet.retweets = [...modifiedTweet.retweets, state.currentUserId];

                    return modifiedTweet;
                }

                return tweet;
            })

            return {
                ...state,
                tweets
            }

        }

        case 'HANDLE_UNDO_RETWEET': {
            const tweets = state.tweets.map((tweet, index) => {
                if (index === action.payload.index) {
                    const modifiedTweet = { ...tweet };
                    modifiedTweet.retweets = modifiedTweet.retweets.filter(userId => userId !== state.currentUserId);

                    return modifiedTweet;
                }

                return tweet;
            })

            return {
                ...state,
                tweets
            }

        }

        case 'HANDLE_FOLLOW': {
            const users = state.users.map((user, index) => {
                if (index === action.payload.index) {
                    user.followers = [...user.followers, action.payload.followerId];

                    return user;
                }

                return user;
            });

            return {
                ...state,
                users
            }
        }

        case 'HANDLE_UNFOLLOW': {
            const users = state.users.filter((user, index) => {
                if (index === action.payload.index) {
                    user.followers = user.followers.filter(userId => userId !== action.payload.oldFollowerId);

                    return user;
                }

                return user;
            })

            return {
                ...state,
                users
            }
        }

        case 'SET_ALERT': {
            return {
                ...state,
                alert: { open: true, message: action.payload.message }
            }
        }

        case 'CLOSE_ALERT': {
            return {
                ...state,
                alert: { open: false, message: '' }
            }
        }

        default:
            return state;
    }
};
