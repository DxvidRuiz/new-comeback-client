interface UserData_I {
  id?: string;
  username?: string;
  name?: string;
  lastname?: string;
  gender?: string;
  dateOfBirth?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  profile?: ProfileData_I;
}

export default UserData_I;

export interface UserData_token_I {
  user: UserData_I,
  token: string
}

export interface ProfileData_I {
  id: string;
  profilePhotoRoute?: string;
  profilePhotoName?: string;
  imageRoute?: string | null;
  Description?: string | null;
  userId?: string;
}




