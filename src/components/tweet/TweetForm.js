import { useState, useEffect, useContext, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { AppContext } from '../../contexts/app';
import { ProfileContext } from '../../contexts/profile';

import styled from 'styled-components';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import CloseIcon from '@mui/icons-material/Close';

import { Button } from '../general/Button';

import axios from '../../axios';
import ImagePreview from '../ImagePreview';

const PageContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors['#2f3336']};
  
  line-height: 1.5;
  max-width: 1000px;
  margin: 1.5em auto;
  width: 90%;
  `;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  border-bottom: 1px solid ${({ theme }) => theme.colors['#2f3336']};
  padding: 1em;
`;

const Main = styled.main`
  width: 90%;
  margin: 1em auto;
`;

const FormContainer = styled.div`
  display: flex;
  gap: calc(.5em + 1vw);

  margin: 1em 0;
`;

const CloseIconSC = styled(CloseIcon)`
  color: ${({ theme }) => theme.colors.white};
`;

const Form = styled.form`
    width: 100%;
`;

const Textarea = styled.textarea`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: 1rem;
  height: min(50vh, 300px);
  line-height: 1.5;
  outline: none;
  padding: 1em; 
  resize: none;
  width: 100%;
`;

const Input = styled.input`
  width: 1px;
  height: 1px;
  opacity: 0;
  position: absolute;
`;


const ImageCountText = styled.p`
  display: flex;
  align-items: center;
  gap: .5em;

  color: lavenderblush;
  font-size: .8rem;
  margin: 1em 0;
`;

const Menu = styled.menu`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  align-items: center;
`;

const ButtonSC = styled(Button)`
  font-size: .8rem;
  padding: .75em 1.5em;
`;

const TweetForm = () => {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: { profile }, dispatch } = useContext(ProfileContext);

  const inputRef = useRef();

  const [tweet, setTweet] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const [fileValidation, setFileValidation] = useState('');

  const navigate = useNavigate();

  const navigateToTweets = () => {
    navigate('/home');
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
    } else {
      setFileValidation('');
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

  useEffect(() => {
    const getUserProfile = async () => {
      try {

        const response = await axios.get('/user');

        if (response?.data.success) {
          dispatch({ type: 'SET_PROFILE', payload: { profile: response.data.user } });
        }
      } catch (error) {
        console.log(error)
      }
    }

    getUserProfile();

  }, [dispatch]);

  return (
    <PageContainer>
      <Header>
        <IconButton onClick={navigateToTweets}>

          <CloseIconSC />
        </IconButton>
        <Button form='tweet-form' type='submit' disabled={!(tweet.length || imageUrls.length)}>Tweet</Button>

      </Header>
      <Main>
        <FormContainer>

          <Avatar
            sx={{ width: 50, height: 50, background: 'hsl(0, 3%, 42%)' }}
            src={profile?.avatarUrl}
            alt={`${profile?.handle} profile picture`}
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

          </Form>
        </FormContainer>
        <Menu>
          <li>
            <ButtonSC as='label' htmlFor="image">{imageUrls.length ? 'Change' : 'Add'} images</ButtonSC>
          </li>

          {images.length ? (
            <li>
              <ButtonSC onClick={removeImages}>Remove images</ButtonSC>
            </li>
          ) : null}
        </Menu>
        <ImageCountText><InfoOutlinedIcon /><strong>You can upload a maximum of 4 images (allowed types: .jpg, .png)</strong></ImageCountText>
        {!fileValidation && imageUrls.length ? <ImagePreview imageUrls={imageUrls} /> : <p>{fileValidation}</p>}
      </Main>
    </PageContainer>
  )
}

export default TweetForm