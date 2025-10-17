export abstract class StatsRepository {
  abstract create(dto: any): Promise<any>;
  abstract findAll(params?: any): Promise<any[]>;
  abstract findOne(id: number): Promise<any>;
  abstract findByPlayer(playerId: number): Promise<any[]>;
  abstract update(id: number, dto: any): Promise<any>;
  abstract delete(id: number): Promise<void>;
}
