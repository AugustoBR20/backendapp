import { IsNotEmpty, IsString } from 'class-validator';

// DTO para transferência de jogador: exige toTeamId (string)
export class TransferPlayerDTO {
  @IsNotEmpty() @IsString() toTeamId: string;
}
