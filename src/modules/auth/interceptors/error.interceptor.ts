import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (this.canActivate(context)) {
          if (error instanceof PrismaClientKnownRequestError) {
            if (error.code == 'P2002') {
              const fieldName = this.extractFieldNameFromError(error.meta);
              return throwError(
                () => new ConflictException(`The ${fieldName} already exists.`),
              );
            }
            if (error.code == 'P2025') {
              return throwError(
                () => new NotFoundException('Record not found.'),
              );
            }
            if (error.code == 'P2003') {
              return throwError(
                () => new BadRequestException('Foreign key constraint failed.'),
              );
            }
            if (error.code == 'P2004') {
              return throwError(
                () => new BadRequestException('Failed to parse query.'),
              );
            }
            if (error.code) {
              return throwError(
                () => new InternalServerErrorException('Database error.'),
              );
            }
          }

          if (error instanceof BadRequestException) {
            return throwError(
              () => new BadRequestException('Dados inválidos!'),
            );
          }
          if (error instanceof ConflictException) {
            return throwError(
              () => new ConflictException('Conflito de dados!'),
            );
          }
          if (error instanceof NotFoundException) {
            return throwError(
              () => new NotFoundException('Recurso não encontrado!'),
            );
          }
          if (error instanceof ForbiddenException) {
            return throwError(() => new ForbiddenException('Acesso proibido!'));
          }
          if (error instanceof UnauthorizedException) {
            return throwError(
              () => new UnauthorizedException('Não autorizado!'),
            );
          }

          return throwError(
            () => new InternalServerErrorException('Erro interno no servidor!'),
          );
        }
      }),
    );
  }

  private async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    console.info(request.body);
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      // const payload = await this.authService.validateUser(token);
      // request.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractFieldNameFromError(meta: any): string {
    if (meta && meta.target) {
      return meta.target.join(', ');
    }
    return 'field';
  }
}
