import {
    IsInt, IsPositive, IsString, Length, IsOptional, IsDateString,
    IsUrl, MaxLength
} from 'class-validator';

export class CreateProfileDto {
    @IsInt()
    @IsPositive()
    userId: number;
    
    @IsString()
    @Length(2, 120)
    fullName: string;
    
    @IsOptional()
    @IsDateString()
    birthDate?: string;
    
    @IsOptional()
    @MaxLength(500)
    avatarUrl?: string;
}