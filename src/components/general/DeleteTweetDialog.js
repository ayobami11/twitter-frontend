import { useContext } from 'react';

import { useNavigate, useMatch } from 'react-router-dom';

import styled from 'styled-components';

import { AppContext } from '../../contexts/app';
import { ProfileContext } from '../../contexts/profile';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from '../../axios';

const DialogSC = styled(Dialog)`
    backdrop-filter: blur(1px) brightness(50%);

    .MuiBackdrop-root {
        background: transparent;
    }
    
    .MuiPaper-root {
        background: hsl(0, 7%, 15%);
    }
`;

const DialogTitleSC = styled(DialogTitle)`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
    font-weight: ${({ theme }) => theme.font.weights.bold};
`;

const DialogContentTextSC = styled(DialogContentText)`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
`;

const ButtonSC = styled(Button)`
    color: ${({ theme }) => theme.colors['#e7e9ea']};
    font-weight: ${({ theme }) => theme.font.weights.bold};
    text-transform: capitalize;
`;

export const DeleteTweetDialog = () => {
    const { state: { deleteDialog }, dispatch } = useContext(AppContext);
    const { dispatch: profileDispatch } = useContext(ProfileContext);

    // checks if the current page is the tweetDetails page
    const tweetsMatch = useMatch('/home');
    const tweetDetailsMatch = useMatch('/:handle/status/:tweetId');

    const userTweetsMatch = useMatch('/:handle/tweets');
    const userLikesMatch = useMatch('/:handle/likes');
    const userRetweetsMatch = useMatch('/:handle/retweets');

    const navigate = useNavigate();

    const handleClose = () => {
        dispatch({ type: 'HANDLE_CANCEL_DELETE' });
    }

    const deleteTweet = async () => {
        try {
            dispatch({ type: 'HIDE_DELETE_DIALOG' });

            const response = await axios.delete(`/tweets/${deleteDialog.tweetId}/delete`);

            if (response?.data.success) {

                if (tweetsMatch) {
                    dispatch({ type: 'HANDLE_TWEET_DELETION' });
                } else {
                    if (tweetDetailsMatch) {
                        navigate('/');
                    } else if (userTweetsMatch) {
                        profileDispatch({ type: 'HANDLE_TWEET_DELETION', payload: { index: deleteDialog.index, tweetType: 'tweets' } });
                    } else if (userLikesMatch) {
                        profileDispatch({ type: 'HANDLE_TWEET_DELETION', payload: { index: deleteDialog.index, tweetType: 'likedTweets' } });
                    } else if (userRetweetsMatch) {
                        profileDispatch({ type: 'HANDLE_TWEET_DELETION', payload: { index: deleteDialog.index, tweetType: 'retweetedTweets' } });
                    }

                    handleClose();
                }

                dispatch({ type: 'SET_ALERT', payload: { message: 'Tweet deleted successfully.' } });

            }
        } catch (error) {
            if (error?.response) {
                dispatch({ type: 'SET_ALERT', payload: { message: 'Something went wrong. Please try again.' } });
            } else if (error?.message === 'Network Error') {
                dispatch({ type: 'SET_ALERT', payload: { message: 'Network error. Please try again.' } });
            }
        }
    }

    return (
        <div>
            <DialogSC
                open={deleteDialog.open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitleSC id='alert-dialog-title'>Delete Tweet?</DialogTitleSC>
                <DialogContent>
                    <DialogContentTextSC id='alert-dialog-description'>
                        This can't be undone and it will be removed from your profile, and anywhere previously shown on Tweetteer.
                    </DialogContentTextSC>
                </DialogContent>
                <DialogActions>
                    <ButtonSC onClick={handleClose}>Cancel</ButtonSC>
                    <ButtonSC onClick={deleteTweet}>Delete</ButtonSC>
                </DialogActions>
            </DialogSC>
        </div>
    )
}
