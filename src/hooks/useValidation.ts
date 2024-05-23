import { z } from 'zod';
import { ZodType } from 'zod';

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
    validate: (data: Data) => {
      // Validate the data
      const result = (zodSchema as ZodType<Data>).safeParse(data);
      if (result.success) {
        // If the data is valid, return null
        return null;
      }

      return result.error.format();
    },
  };
}
