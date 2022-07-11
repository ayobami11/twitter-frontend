import { Outlet, useMatch } from 'react-router-dom';

import axios from './axios';

import { createGlobalStyle } from 'styled-components';

import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';

// contexts
import { AppContextWrapper } from './contexts/app';
import { UserContextWrapper } from './contexts/user';
import { ThemeContextWrapper } from './contexts/theme';
import { TweetContextWrapper } from './contexts/tweet';
import { ProfileContextWrapper } from './contexts/profile';

import { NotificationPopup } from './components/general/NotificationPopup';

library.add(fas, faComment, faHeart);

const ResetStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
  }

  img {
    height: auto;
    max-width: 100%;
    object-fit: cover;
  }

  ul,
  menu {
    list-style: none;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors['#e7e9ea']};
  }
`;

const App = () => {
  const loginMatch = useMatch('/login');

  axios.interceptors.response.use(
    function (config) {
      return config;
    }, function (error) {
      if (error.response?.status === 401 && !loginMatch) {
        // redirects all unauthorized users to login page
        window.location = '/login';
      }

      return Promise.reject(error);
    });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContextWrapper>
        <ProfileContextWrapper>
          <AppContextWrapper>
            <ResetStyles />
            <GlobalStyles />
            <UserContextWrapper>
              <TweetContextWrapper>
                <Outlet />
                <NotificationPopup />
              </TweetContextWrapper>
            </UserContextWrapper>
          </AppContextWrapper>
        </ProfileContextWrapper>
      </ThemeContextWrapper>
    </StyledEngineProvider>
  );
};

export default App;
