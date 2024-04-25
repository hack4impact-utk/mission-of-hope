import dbConnect from '@/utils/db-connect';

export async function getReciptNumber(): Promise<number> {
  try {
    await dbConnect();

    return 0;
  } catch (error) {
    throw error;
  }
}
