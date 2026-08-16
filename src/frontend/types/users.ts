export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface CreateUserInput {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone_number: string;
}
