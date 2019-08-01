export class LoginUser {
  user_id: string;
  password: string;
}

export class User{
  user_id: string;
  user_name: string;
  password: string;
  user_role: string;
  user_permissions: { [key: string]: number };
}
export class DeleteUser{
  user_id: string;
}
