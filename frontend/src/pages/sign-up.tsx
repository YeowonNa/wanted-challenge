import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { SignUpFormInputs, signUpUser } from '../api/auth';

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const handleSignIn = () => {
    navigate('/auth/sign-in');
  };

  const mutation = useMutation(signUpUser, {
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      navigate('/todo');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.message || '회원가입 중 문제가 발생했습니다.');
    },
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    mutation.mutate(data);
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
          <form
            className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='mb-1 flex flex-col gap-6'>
              <Typography variant='h6' color='blue-gray' className='-mb-3'>
                Your Email
              </Typography>
              <Input
                size='lg'
                placeholder='name@mail.com'
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: '이메일 형식을 확인해주세요.',
                  },
                })}
                className='!border-t-blue-gray-200 focus:!border-t-gray-900'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              {errors.email && (
                <Typography color='red' className='text-sm font-semibold'>
                  * {errors.email.message}
                </Typography>
              )}

              <Typography variant='h6' color='blue-gray' className='-mb-3'>
                Password
              </Typography>
              <Input
                type='password'
                size='lg'
                placeholder='********'
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 8자리 이상으로 입력해주세요.',
                  },
                })}
                className='!border-t-blue-gray-200 focus:!border-t-gray-900'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              {errors.password && (
                <Typography color='red' className='text-sm font-semibold'>
                  * {errors.password.message}
                </Typography>
              )}
            </div>

            <Button className='mt-6' fullWidth type='submit'>
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
