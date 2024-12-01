import { UserLogin } from "../interfaces/UserLogin";
import { UserRegister } from "../interfaces/UserRegister";

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  token: string;
}

const login = async (userInfo: UserLogin) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: LoginResponse = await response.json();
  console.log(data); // TODO: save the JWT token to local storage
  return data;
}

const register = async (userInfo: UserRegister) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: RegisterResponse = await response.json();
  console.log(data);
  return data;
}

export { login, register };