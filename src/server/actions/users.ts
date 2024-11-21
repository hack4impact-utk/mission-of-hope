import UserSchema from '@/server/models/users';
import { UserResponse } from '@/types/users';
import dbConnect from '@/utils/db-connect';

export async function getAllUsers(): Promise<UserResponse[]> {
  await dbConnect();

  const response: UserResponse[] = await UserSchema.find();

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

export async function getUserByEmail(email: string): Promise<UserResponse> {
  let user: UserResponse | null = null;
  try {
    await dbConnect();
    user = await UserSchema.findOne({ email: email }).lean();
  } catch (error) {
    throw new Error('500 User lookup failed');
  }
  if (!user) {
    throw new Error('404 User not found');
  }
  return user;
}

//
export async function addAdmins(userIds: string[]): Promise<void> {
  try {
    await dbConnect();

    await UserSchema.updateMany({ _id: { $in: userIds } }, { isAdmin: true });
  } catch (error) {
    throw new Error('500 Admins could not be added');
  }
}
