import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { UpdateShortenerDto } from './dto/update-shortener.dto';
import { GetUser } from 'src/auth/decorator';
import { JwtAuthGuard } from '../auth/guard';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateShortenerDto, @GetUser() user: any) {
    return this.shortenerService.create(dto, user);
  }

  @Post('guest')
  createProtected(@Body() dto: CreateShortenerDto) {
    return this.shortenerService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser() user: any) {
    return this.shortenerService.findAll(user);
  }

  @Get(':url_short')
  redirect(@Param('url_short') url_short: string) {
    return this.shortenerService.redirect(url_short);
  }

  @Patch(':url_short')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('url_short') url_short: string,
    @Body() dto: UpdateShortenerDto,
    @GetUser() user: any,
  ) {
    return this.shortenerService.update(url_short, dto, user);
  }

  @Delete(':url_short')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('url_short') url_short: string, @GetUser() user: any) {
    return this.shortenerService.remove(url_short, user);
  }

  @Delete('guest/:url_short/:session_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeGuestUrl(
    @Param('url_short') url_short: string,
    @Param('session_id') session_id: string,
  ) {
    return this.shortenerService.remove(url_short, session_id);
  }
}
