import UserSchema from '../models/users';
import dbConnect from '@/utils/db-connect';
import { UserResponse } from '@/types/persons';

export async function getAllUsers(): Promise<UserResponse[]> {
  await dbConnect();

  const response: UserResponse[] = await UserSchema.find();

  return response;
}
