import { User, Donor } from './persons';

enum Evaluation {
  High,
  Low,
}

export interface Donation {
  user: User;
  name: string;
  catagory: string;
  entryDate: Date;
  donor: Donor;
  value: Value;
}

export interface Value {
  price: number;
  value: Evaluation;
  inRange: boolean;
}
