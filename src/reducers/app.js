export const initialState = {
    currentUserId: '',
    tweets: [],
    alert: {
        open: false,
        message: ''
    }
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TWEETS': {

            return {
                ...state,
                tweets: action.payload.tweets
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
