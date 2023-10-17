interface Person {
  lastName: string;
  firstName: string;
  email: string;
}

export interface User extends Person {}

export interface Donor extends Person {}
