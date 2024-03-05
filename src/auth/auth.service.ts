import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SignUpCommand,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  UsernameExistsException,
  InvalidParameterException,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  CodeMismatchException,
  ExpiredCodeException,
  UserNotFoundException,
  InitiateAuthCommand,
  NotAuthorizedException,
  ResendConfirmationCodeCommand,
  AuthFlowType,
  AdminAddUserToGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { SignInDto } from './dto/signIn.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { InternalServerError } from '@aws-sdk/client-ssm';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ConfirmPasswordDto } from './dto/confirmPassword.dto';
import { LogInDto } from './dto/logIn.dto';
import { ResendConfirmationCodeDto } from './dto/resendConfirmationCode.dto';
import { AddUsertoGroupDto, AppGroups } from './dto/addUsertoGroup.dto';

@Injectable()
export class AuthService {
  private userPool;
  private clientId = this.configService.get('cognito.userPoolClientId');
  private userPoolId = this.configService.get<string>('cognito.userPoolId');
  private readonly logger = new Logger(AuthService.name);

  constructor(private configService: ConfigService) {
    this.userPool = new CognitoIdentityProviderClient({});
  }

  async logIn({ userEmail, password }: LogInDto) {
    const command = new InitiateAuthCommand({
      ClientId: this.clientId,
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: userEmail,
        PASSWORD: password,
      },
    });
    try {
      const response = await this.userPool.send(command);
      return response;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof InvalidParameterException)
        throw new BadRequestException(error.message);
      if (error instanceof NotAuthorizedException)
        throw new UnauthorizedException(error.message);
      if (error instanceof UserNotFoundException)
        throw new UnauthorizedException(error.message);
      throw new InternalServerError(error.message);
    }
  }

  async signUp({ userEmail, password, phoneNumber }: SignInDto) {
    const command = new SignUpCommand({
      ClientId: this.clientId,
      Username: userEmail,
      Password: password,
      UserAttributes: [
        {
          Name: 'phone_number',
          Value: phoneNumber,
        },
      ],
    });
    try {
      const response = await this.userPool.send(command);
      return response;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof UsernameExistsException)
        throw new ConflictException(error.message);
      if (error instanceof InvalidParameterException)
        throw new BadRequestException(error.message);
      throw new InternalServerError(error.message);
    }
  }

  async verifyEmail({ userEmail, confirmationCode }: VerifyEmailDto) {
    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      Username: userEmail,
      ConfirmationCode: confirmationCode,
    });
    try {
      const response = this.userPool.send(command);
      await this.addUsertoGroup({ userEmail, groupName: AppGroups.admin });
      return response;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof InvalidParameterException)
        throw new BadRequestException(error.message);
      if (error instanceof UserNotFoundException)
        throw new BadRequestException(error.message);
      throw new InternalServerError(error.message);
    }
  }

  async forgotPassword({ userEmail }: ForgotPasswordDto) {
    const command = new ForgotPasswordCommand({
      ClientId: this.clientId,
      Username: userEmail,
    });
    try {
      const response = await this.userPool.send(command);
      return response;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof UserNotFoundException)
        throw new BadRequestException(error.message);
      throw new InternalServerError(error.message);
    }
  }

  async confirmPassword({
    userEmail,
    confirmationCode,
    password,
  }: ConfirmPasswordDto) {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: this.clientId,
      Username: userEmail,
      Password: password,
      ConfirmationCode: confirmationCode,
    });

    try {
      const response = await this.userPool.send(command);
      return response;
    } catch (error) {
      this.logger.error(error.message);
      if (
        error instanceof CodeMismatchException ||
        error instanceof ExpiredCodeException
      )
        throw new UnauthorizedException(error.message);
      if (error instanceof InvalidParameterException)
        throw new BadRequestException(error.message);
      if (error instanceof UserNotFoundException)
        throw new BadRequestException(error.message);
      throw new InternalServerError(error.message);
    }
  }

  async resendConfirmationCode({ userEmail }: ResendConfirmationCodeDto) {
    const command = new ResendConfirmationCodeCommand({
      ClientId: this.clientId,
      Username: userEmail,
    });
    try {
      const response = await this.userPool.send(command);
      return response;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof UserNotFoundException)
        throw new BadRequestException(error.message);
      throw new InternalServerError(error.message);
    }
  }

  async addUsertoGroup({ userEmail, groupName }: AddUsertoGroupDto) {
    const command = new AdminAddUserToGroupCommand({
      UserPoolId: this.userPoolId,
      Username: userEmail,
      GroupName: groupName,
    });
    const response = await this.userPool.send(command);
    return response;
  }
}
