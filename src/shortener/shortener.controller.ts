import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { UpdateShortenerDto } from './dto/update-shortener.dto';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  create(@Body() dto: CreateShortenerDto) {
    return this.shortenerService.create(dto);
  }

  @Get()
  findAll() {
    return this.shortenerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortenerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateShortenerDto) {
    return this.shortenerService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortenerService.remove(+id);
  }
}
