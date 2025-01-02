import { useNavigate } from 'react-router-dom';

export default function SignUn() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/');
  };

  return (
    <div className='flex flex-col gap-4 h-screen items-center justify-center'>
      <div className='pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2'>
        <h1 className='font-bold'>TODO LIST</h1>
        <input
          type='email'
          className='w-full p-1 rounded-sm border border-gray-400'
          placeholder='이메일을 입력해주세요.'
        />

        <input
          type='password'
          className='w-full p-1 rounded-sm border border-gray-400'
          placeholder='비밀번호를 입력해주세요.'
        />
        <button
          color='light-blue'
          className='w-full text-md py-1 rounded-md bg-blue-300 text-white'
        >
          로그인
        </button>
      </div>

      <div className='py-4 w-full text-center text-sm max-w-lg border border-gray-400 bg-white'>
        로그인 하시겠습니까?
        <button
          className='text-light-blue-600 font-bold pl-1'
          onClick={handleSignIn}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
