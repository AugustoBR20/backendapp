import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<any>();

    // Somente rotas realmente públicas
    const publicPaths = ['/api/auth/login', '/api/auth/register'];
    const path = String(req.originalUrl || req.url || '');

    // se for rota pública, libera
    if (publicPaths.some(p => path.startsWith(p))) return true;

    // verifica header Authorization
    const auth = String(req.headers?.authorization || '');
    if (!auth.startsWith('Bearer ')) throw new UnauthorizedException('Token ausente');

    const token = auth.slice(7).trim();
    try {
      // verifica token; se válido, popula req.user com payload
      req.user = this.jwt.verify(token);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
