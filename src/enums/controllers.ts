export enum EUserActions {
  Get = 'getUser',
  GetAll = 'getAllUser',
  Login = 'loginUser',
  Register = 'registerUser',
  Remove = 'removeUser',
}

export enum EControllers {
  Users = 'users',
  Profile = 'profile',
  LoginAttempt = 'loginAttempt',
}

export enum ELoginAttemptActions {
  Get = 'getLoginAttempt',
  Add = 'addLoginAttempt',
}

export enum EProfileActions {
  Get = 'getProfile',
  AddBasic = 'addBasicProfile',
  Remove = 'removeProfile',
}
