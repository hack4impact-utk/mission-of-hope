import { CreateUserRequest, UserResponse } from '@/types/persons';
import dbConnect from '@/utils/db-connect';
import UserSchema from '@/server/models/users';

export async function createUser(
  user: CreateUserRequest
): Promise<UserResponse> {
  // Connect to the database
  await dbConnect();

  // call mongoose create method
  const response: UserResponse = await UserSchema.create(user);
  return response;
}
