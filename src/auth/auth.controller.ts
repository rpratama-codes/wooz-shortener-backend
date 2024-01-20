import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto, RefreshDto, RegisterDto } from './dto';
import { GetUser } from './decorator';
import { RefreshGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  refresh(@GetUser() dto: RefreshDto) {
    return this.authService.refreshToken(dto);
  }

  @Delete('remove-session')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RefreshGuard)
  removeSession(@GetUser() dto: RefreshDto) {
    return this.authService.removeSession(dto);
  }
}
