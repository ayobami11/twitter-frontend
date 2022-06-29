import { useContext, forwardRef } from 'react';

import styled from 'styled-components';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import TwitterIcon from '@mui/icons-material/Twitter';

import { AppContext } from '../../contexts/app';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const AlertSC = styled(Alert)`
    background: hsl(204, 88%, 15%);
    border: 1px solid ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors['#e7e9ea']};
`;

const TwitterIconSC = styled(TwitterIcon)`
    color: ${({ theme }) => theme.colors.blue};
`;

export const NotificationPopup = () => {
    const { state: { alert }, dispatch } = useContext(AppContext);

    const closePopup = () => {
        dispatch({ type: 'CLOSE_ALERT' });
    }

    return (
        <Snackbar open={alert.open} autoHideDuration={5000} onClose={closePopup}>
            <AlertSC
                variant='outlined'
                icon={<TwitterIconSC />}
            >
                {alert.message}
            </AlertSC>
        </Snackbar>
    );
};