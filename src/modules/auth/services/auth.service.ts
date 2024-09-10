import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { User } from '@prisma/client'; // Modelo User do Prisma
import { PrismaService } from 'src/database/prisma.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  // Valida o usuário pelo email e senha
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (
      user &&
      (await this.passwordService.comparePasswords(pass, user.password))
    ) {
      return user;
    }
    return null;
  }

  // Realiza o login e gera o token JWT
  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    // Verificar se o usuário já possui um token ativo
    const existingToken = await this.redis.get(`token_${user.id}`);
    if (existingToken) {
      const isBlacklisted = await this.isTokenBlacklisted(existingToken);
      if (!isBlacklisted) {
        // Se o token ainda for válido, colocá-lo na blacklist
        await this.addTokenToBlacklist(existingToken);
      }
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
      select: { userType: true },
    });

    // Gerar um novo token JWT
    const newToken = this.jwtService.sign({
      ...payload,
      userType: existingUser.userType,
    });

    // Armazenar o novo token no Redis associado ao usuário
    await this.redis.set(`token_${user.id}`, newToken);

    return {
      access_token: newToken,
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token); // Verifica o token sem expiração
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Adiciona token à blacklist
  async addTokenToBlacklist(token: string) {
    const decoded = this.jwtService.decode(token) as { exp: number };
    const expireAt = decoded.exp - Math.floor(Date.now() / 1000);
    await this.redis.set(token, 'blacklisted', 'EX', expireAt);
  }

  // Verifica se o token está na blacklist
  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.redis.get(token);
    return result !== null;
  }
}
