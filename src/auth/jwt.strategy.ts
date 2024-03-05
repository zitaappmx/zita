import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const clientId = configService.get<string>('cognito.userPoolClientId');
    const userPoolId = configService.get<string>('cognito.userPoolId');
    const awsRegion = configService.get<string>('aws.region');
    const authority = `https://cognito-idp.${awsRegion}.amazonaws.com/${userPoolId}`;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      _audience: clientId,
      issuer: authority,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `${authority}/.well-known/jwks.json`,
      }),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, groups: payload['cognito:groups'] };
  }
}
