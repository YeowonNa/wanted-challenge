import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import Todo from './pages/todo';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import ErrorPage from './pages/error-page';

function authLoader() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return redirect('/auth/sign-in');
  }
  return null;
}

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Navigate to='/todo' replace />,
      },
      {
        path: '/todo',
        children: [
          {
            index: true,
            element: <Todo />,
          },
          {
            path: ':id',
            element: <Todo />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        index: true,
        element: <Navigate to='/auth/sign-in' replace />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
