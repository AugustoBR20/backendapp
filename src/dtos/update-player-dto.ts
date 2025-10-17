import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdatePlayerDTO {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsInt() number?: number;
  @IsOptional() @IsString() position?: string;
  @IsOptional() @IsInt() teamId?: number | null;
  @IsOptional() @IsString() photoUrl?: string;
}
