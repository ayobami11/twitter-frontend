import { useState, useContext } from 'react';

import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { AppContext } from '../../contexts/app';

const itemHeight = 20;

const MoreVertIconSC = styled(MoreVertIcon)`
    color: gray;
`;

const MenuItemSC = styled(MenuItem)`
    display: flex;
    gap: .5em;

    &.delete-btn {
        color: hsl(351, 100%, 70%);
    }
`;

export const DropdownMenu = ({ currentUserId, userId, tweetId, index, message, images }) => {
    const { dispatch } = useContext(AppContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        event.stopPropagation();

        setAnchorEl(event.currentTarget);
    }

    const handleClose = (event) => {
        event.stopPropagation();

        setAnchorEl(null);
    }

    const showDeleteDialog = (event) => {
        event.stopPropagation();

        dispatch({ type: 'SHOW_DELETE_DIALOG', payload: { tweetId, index } });

        setAnchorEl(null);
    }

    const copyTweet = async (event) => {
        event.stopPropagation();

        let tweet = message;

        images.forEach(imageUrl => tweet += `\n${imageUrl}`)

        await navigator.clipboard.writeText(tweet);

        dispatch({ type: 'SET_ALERT', payload: { message: 'Tweet copied to clipboard.' } });

        setAnchorEl(null);
    }
    
    return (
        <div className='no-link'>
            <IconButton
                aria-label='More'
                id='long-button'
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? true : undefined}
                aria-haspopup='true'
                onClick={handleClick}>
                <MoreVertIconSC />
            </IconButton>
            <Menu
                id='long-menu'
                MenuListProps={{ 'aria-labelledby': 'long-button' }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: itemHeight * 20,
                        width: 'fit-content'
                    }
                }}
            >
                {currentUserId === userId &&
                    <MenuItemSC className='delete-btn' onClick={showDeleteDialog}>
                        <DeleteIcon /> Delete Tweet
                    </MenuItemSC>}
                <MenuItemSC onClick={copyTweet}>
                    <ContentCopyIcon /> Copy Tweet
                </MenuItemSC>
            </Menu>
        </div>
    );
}