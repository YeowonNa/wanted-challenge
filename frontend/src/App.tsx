import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './AppRouter';

export default function App() {
  return <RouterProvider router={AppRouter} />;
}
