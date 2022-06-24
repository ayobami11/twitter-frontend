import styled from 'styled-components';

export const Button = styled.button`
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.font.weights.bold};
    
    display: block;

    cursor: pointer;
    border: none;
    border-radius: 1.25em;
    outline: none;

    padding: 0.6em 1.25em;
    width: fit-content;

    :hover {
        /* darkens the background by adding a dark transparent layer */
        background-image: linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
    }

    :disabled {
        background: ${({ theme }) => theme.colors.blue};
        cursor: not-allowed;
        filter: brightness(75%) grayscale(20%);
    }
`;