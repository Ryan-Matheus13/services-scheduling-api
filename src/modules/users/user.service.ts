import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserType } from '@prisma/client'; // Importa User e UserType do Prisma
import { PrismaService } from 'src/database/prisma.service';
import { PasswordService } from '../auth/services/password.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { UserCreatedResponse } from '@interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserCreatedResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        userType: createUserDto.userType,
      },
      select: {
        email: true,
        userType: true,
      },
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return user;
  }

  async changePasswordUser(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (changePasswordDto.password != changePasswordDto.confirmPassword) {
      throw new BadRequestException(`Passwords do not match`);
    }

    let hashedPassword: string | undefined;
    if (changePasswordDto.password) {
      hashedPassword = await this.passwordService.hashPassword(
        changePasswordDto.password,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword ?? user.password,
      },
    });
  }
}
