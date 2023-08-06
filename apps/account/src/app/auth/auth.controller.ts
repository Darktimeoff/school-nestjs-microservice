import { Body, ClassSerializerInterceptor, Controller, Post, Res, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@ApiHeader({
    name: 'Authentication routes',
})
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Post('register')
    @UsePipes(ValidationPipe)
    @UseInterceptors(ClassSerializerInterceptor)
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Body() dto: LoginDto, @Res({passthrough: true}) res: Response) {
        const userEnity = await this.authService.validateUser(dto);
        const token = await this.authService.login(userEnity._id);
        
        //@ts-ignore
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })

        return userEnity;
    }
}
