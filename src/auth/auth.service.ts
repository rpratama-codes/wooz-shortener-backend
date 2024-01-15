import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, RegisterDto, Roletype } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v1 as uuidv1 } from 'uuid';
import { UserTypes } from './entities';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const user_uid = uuidv1();
      const password = await argon2.hash(dto.password);

      const regist = await this.prisma.users.create({
        data: {
          first_name: dto.first_name,
          last_name: dto.last_name,
          user_type: UserTypes.free,
          user_uid,
          email: dto.email,
          password,
        },
        select: {
          first_name: true,
          last_name: true,
          email: true,
          user_type: true,
          user_uid: true,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Register succesful',
        data: regist,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email is already registered');
        }
      }

      throw error;
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        throw new NotFoundException('Email is not registered');
      }

      const verify = await argon2.verify(user.password, dto.password);

      if (!verify) {
        throw new BadRequestException('Wrong password');
      }

      const payload = {
        sub: user.user_uid,
        user_type: user.user_type,
      };

      delete user.password;
      delete user.id;
      delete user.createdAt;
      delete user.updatedAt;

      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: user,
        accessToken: await this.jwtService.signAsync(
          { ...payload, role: Roletype.user },
          {
            secret: this.config.get('JWT_SECRET_ACCESS'),
            expiresIn: '15m',
          },
        ),
        refreshToken: await this.jwtService.signAsync(
          { ...payload, role: Roletype.refresh },
          {
            secret: this.config.get('JWT_SECRET_REFRESH'),
            expiresIn: '7d',
          },
        ),
      };
    } catch (error) {
      throw error;
    }
  }
}
