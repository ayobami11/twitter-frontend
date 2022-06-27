import { useState, useEffect, useRef, useContext } from 'react';

import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components';

import Avatar from '@mui/material/Avatar';

import { Button } from '../general/Button';

import { ProfileContext } from '../../contexts/profile';
import { TweetContext } from '../../contexts/tweet';
import { AppContext } from '../../contexts/app';

import axios from '../../axios';


const Section = styled.section`
    display: flex;
    gap: 1em;

    border-bottom: 1px solid ${({ theme }) => theme.colors['#2f3336']};
    padding: 1em;
`;

const Form = styled.form`
    flex-basis: 100%;

    display: flex;
    flex-direction: column;
`;

const Handle = styled(Link)`
    color: ${({ theme }) => theme.colors.blue};
`;

const TextareaContainer = styled.div`
    height: ${({ $containerHeight }) => $containerHeight};

    margin: 1em 0;
`;

const Textarea = styled.textarea`
    font-size: 1rem;

    width: 100%;
    resize: none;

    background: inherit;
    color: inherit;
    outline: none;
    border: none;

    height: ${({ $textareaHeight }) => $textareaHeight};
`;

const CommentForm = () => {
    const { state: { profile }, dispatch: profileDispatch } = useContext(ProfileContext);
    const { state: { tweet }, dispatch: tweetDispatch } = useContext(TweetContext);
    const { dispatch: appDispatch } = useContext(AppContext);

    const [comment, setComment] = useState('');

    const [textareaHeight, setTextareaHeight] = useState();
    const [containerHeight, setContainerHeight] = useState();

    const textareaRef = useRef();

    const { tweetId } = useParams();

    // controls the autosizing of the textarea when the message state variable changes
    useEffect(() => {
        setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
        setContainerHeight(`${textareaRef.current.scrollHeight}px`);
    }, [comment]);

    const handleInputChange = ({ target: { value } }) => {
        setComment(value);

        // autosizes textarea's height
        setTextareaHeight('auto');
        setContainerHeight(`${textareaRef.current.scrollHeight}px`);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const createComment = async () => {
            try {
                const response = await axios.post(`/tweets/${tweetId}/comment`, {
                    message: comment
                });

                if (response?.data.success) {
                    appDispatch({ type: 'SET_ALERT', payload: { message: 'Comment sent successfully.' } });

                    tweetDispatch({ type: 'HANDLE_COMMENT', payload: { comment: response.data.comment } });

                    setComment('');
                }
            } catch (error) {
                console.log(error);
            }
        };

        createComment();
    };

    useEffect(() => {
        const getUserProfile = async () => {
            try {

                const response = await axios.get('/user');

                if (response?.data.success) {
                    profileDispatch({ type: 'SET_PROFILE', payload: { profile: response.data.user } });
                }
            } catch (error) {
                console.log(error)
            }
        }

        getUserProfile();

    }, [profileDispatch]);

    return (
        <Section>
            <Avatar
                sx={{ width: 50, height: 50, background: 'hsl(0, 3%, 42%)' }}
                src={profile?.avatarUrl}
                alt={`${profile?.handle} profile picture`}
            />
            <Form onSubmit={handleSubmit}>
                <p>
                    Replying to <Handle to={`/${tweet?.handle}`}>@{tweet?.handle}</Handle>
                </p>
                <TextareaContainer $containerHeight={containerHeight}>
                    <Textarea
                        $textareaHeight={textareaHeight}
                        ref={textareaRef}
                        name='comment'
                        value={comment}
                        placeholder='Tweet your reply'
                        rows={1}
                        onChange={handleInputChange}
                        required
                    />
                </TextareaContainer>
                <Button type='submit' disabled={!comment.length}>
                    Reply
                </Button>
            </Form>
        </Section>
    );
};

export default CommentForm;
