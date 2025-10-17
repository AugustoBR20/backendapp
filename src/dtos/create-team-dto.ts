import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamDTO {
  @IsNotEmpty() @IsString() name: string;
  @IsOptional() @IsString() city?: string;
  @IsNotEmpty() @IsString() abbreviation: string;
  @IsOptional() @IsString() logoUrl?: string;
}
