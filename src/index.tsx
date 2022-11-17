import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './config/firebaseConfig';
import { AuthProvider } from './contexts/auth/authProvider';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';
import RequireAuth from './Components/RequireAuth';
import LoginPage from './pages/login';
import RedirectIfAuthorised from './Components/RedirectIfAuthorised';
import SignUpPage from './pages/signup';
import SetupAccount from './pages/setup/setupAccount';

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <RequireAuth>
        <App />
      </RequireAuth>
  },
  {
    path: '/login',
    element: 
      <RedirectIfAuthorised redirectUrl='/'>
        <LoginPage />
      </RedirectIfAuthorised>
  },
  {
    path: '/signup',
    element:
      <RedirectIfAuthorised redirectUrl='/'>
        <SignUpPage />
      </RedirectIfAuthorised>
  },
  {
    path: '/accountsetup',
    element: <SetupAccount />
  }
])

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
        { /*<App />*/ }
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
