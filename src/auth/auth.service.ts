import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v1 as uuidv1 } from 'uuid';
import { UserTypes } from './entities';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
}
