// repositório abstrato (interface) - segue padrão SOLID das aulas
export abstract class UsersRepository {
  abstract createUser(dto: any): Promise<any>;
  abstract getAllUsers(): Promise<any[]>;
  abstract findByEmail(email: string): Promise<any>;
  abstract findById(id: number): Promise<any>;
  abstract updateUser(id: number, dto: any): Promise<any>;
  abstract deleteUser(id: number): Promise<void>;
}
