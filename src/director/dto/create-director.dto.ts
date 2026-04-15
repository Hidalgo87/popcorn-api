import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateDirectorDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsObject()
  @IsNotEmpty()
  jsonDoctor!: Record<string, any>;
}
