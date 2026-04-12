import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    registerAuth(@Body() registerDto: RegisterDto) {
        return this.authService.registerAuth(registerDto);
    }

    @Post('login')
    loginAuth(@Body() loginDto: LoginDto) {
        return this.authService.loginAuth(loginDto);
    }
}
