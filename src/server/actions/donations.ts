/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from '@/utils/db-connect';
import Donor from '../models/donors';
import DonationSchema from '../models/donations';
import ItemSchema from '../models/items';
import DonationItem from '../models/donationItem';
import User from '../models/users';
import {
  CreateDonationRequest,
  DonationEntity,
  DonationResponse,
  UpdateDonationRequest,
} from '@/types/donation';

User;
DonationItem;
Donor;
ItemSchema;

export async function createDonation(
  donation: CreateDonationRequest
): Promise<DonationEntity> {
  try {
    await dbConnect();

    const response: DonationEntity = await DonationSchema.create(donation);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllDonations(): Promise<DonationResponse[]> {
  try {
    await dbConnect();

    const response: DonationResponse[] = await DonationSchema.find()
      .populate(['user', 'donor'])
      .sort([['entryDate', 'descending']])
      .populate({ path: 'items', populate: { path: 'item' } })
      .lean();

    response.map((donation) => {
      donation.user._id = donation.user._id.toString();
      donation.donor._id = donation.donor._id.toString();
      donation._id = donation._id.toString();
      donation.items.map((donationItem) => {
        donationItem._id = donationItem._id.toString();
        donationItem.item._id = donationItem.item._id.toString();
      });
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getDonationById(
  id: string
): Promise<DonationResponse | null> {
  try {
    await dbConnect();

    const response: DonationResponse | null = await DonationSchema.findById(id)
      .populate(['user', 'donor', 'items'])
      .populate({
        path: 'items',
        populate: {
          path: 'item',
        },
      });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateDonation(
  id: string,
  updatedData: UpdateDonationRequest
): Promise<DonationResponse | null> {
  await dbConnect();

  try {
    const donation: DonationResponse | null =
      await DonationSchema.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true }
      );

    return donation;
  } catch (error) {
    // Catch any errors and throw them
    throw error;
  }
}
