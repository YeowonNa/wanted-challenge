import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import SignIn from './pages/sign-in';
import ErrorPage from './pages/error-page';
import SignUp from './pages/sign-up';
import Todo from './pages/todo';

// 사용자 인증 상태 확인 함수
const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

// ProtectedRoute 컴포넌트
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  if (!isAuthenticated() && location.pathname !== '*') {
    return <Navigate to='/auth/sign-in' />;
  }

  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 로그인 경로 */}
        <Route path='/auth/sign-in' element={<SignIn />} />
        <Route path='/auth/sign-up' element={<SignUp />} />
        {/* 인증된 사용자만 접근 가능한 경로 */}
        <Route
          path='/*'
          element={
            <ProtectedRoute>
              <Routes>
                <Route path='todo' element={<Todo />} />
                <Route path='*' element={<ErrorPage />} />
              </Routes>
            </ProtectedRoute>
          }
        />
        {/* 인증된 상태에서 로그인 페이지를 접근하려 하면 Todos로 리디렉션 */}
        <Route
          path='/auth/sign-in'
          element={isAuthenticated() ? <Navigate to='/todo' /> : <SignIn />}
        />

        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
