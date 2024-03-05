import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ConfirmPasswordDto } from './dto/confirmPassword.dto';
import { LogInDto } from './dto/logIn.dto';
import { ResendConfirmationCodeDto } from './dto/resendConfirmationCode.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async logIn(@Body() logInDto: LogInDto) {
    return await this.authService.logIn(logInDto);
  }

  @Post('signup')
  async signUp(@Body() signInDto: SignInDto) {
    return await this.authService.signUp(signInDto);
  }

  @Post('verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return await this.authService.verifyEmail(verifyEmailDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('confirm-password')
  async confirmPassword(@Body() confirmPasswordDto: ConfirmPasswordDto) {
    return await this.authService.confirmPassword(confirmPasswordDto);
  }

  @Post('resend-code')
  async resendConfirmationCode(
    @Body() resendConfirmationCodeDto: ResendConfirmationCodeDto,
  ) {
    return await this.authService.resendConfirmationCode(
      resendConfirmationCodeDto,
    );
  }
}
