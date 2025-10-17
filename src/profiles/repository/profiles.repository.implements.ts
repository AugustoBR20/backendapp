import {
    BadRequestException, ConflictException, Injectable,
    NotFoundException
} from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { ProfilesRepository } from "./profiles.repository";
import { UpdateProfileDto } from "src/dtos/update-profile-dto";
import { CreateProfileDto } from "src/dtos/create-profiles-dto";
import { GetProfileDto } from "src/dtos/get-profile-dto";

@Injectable()
export class ProfilesRepositoryImplements implements ProfilesRepository {

    constructor(private prisma: PrismaService) { }

    async create(dto: CreateProfileDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id:
                    dto.userId
            }
        });
        if (!user) {
            throw new BadRequestException('Usuário não existe.');
        }
        const existing = await this.prisma.profile.findUnique({
            where: {
                userId: dto.userId
            }
        });
        if (existing) {
            throw new ConflictException('Usuário já possui um perfil.');
        }
        const profile = await this.prisma.profile.create({
            data: {
                userId: dto.userId ?? 0,
                fullName: dto.fullName ?? '',
                birthDate: dto.birthDate ?? '',
                avatarUrl: dto.avatarUrl ?? ''
            }
        });

        return profile;
    }

    async findOne(id: number): Promise<GetProfileDto> {
        const p = await this.prisma.profile.findUnique({ where: { id } });
        if (!p) throw new NotFoundException('Perfil não encontrado.');
        const dto = new GetProfileDto();
        dto.id = p.id;
        dto.userId = p.userId;
        dto.fullName = p.fullName;
        dto.birthDate = p.birthDate?.toISOString();
        dto.avatarUrl = p.avatarUrl ?? '';
        return dto;
    }

    async update(id: number, dto: UpdateProfileDto) {
        const profile = await this.prisma.profile.findUnique({
            where: { id }
        });
        if (!profile) throw new NotFoundException('Perfil não encontrado.');
        await this.prisma.profile.update({
            where: { id }, data: {
                birthDate: dto.birthDate,
                fullName: dto.fullName,
                avatarUrl: dto.avatarUrl,
            }
        });
    }
}
