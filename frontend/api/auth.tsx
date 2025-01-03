export interface SignupParams {
  email: string;
  password: string;
}

//   export const signup = async ({ email, password }: SignupParams) => {
//     const response = await axios.post<SignupResponseType>(`${currentServerUrl}/users/create`, {
//       email,
//       password,
//     });
//     return response.data;
//   };
