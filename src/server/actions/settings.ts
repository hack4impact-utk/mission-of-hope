import { SettingsResponse } from '@/types/settings';
import dbConnect from '@/utils/db-connect';
import Settings from '@/server/models/settings';

export async function getSettings(): Promise<SettingsResponse> {
  let settingsArr: SettingsResponse[] = [];

  try {
    await dbConnect();
    settingsArr = await Settings.find({}).lean();

    // there should always be exactly one settins object in the db
    if (settingsArr.length !== 1) {
      throw new Error('Must be exactly 1 settings object in database');
    }
  } catch (error) {
    throw error;
  }

  return settingsArr[0];
}
