import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  SignInFormInputs,
  signInUser,
  SignUpFormInputs,
  signUpUser,
} from './auth';
import { useMutation } from 'react-query';

export default function AuthAction() {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const isSignIn = pathname === '/auth/sign-in';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs | SignUpFormInputs>();

  const handleSignInSignUp = () => {
    if (isSignIn) {
      navigate('/auth/sign-up');
    } else {
      navigate('/auth/sign-in');
    }
  };

  const SignInMutation = useMutation(signInUser, {
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      navigate('/todo');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.message || '로그인 중 문제가 발생했습니다.');
    },
  });

  const SignUpMutation = useMutation(signUpUser, {
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      navigate('/todo');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.message || '회원가입 중 문제가 발생했습니다.');
    },
  });

  const onSubmit: SubmitHandler<SignInFormInputs | SignUpFormInputs> = (
    data
  ) => {
    if (isSignIn) {
      SignInMutation.mutate(data);
    } else {
      SignUpMutation.mutate(data);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    handleSignInSignUp,
    SignInMutation,
    onSubmit,
    pathname,
    SignUpMutation,
  };
}
