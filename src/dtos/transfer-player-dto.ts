import { IsNotEmpty, IsInt } from 'class-validator';

// DTO para transferência de jogador: exige toTeamId (int)
export class TransferPlayerDTO {
  @IsNotEmpty() @IsInt() toTeamId: number;
}
