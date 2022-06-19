import { Children } from 'react';

import styled from 'styled-components';

const Images = styled.div`
    border-radius: .5em;

    border: 1px solid red;

    margin: 1.5em auto;
    overflow: hidden;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 200px;
    gap: .75em;

    max-width: 700px;
`;

const ImageContainer = styled.div`
    overflow: hidden;

    border: 1px solid red;

`;

const Img = styled.img`
    object-fit: scale-down;
    height: 100%;
    width: 100%;
`;

const ImagePreview = ({ imageUrls }) => {
    return (
        <Images $imageCount={imageUrls.length}>
            {Children.toArray(imageUrls.map(imageUrl => <ImageContainer><Img src={imageUrl} alt='' /></ImageContainer>))
            }
        </Images >
    )
}

export default ImagePreview;