import { Card, Typography } from '@material-tailwind/react';
import SignIn from '../../features/auth/ui/sign-in';
import SignUp from '../../features/auth/ui/sign-up';

export default function AuthPage() {
  const pathname = window.location.pathname;
  const isSignIn = pathname === '/auth/sign-in';

  return (
    <div className='flex flex-col gap-4 h-screen items-center justify-center'>
      <div className='border border-solid border-gray-200 p-10 rounded-md shadow-md'>
        <Card color='transparent' shadow={false}>
          <Typography variant='h4' color='blue-gray'>
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Typography>
          <Typography color='gray' className='mt-1 font-normal'>
            Todo List
          </Typography>
          {isSignIn ? <SignIn /> : <SignUp />}
        </Card>
      </div>
    </div>
  );
}
