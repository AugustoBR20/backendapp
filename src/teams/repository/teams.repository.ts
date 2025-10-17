export abstract class TeamsRepository {
  abstract create(dto: any): Promise<any>;
  abstract findAll(): Promise<any[]>;
  abstract findOne(id: string): Promise<any>;
  abstract update(id: string, dto: any): Promise<any>;
  abstract delete(id: string): Promise<void>;
}
