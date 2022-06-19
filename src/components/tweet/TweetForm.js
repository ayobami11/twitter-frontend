import { useState, useContext, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { AppContext } from '../../contexts/app';

import styled from 'styled-components';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

import CloseIcon from '@mui/icons-material/Close';

import { Button } from '../general/Button';

import axios from '../../axios';
import ImagePreview from '../ImagePreview';

import { setRgbaValue } from '../../utils/setRgbaValue';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 1em auto;
`;

const Main = styled.main`
  width: 90%;
  margin: 1em auto;
`;

const FormContainer = styled.div`
  display: flex;
  gap: 1em;

`;

const CloseIconSC = styled(CloseIcon)`
  color: ${({ theme }) => theme.colors.white};
  `

const Textarea = styled.textarea`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  height: 50vh;
  outline: none;
  resize: none;
  width: 100%;
`;

const Input = styled.input`
  width: 1px;
  height: 1px;
  opacity: 0;
  position: absolute;
`;

const Form = styled.form`
  width: 100%;
`;

const RemoveButton = styled(Button)`
    display: ${({ $images }) => $images ? 'block' : 'none'};
`;

const CameraAltOutlinedIconSC = styled(CameraAltOutlinedIcon)`
color: ${({ theme }) => theme.colors.blue};

  :hover {
    /* background: ${({ theme }) => setRgbaValue(theme.colors.blue, 0.09)}; */
  }

`;

// const Label = styled.label`
//     border: none;

//     cursor: pointer;

//      :hover {
//         svg {
//             background: ${({ theme }) => setRgbaValue(theme.colors.blue, 0.09)};
//         }

//         path,
//         span {
//             color: ${({ theme }) => theme.colors.blue};
//         }
//     }
// `;

const Menu = styled.menu`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  align-items: center;
`;

const TweetForm = () => {
  const { state: { user }, dispatch: appDispatch } = useContext(AppContext);

  const inputRef = useRef();

  const [tweet, setTweet] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const [fileValidation, setFileValidation] = useState('');

  const navigate = useNavigate();

  const navigateToTweets = () => {
    navigate('../home');
  }

  const handleFileChange = (event) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const maxFileSize = 1024 ** 3;

    const areFilesValid = [...event.target.files].every(({ name, size }) => {
      const fileExtension = name.split('.').pop();

      return allowedExtensions.includes(fileExtension) && size <= maxFileSize;
    });

    if (!areFilesValid) {
      setFileValidation('Invalid file type(s).');
      return;
    }


    setImages(event.target.files);

    const urls = [];

    for (const image of event.target.files) urls.push(URL.createObjectURL(image));

    setImageUrls(urls);

  }

  const removeImages = () => {
    imageUrls.forEach(imageUrl => URL.revokeObjectURL(imageUrl));

    setImages([]);

    setImageUrls([]);
  }

  const handleInputChange = ({ target: { value } }) => {
    setTweet(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('message', tweet);

    for (const image of images) {
      formData.append('image', image);
    }

    const postTweet = async () => {

      const response = images.length ?
        await axios.post('/tweets/create?image=true', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }) :
        await axios.post('/tweets/create', { message: tweet });

      if (response?.data.success) {
        appDispatch({ type: 'SET_ALERT', payload: { message: 'Tweet sent successfully.' } });

        navigateToTweets();
      }
    }

    postTweet();
  }

  return (
    <>
      <Header>
        <IconButton onClick={navigateToTweets}>

          <CloseIconSC />
        </IconButton>
        <Button form='tweet-form' type='submit' disabled={!(tweet.length || imageUrls.length)}>Tweet</Button>

      </Header>
      <Main>
        <FormContainer>

          <Avatar
            sx={{ width: 50, height: 50 }}
            src={user?.avatarUrl}
            alt={`${user?.handle} profile picture`}
          />

          <Form id='tweet-form' onSubmit={handleSubmit}>
            <Textarea
              name="tweet"
              id="tweet"
              value={tweet}
              placeholder="What's happening?"
              onChange={handleInputChange}
            />

            <Input ref={inputRef} type="file" name="image" id="image" multiple accept='image/*' onChange={handleFileChange} />
            <p><small>You can upload a maximum of 4 images.</small></p>

            <Menu>
              <li>
                <Button as='label' htmlFor="image">{imageUrls.length ? 'Change' : 'Add'} images</Button>
              </li>

              <li>
                <RemoveButton $images={imageUrls.length} onClick={removeImages}>Remove images</RemoveButton>
              </li>
            </Menu>

          </Form>
        </FormContainer>
        {!fileValidation && imageUrls.length ? <ImagePreview imageUrls={imageUrls} /> : <p>{fileValidation}</p>}
      </Main>
    </>
  )
}

export default TweetForm