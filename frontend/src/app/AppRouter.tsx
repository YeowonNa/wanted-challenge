import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import ErrorPage from '../pages/error-page';
import { fetchTodos } from '../features/todos/model/todos';
import AuthPage from '../pages/auth';
import Todo from '../pages/todo';

function authLoader() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return redirect('/auth/sign-in');
  }
  return null;
}

function guestLoader() {
  const token = localStorage.getItem('authToken');
  if (token) {
    return redirect('/');
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
            loader: fetchTodos,
          },
          {
            path: ':id',
            element: <Todo />,
            loader: async ({ params }) => {
              const todos = await fetchTodos();
              const todo = todos.data.find((todo) => todo.id === params.id);
              if (!todo) {
                throw new Error('해당 Todo를 찾을 수 없습니다.');
              }
              return { todo };
            },
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    loader: guestLoader,
    children: [
      {
        index: true,
        element: <Navigate to='/auth/sign-in' replace />,
      },
      {
        path: 'sign-in',
        element: <AuthPage />,
      },
      {
        path: 'sign-up',
        element: <AuthPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
