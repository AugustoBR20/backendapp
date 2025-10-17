import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdateTeamDTO {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() logoUrl?: string;
  @IsOptional() @IsString() conference?: string;
  @IsOptional() @IsInt() @Min(0) titles?: number;
}
