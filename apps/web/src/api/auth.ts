import { jwtDecode } from "jwt-decode";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface ILoginResponse {
  data: {
    username: string;
    accessToken: string;
  };
}

interface IRegisterResponse extends ILoginResponse {}

interface ITokenWithPayload {
  payload?: {
    email?: string;
  };
}

export const login = async (username: string, password: string) => {
  const result = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email: username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (result.status !== 200) {
    throw new Error("Login failed");
  }

  const resJson = (await result.json()) as ILoginResponse;

  const accessToken = resJson.data.accessToken;

  if (!accessToken) {
    throw new Error("Login failed");
  }

  const decodedToken = jwtDecode(accessToken) as ITokenWithPayload;

  const resUserName = decodedToken?.payload?.email;

  if (!resUserName) {
    throw new Error("Login failed");
  }

  return { username: resUserName, accessToken };
};

export const register = async (username: string, password: string) => {
  const result = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email: username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (result.status !== 200) {
    console.log("not 200");
    throw new Error("Register failed");
  }

  const resJson = (await result.json()) as IRegisterResponse;

  const accessToken = resJson.data.accessToken;

  if (!accessToken) {
    console.log("no access token");
    throw new Error("Register failed");
  }

  const decodedToken = jwtDecode(accessToken) as ITokenWithPayload;

  console.log(decodedToken);

  const resUserName = decodedToken?.payload?.email;

  if (!resUserName) {
    console.log("no username");
    throw new Error("Register failed");
  }

  return { username: resUserName, accessToken };
};
