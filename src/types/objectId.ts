import { z } from 'zod';
import { ObjectId } from 'bson';

export const zObjectId = z.string().refine((val) => ObjectId.isValid(val));

export default zObjectId;
