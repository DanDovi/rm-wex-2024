import { jwtDecode } from "jwt-decode";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface ILoginResponse {
  data: {
    username: string;
    accessToken: string;
  };
}

interface IRegisterResponse extends ILoginResponse {}

interface IToken {
  id: string;
  username?: string;
}

export const login = async (username: string, password: string) => {
  const result = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (result.status !== 200) {
    throw new Error("Login failed");
  }

  const resJson = (await result.json()) as ILoginResponse;

  console.log(resJson);

  const accessToken = resJson.data.accessToken;

  if (!accessToken) {
    console.log("no access token");
    throw new Error("Login failed");
  }

  const decodedToken = jwtDecode(accessToken) as IToken;

  const resUserName = decodedToken?.username;

  console.log(decodedToken);

  if (!resUserName) {
    console.log("no username");
    throw new Error("Login failed");
  }

  return { username: resUserName, accessToken, userId: decodedToken.id };
};

export const register = async (username: string, password: string) => {
  const result = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (result.status === 401) {
    // TODO: Make this use the message/status from the API
    throw new Error("Username already exists");
  }

  if (result.status !== 200) {
    console.log("not 200");
    throw new Error("Registration failed");
  }

  const resJson = (await result.json()) as IRegisterResponse;

  const accessToken = resJson.data.accessToken;

  if (!accessToken) {
    console.log("no access token");
    throw new Error("Registration failed");
  }

  const decodedToken = jwtDecode(accessToken) as IToken;

  console.log(decodedToken);

  const resUserName = decodedToken?.username;
  const resId = decodedToken?.id;

  if (!resUserName) {
    console.log("no username");
    throw new Error("Registration failed");
  }

  return { username: resUserName, accessToken, userId: resId };
};
