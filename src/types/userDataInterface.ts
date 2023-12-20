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
  }
  
  export default UserData_I;

export interface UserData_token_I {
    user : UserData_I,
    token : string
  }
  
  


  
  