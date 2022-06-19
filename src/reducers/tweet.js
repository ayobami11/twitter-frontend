export const initialState = {
    currentUserId: '',
    tweet: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TWEET': {
            return {
                ...state,
                tweet: action.payload.tweet
            }
        }

        case 'SET_CURRENT_USER_ID': {
            return {
                ...state,
                currentUserId: action.payload.currentUserId
            }
        }

        case 'HANDLE_COMMENT': {
            const modifiedTweet = { ...state.tweet };
            modifiedTweet.comments = [action.payload.comment, ...modifiedTweet.comments];

            return {
                ...state,
                tweet: modifiedTweet
            }
        }

        case 'HANDLE_LIKE': {
            const modifiedTweet = { ...state.tweet };
            modifiedTweet.likes = [...modifiedTweet.likes, state.currentUserId];

            return {
                ...state,
                tweet: modifiedTweet
            }
        }

        case 'HANDLE_UNLIKE': {
            const modifiedTweet = { ...state.tweet };
            modifiedTweet.likes = modifiedTweet.likes.filter(userId => userId !== state.currentUserId);

            return {
                ...state,
                tweet: modifiedTweet
            }
        }

        case 'HANDLE_RETWEET': {
            const modifiedTweet = { ...state.tweet };
            modifiedTweet.retweets = [...modifiedTweet.retweets, state.currentUserId];

            return {
                ...state,
                tweet: modifiedTweet
            }
        }

        case 'HANDLE_UNDO_RETWEET': {
            const modifiedTweet = { ...state.tweet };
            modifiedTweet.retweets = modifiedTweet.retweets.filter(userId => userId !== state.currentUserId);

            return {
                ...state,
                tweet: modifiedTweet
            }
        }

        default:
            return state;
    }
};
