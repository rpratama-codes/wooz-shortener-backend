import { Injectable, NotFoundException } from '@nestjs/common';
import { UserFromJwt } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticService {
  constructor(private prisma: PrismaService) {}
  async findAllByUserUid(user: UserFromJwt) {
    try {
      const analytic = await this.prisma.urls.findMany({
        where: {
          created_by: user.sub,
        },
        include: {
          Statistics: true,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      });

      if (analytic.length === 0) {
        throw new NotFoundException();
      }

      return analytic;
    } catch (error) {
      throw error;
    }
  }
}
