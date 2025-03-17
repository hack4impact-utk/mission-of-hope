import UserSchema from '@/server/models/users';
import { UpdateAllowedUsersRequest, UserResponse } from '@/types/users';
import dbConnect from '@/utils/db-connect';
import { getSettings } from './settings';
import Settings from '@/server/models/settings';

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

export async function removeAdmin(userId: string): Promise<void> {
  try {
    await dbConnect();

    await UserSchema.updateOne({ _id: userId }, { isAdmin: false });
  } catch (error) {
    throw new Error('500 Admin could not be removed');
  }
}

export async function updateAllowedUsers(req: UpdateAllowedUsersRequest) {
  try {
    await dbConnect();

    // if userEmails is not undefined, update allowed emails array
    if (req.userEmails) {
      const currentSettings = await getSettings();
      await Settings.updateOne(
        { _id: currentSettings._id },
        { allowedEmails: req.userEmails }
      );
    }

    // Should we remove user objects for emails that are no longer allowed?

    //if adminIds is not undefined, flag included users as admin
    if (req.adminIds) {
      await addAdmins(req.adminIds);
    }
  } catch (error) {
    throw error;
  }
}
