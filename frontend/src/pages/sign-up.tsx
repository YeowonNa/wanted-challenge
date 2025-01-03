import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
export default function SignUn() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/');
  };

  return (
    <div className='flex flex-col gap-4 h-screen items-center justify-center'>
      <div className='border border-solid border-gray-200 p-10 rounded-md shadow-md'>
        <Card color='transparent' shadow={false}>
          <Typography variant='h4' color='blue-gray'>
            Sign Up
          </Typography>
          <Typography color='gray' className='mt-1 font-normal'>
            Todo List
          </Typography>
          <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
            <div className='mb-1 flex flex-col gap-6'>
              <Typography variant='h6' color='blue-gray' className='-mb-3'>
                Your Email
              </Typography>
              <Input
                size='lg'
                placeholder='name@mail.com'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant='h6' color='blue-gray' className='-mb-3'>
                Password
              </Typography>
              <Input
                type='password'
                size='lg'
                placeholder='********'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>

            <Button className='mt-6' fullWidth>
              가입하기
            </Button>
            <Typography color='gray' className='mt-4 text-center font-normal'>
              이미 계정이 있으신가요?
              <button
                className='font-medium text-gray-900 pl-1'
                onClick={handleSignIn}
              >
                로그인
              </button>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}
