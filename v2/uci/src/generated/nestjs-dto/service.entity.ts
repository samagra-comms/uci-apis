import { Prisma } from '../../../prisma/generated/prisma-client-js';
import { Transformer } from './transformer.entity';
import { UserSegment } from './userSegment.entity';

export class Service {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  config: Prisma.JsonValue | null;
  name: string | null;
  Transformer?: Transformer[];
  UserSegmentByID?: UserSegment[];
  UserSegmentByPhone?: UserSegment[];
  UserSegmentAll?: UserSegment[];
}
