export enum LocalUser {
  UserInfo = "user-info",
}

export const setLocalUser = (user: any) => {
  localStorage.setItem(LocalUser.UserInfo, JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const User = localStorage.getItem(LocalUser.UserInfo);
  return JSON.parse(String(User));
};
