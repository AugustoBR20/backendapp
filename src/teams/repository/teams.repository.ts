export abstract class TeamsRepository {
  abstract create(dto: any): Promise<any>;
  abstract findAll(): Promise<any[]>;
  abstract findOne(id: number): Promise<any>;
  abstract update(id: number, dto: any): Promise<any>;
  abstract delete(id: number): Promise<void>;
}
