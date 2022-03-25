import { PartialType } from '@nestjs/swagger';
import { CreateUserSegmentDto } from './create-user-segment.dto';

export class UpdateUserSegmentDto extends PartialType(CreateUserSegmentDto) {}
