import UserSchema from '@/server/models/users';
import { CreateUserRequest, UserResponse } from '@/types/persons';
import dbConnect from '@/utils/db-connect';

export async function getAllUsers(): Promise<UserResponse[]> {
  await dbConnect();

  const response: UserResponse[] = await UserSchema.find();

  return response;
}

export async function createUser(
  user: CreateUserRequest
): Promise<UserResponse> {
  // Connect to the database
  await dbConnect();

  // call mongoose create method
  const response: UserResponse = await UserSchema.create(user);
  return response;
}

export async function getUserById(
  userId: string
): Promise<UserResponse | null> {
  try {
    await dbConnect();
    const user: UserResponse | null = await UserSchema.findById(userId);
    return user;
  } catch (error) {
    return null;
  }
}
