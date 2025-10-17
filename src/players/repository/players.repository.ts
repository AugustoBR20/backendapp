export abstract class PlayersRepository {
  abstract create(dto: any): Promise<any>;
  abstract findAll(query?: any): Promise<any[]>;
  abstract findOne(id: number): Promise<any>;
  abstract update(id: number, dto: any): Promise<any>;
  abstract delete(id: number): Promise<void>;
  abstract transfer(playerId: number, toTeamId: number, performedBy?: number): Promise<any>;
}
