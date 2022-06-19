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

    align-self: flex-end;

    :disabled {
        filter: brightness(60%);
        cursor: auto;
    }
`;