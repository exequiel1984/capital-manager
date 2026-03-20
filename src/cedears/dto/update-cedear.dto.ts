import { PartialType } from '@nestjs/mapped-types';
import { CreateCedearDto } from './create-cedear.dto';

export class UpdateCedearDto extends PartialType(CreateCedearDto) {}
