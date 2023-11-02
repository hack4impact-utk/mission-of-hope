import { z } from 'zod';
import objectIdSchema from './objectId';

export const zBase = z.object({
  _id: objectIdSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Base = z.infer<typeof zBase>;

export default zBase;
