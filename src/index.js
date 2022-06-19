import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import TweetForm from './components/tweet/TweetForm';
import TweetDetails from './components/tweet/TweetDetails';
import UserProfile from './components/profile/UserProfile';
import EditProfile from './components/profile/EditProfile';
import Followers from './components/profile/Followers';
import Following from './components/profile/Following';
import UserLikes from './components/profile/UserLikes';
import UserRetweets from './components/profile/UserRetweets';
import UserTweets from './components/profile/UserTweets';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Navigate to='home' />} />

                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />

                    <Route path='home' element={<Home />} />
                    <Route path='tweet' element={<TweetForm />} />

                    <Route
                        path=':handle'
                        element={<UserProfile />}
                    >
                        <Route index element={<Navigate to='tweets' />} />

                        <Route path='tweets' element={<UserTweets />} />
                        <Route path='likes' element={<UserLikes />} />
                        <Route path='retweets' element={<UserRetweets />} />

                    </Route>

                    <Route
                        path=':handle/edit-profile'
                        element={<EditProfile />}
                    />

                    <Route
                        path=':handle/followers'
                        element={<Followers />}
                    />

                    <Route
                        path=':handle/following'
                        element={<Following />}
                    />

                    <Route
                        path=':handle/status/:tweetId'
                        element={<TweetDetails />}
                    />

                    <Route path='*' element={<Navigate to='login' />} />
                </Route>
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
