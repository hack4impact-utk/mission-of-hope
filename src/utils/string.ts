import { DonorResponse } from '@/types/donors';

// Perform a set of replacements on a string
export function replaceMultiple(
  str: string,
  replacements: Map<string, string>
): string {
  let result: string = str;
  replacements.forEach((replaceValue, searchValue) => {
    result = result.replaceAll(searchValue, replaceValue);
  });
  return result;
}

// Replace the email template placeholder values with the corresponding values from a donor and optionally a date
export function populateEmailTemplate(
  body: string,
  donor: DonorResponse,
  date?: Date
): string {
  const replacementMap = new Map<string, string>([
    ['[LDONOR]', donor.lastName],
  ]);
  if (donor.firstName) {
    replacementMap.set('[FDONOR]', donor.firstName);
  }
  if (date) {
    // If we received an invalid Data object, convert it to Date
    const parsedDate = date instanceof Date ? date : new Date(date);
    replacementMap.set('[DATE]', parsedDate.toDateString());
  }
  return replaceMultiple(body, replacementMap);
}
