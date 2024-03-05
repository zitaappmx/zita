import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

enum Environment {
  dev = 'dev',
  prod = 'prod',
}

enum AwsRegion {
  'us-east-1' = 'us-east-1',
  'us-east-2' = 'us-east-2',
  'us-west-1' = 'us-west-1',
  'us-west-2' = 'us-west-2',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsDefined()
  NODE_ENV: Environment;

  @IsDefined()
  @IsString()
  @MinLength(1)
  COGNITO_USERPOOL_ID: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  COGNITO_USERPOOL_CLIENT_ID: string;

  @IsDefined()
  @IsEnum(AwsRegion)
  AWS_REGION: AwsRegion;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_HOST: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_USERNAME: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_PASSWORD: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_NAME: string;
}

export function validateConfig(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  let index = 0;
  for (const err of errors) {
    Object.values(err.constraints).map((str) => {
      ++index;
      console.log(index, str);
    });
    console.log('\n ***** \n');
  }
  if (errors.length)
    throw new Error('Please provide the valid ENVs mentioned above');
  return finalConfig;
}
