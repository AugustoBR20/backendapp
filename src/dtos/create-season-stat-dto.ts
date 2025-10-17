import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreateSeasonStatDTO {
  @IsNotEmpty() @IsString() season: string;
  @IsOptional() @IsInt() @Min(0) games?: number;
  @IsOptional() @Min(0) points?: number;
  @IsOptional() @Min(0) rebounds?: number;
  @IsOptional() @Min(0) assists?: number;
  @IsNotEmpty() @IsInt() playerId: number;
}
