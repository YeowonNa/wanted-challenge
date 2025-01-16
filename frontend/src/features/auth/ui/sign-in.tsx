import { Button, Input, Typography } from '@material-tailwind/react';
import AuthAction from '../model/auth.action';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    errors,
    SignInMutation,
    handleSignInSignUp,
    onSubmit,
  } = AuthAction();
  return (
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
              message: '유효한 이메일을 입력해주세요.',
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

      <Button
        className='mt-6'
        fullWidth
        type='submit'
        disabled={SignInMutation.isLoading}
      >
        {SignInMutation.isLoading ? '로그인 중...' : '로그인'}
      </Button>

      <Typography color='gray' className='mt-4 text-center font-normal'>
        아직 계정이 없으신가요?
        <button
          className='font-medium text-gray-900 pl-1'
          onClick={handleSignInSignUp}
        >
          가입하기
        </button>
      </Typography>
    </form>
  );
}
