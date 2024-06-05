import { z } from 'zod';
import type { ZodType } from 'zod';

/**
 * This hook is used to validate form data using a Zod schema.
 * @param zodSchema The Zod schema to use for validation
 * @returns An object with a `validate` function that takes the form data and returns an object with the errors for each field, or null if the data is valid
 */
export default function useValidation<TZod extends ZodType<any, any, any>>(
  zodSchema: TZod
) {
  type Data = z.infer<TZod>;
  return {
    validate: (data: Data): Record<keyof Data, string> | null => {
      // Validate the data
      const result = zodSchema.safeParse(data);
      if (result.success) {
        // If the data is valid, return null
        return null;
      }

      // If the data is invalid, return an object with the errors for each field
      return result.error.errors.reduce(
        (acc, error) => ({
          ...acc,
          [error.path[0]]: error.message,
        }),
        {} as Record<keyof Data, string>
      );
    },
  };
}
