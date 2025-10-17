import { IsNotEmpty, IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class CreatePlayerDTO {
  @IsNotEmpty() @IsString() name: string;
  @IsOptional() @IsInt() @Min(0) @Max(99) number?: number;
  @IsOptional() @IsString() position?: string;
  @IsOptional() @IsInt() @Min(150) @Max(250) heightCm?: number;
  @IsOptional() @IsInt() @Min(50) @Max(200) weightKg?: number;
  @IsOptional() @IsInt() teamId?: number | null;
  @IsOptional() @IsString() photoUrl?: string;
}
