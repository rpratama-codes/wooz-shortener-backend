import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticService } from './analytic.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { UserFromJwt } from 'src/auth/dto';

@Controller('analytic')
export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllByUserUid(@GetUser() user: UserFromJwt) {
    return this.analyticService.findAllByUserUid(user);
  }
}
