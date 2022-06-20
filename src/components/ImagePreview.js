import { Children } from 'react';

import styled from 'styled-components';

const Images = styled.div`
    --grid-gap: .5em;
    --grid-column-count: 2;
    --grid-item-min-width: 150px;

    --gap-count: calc(var(--grid-column-count) - 1);
    --total-gap-width: calc(var(--gap-count) * var(--grid-gap));
    --grid-gap-max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

    border-radius: .75em;
    margin: 1.5em auto;
    max-width: 550px;
    overflow: hidden;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(max(var(--grid-item-min-width), var(--grid-gap-max-width)), 1fr));
    gap: .5em;

`;

const Img = styled.img`
    min-height: 100%;
`;

const ImagePreview = ({ imageUrls }) => {
    return (
        <Images $imageCount={imageUrls.length}>
            {Children.toArray(imageUrls.map(imageUrl => <Img src={imageUrl} alt='' />))
            }
        </Images >
    )
}

export default ImagePreview;