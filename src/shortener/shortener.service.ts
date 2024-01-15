import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { UpdateShortenerDto } from './dto/update-shortener.dto';
import { WoozService } from 'src/wooz/wooz.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

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

      if (!user) {
        url_ttl = (currentDate.getTime() + 3 * 60 * 60 * 1000).toString();
        created_by = 'e19a18f4-b37d-11ee-a506-0242ac120002';
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

  findAll() {
    return `This action returns all shortener`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shortener`;
  }

  update(id: number, updateShortenerDto: UpdateShortenerDto) {
    return `This action updates a #${id} shortener`;
  }

  remove(id: number) {
    return `This action removes a #${id} shortener`;
  }
}
