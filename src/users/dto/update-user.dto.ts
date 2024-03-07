import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
