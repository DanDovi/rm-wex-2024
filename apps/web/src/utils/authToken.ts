export interface IUserDetails {
  username: string;
  userId: string;
  accessToken: string;
}

const storeUserDetails = (userDetails: IUserDetails) => {
  localStorage.setItem("token", JSON.stringify(userDetails));
};

const getUserDetails = (): IUserDetails | null => {
  const storedUser = localStorage.getItem("token");

  if (!storedUser) {
    return null;
  }

  return JSON.parse(storedUser);
};

export { getUserDetails, storeUserDetails }
