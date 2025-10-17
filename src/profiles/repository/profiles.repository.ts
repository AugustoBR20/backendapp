import { CreateProfileDto } from "src/dtos/create-profiles-dto";
import { GetProfileDto } from "src/dtos/get-profile-dto";
import { UpdateProfileDto } from "src/dtos/update-profile-dto";

export abstract class ProfilesRepository {
    abstract create(dto: CreateProfileDto);
    abstract findOne(id: number): Promise<GetProfileDto>;
    abstract update(id: number, dto: UpdateProfileDto);
}