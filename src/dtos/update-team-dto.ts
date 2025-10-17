import { IsOptional, IsString } from 'class-validator';

export class UpdateTeamDTO {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() abbreviation?: string;
  @IsOptional() @IsString() logoUrl?: string;
}
