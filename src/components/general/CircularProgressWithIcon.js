import styled from 'styled-components';

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import TwitterIcon from '@mui/icons-material/Twitter';

const BoxSC = styled(Box)`
     position: relative;
     display: flex;
     align-items: center;
     justify-content: center;

     min-height: 100vh;
`;

const CircularProgressSC = styled(CircularProgress)`
    color: ${({ theme }) => theme.colors.blue};
`;

const TwitterIconSC = styled(TwitterIcon)`
    color: ${({ theme }) => theme.colors.blue};
    font-size: 3rem;
`;

export const CircularProgressWithIcon = () => {
    return (
        <BoxSC>
            <CircularProgressSC size={100} />
            <Box position='absolute' padding='5em'>
                <TwitterIconSC />
            </Box>
        </BoxSC>
    )
}