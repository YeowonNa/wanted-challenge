export type SignInFormInputs = {
  email: string;
  password: string;
};

export type SignUpFormInputs = {
  email: string;
  password: string;
};

export const signInUser = async (data: SignInFormInputs) => {
  const response = await fetch('http://localhost:8080/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('로그인에 실패했습니다. 다시 시도해주세요.');
  }

  return response.json();
};

export const signUpUser = async (data: SignUpFormInputs) => {
  const response = await fetch('http://localhost:8080/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('회원가입에 실패했습니다. 다시 시도해주세요.');
  }

  return response.json();
};
