import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { UpdateShortenerDto } from './dto/update-shortener.dto';
import { WoozService } from 'src/wooz/wooz.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ShortenerService {
  constructor(
    private woozService: WoozService,
    private prisma: PrismaService,
  ) {}

  async create(dto: CreateShortenerDto, user: any | undefined = undefined) {
    try {
      const url_short: string = this.woozService.generateFourLetter();
      const url_uid: string = uuidv4();
      const currentDate = new Date();

      let url_ttl: string;
      let created_by: string;
      let session_id: string | undefined;

      if (!user) {
        url_ttl = (currentDate.getTime() + 3 * 60 * 60 * 1000).toString();
        created_by = 'e19a18f4-b37d-11ee-a506-0242ac120002';
        session_id = dto.session_id;
      } else {
        url_ttl = (currentDate.getTime() + 3 * 24 * 60 * 60 * 1000).toString();
        created_by = user.sub;
      }

      const url = await this.prisma.urls.create({
        data: {
          url_original: dto.url,
          url_short,
          url_ttl,
          url_uid,
          created_by,
          session_id,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Short URL created',
        data: url,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(usr: any) {
    try {
      const url = await this.prisma.urls.findMany({
        where: { created_by: usr.sub },
      });

      if (!url) {
        throw new NotFoundException('No record found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'ok',
        data: url,
      };
    } catch (error) {
      throw error;
    }
  }

  async redirect(url_short: string) {
    try {
      const url = await this.prisma.urls.findFirst({
        where: { url_short },
        select: { url_original: true, url_short: true, url_ttl: true },
      });

      if (!url) {
        throw new NotFoundException('No Record Found');
      }

      const currentTime: number = new Date().getTime();
      const expire: number = parseInt(url.url_ttl);

      if (currentTime > expire) {
        throw new ForbiddenException('Link is expired');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'ok',
        url: url.url_original,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(url_short: string, dto: UpdateShortenerDto, user: any) {
    try {
      const upd = await this.prisma.urls.update({
        where: { created_by: user.sub, url_short },
        data: {
          title: dto.title,
          description: dto.description,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Url description updated',
        data: upd,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException();
        }
      }
      throw error;
    }
  }

  async remove(url_short: string, user: any) {
    try {
      let session_id: string;
      let created_by: string;

      if (typeof user === 'string') {
        session_id = user;

        await this.prisma.urls.delete({
          where: { session_id, url_short },
        });
      } else {
        created_by = user.sub;

        await this.prisma.urls.delete({
          where: { created_by, url_short },
        });
      }

      return new HttpException('Link deleted', 204);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException();
        }
      }
      throw error;
    }
  }
}
