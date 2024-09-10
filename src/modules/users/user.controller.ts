import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { UserResponse, UserCreatedResponse } from '@interfaces/user.interface';
import {
  ApiDeleteResponse,
  ApiGetAllResponse,
  ApiGetByIdResponse,
  ApiPatchResponse,
  ApiPostResponse,
} from '@decorators/api-response.decorators';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiPostResponse(UserCreatedResponse)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserCreatedResponse> {
    return this.UserService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiGetAllResponse(UserResponse)
  async findAllUsers(): Promise<UserResponse[]> {
    return this.UserService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiGetByIdResponse(UserResponse)
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    return this.UserService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiPatchResponse(UserResponse)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return this.UserService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/change-password')
  @ApiPatchResponse(UserResponse)
  async changePasswordUser(
    @Param('id') id: string,
    @Body() changePasswordUserDto: ChangePasswordDto,
  ): Promise<UserResponse> {
    return this.UserService.changePasswordUser(id, changePasswordUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiDeleteResponse(UserResponse)
  async deleteUser(@Param('id') id: string): Promise<UserResponse> {
    return this.UserService.deleteUser(id);
  }
}
