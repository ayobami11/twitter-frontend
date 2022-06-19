export const initialState = {
    currentUserId: '',
    tweets: [
        {
            "_id": "628c0183463aa41d390f3506",
            "message": "random tweet",
            "createdAt": "2022-05-23T21:49:55.342Z",
            "handle": "ayobami11",
            "avatarUrl": "https://res.cloudinary.com/dizrb3vql/image/upload/v1654550124/twitter/ozwke2hd2lfn9rxxfijx.jpg",
            "name": "ayobami",
            "verified": true,
            "images": [],
            "likes": [
                "628ced3bdc83508f4bb0c4dd",
                "628cd09fffa1fbf461891077",
                "628cee90cae10d3f89a80ab4",
                "629a81a32cc56d5970503bac"
            ],
            "retweets": [
                "628ced3bdc83508f4bb0c4dd",
                "628cee90cae10d3f89a80ab4",
                "628bd043bcf650b604b0d8f6",
                "629a81a32cc56d5970503bac"
            ],
            "comments": [
                "629533be1985ffc8b8b51609",
                "629533f02e7384421c708555",
                "6295345778c13bc98ffd6cb3",
                "6295349778c13bc98ffd6cb8",
                "629df3ee43f397cb2d8cad92"
            ]
        },
        {
            "_id": "628c039c2e7a2ad37292be2f",
            "message": "random tweet 434",
            "createdAt": "2022-05-23T21:58:52.229Z",
            "handle": "ayobami11",
            "avatarUrl": "https://res.cloudinary.com/dizrb3vql/image/upload/v1654550124/twitter/ozwke2hd2lfn9rxxfijx.jpg",
            "name": "ayobami",
            "verified": true,
            "likes": [
                "628cd09fffa1fbf461891077"
            ],
            "retweets": [
                "628cd09fffa1fbf461891077",
                "629a81a32cc56d5970503bac"
            ],
            "comments": [
                "628e8bfecb1f8e645acd61dc"
            ]
        },
        {
            "_id": "628e8e6ecb1f8e645acd61ef",
            "message": "yoo yoo yoo",
            "createdAt": "2022-05-25T20:15:42.981Z",
            "handle": "admin3",
            "avatarUrl": "",
            "name": "admin3",
            "likes": [
                "628cd09fffa1fbf461891077"
            ],
            "retweets": [
                "628cd09fffa1fbf461891077"
            ],
            "comments": [
                "628e8e84cb1f8e645acd61f4",
                "628e908acb1f8e645acd61fd"
            ]
        },
        {
            "_id": "628e933b173271ff5717b3ec",
            "message": "Images???",
            "createdAt": "2022-05-25T20:36:11.371Z",
            "handle": "admin3",
            "avatarUrl": "",
            "name": "admin3",
            "likes": [
                "628bd043bcf650b604b0d8f6"
            ],
            "retweets": [],
            "comments": [
                "62974b65786e858c8a35e8f6"
            ]
        },
        {
            "_id": "628e96e98d6072f36fe289c5",
            "message": "images cool???",
            "createdAt": "2022-05-25T20:51:53.194Z",
            "handle": "admin3",
            "avatarUrl": "",
            "name": "admin3",
            "likes": [
                "628bd043bcf650b604b0d8f6"
            ],
            "retweets": [
                "628ced3bdc83508f4bb0c4dd"
            ],
            "comments": []
        },
        {
            "_id": "628e97ec69a0e9bd3ea2bdc9",
            "message": "Still trying images out!!!",
            "createdAt": "2022-05-25T20:56:12.533Z",
            "handle": "admin3",
            "avatarUrl": "",
            "name": "admin3",
            "likes": [
                "628ced3bdc83508f4bb0c4dd",
                "628cd09fffa1fbf461891077",
                "628bd043bcf650b604b0d8f6"
            ],
            "retweets": [
                "628cd09fffa1fbf461891077",
                "628bd043bcf650b604b0d8f6"
            ],
            "comments": [
                "6293773ca376941912307020"
            ]
        },
        {
            "_id": "62a075bd661017438dd1aa81",
            "message": "Cheers to a new month!!!",
            "createdAt": "2022-06-08T10:11:09.113Z",
            "handle": "nadal",
            "avatarUrl": "",
            "name": "nadal",
            "verified": false,
            "likes": [],
            "retweets": [],
            "comments": []
        }
    ],
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
