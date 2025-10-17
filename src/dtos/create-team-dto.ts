import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreateTeamDTO {
  @IsNotEmpty() @IsString() name: string;
  @IsOptional() @IsString() logoUrl?: string;
  @IsNotEmpty() @IsString() conference: string;
  @IsOptional() @IsInt() @Min(0) titles?: number;
}
