import { AWSInfrastructure } from './infrastructure';

const infra = new AWSInfrastructure();

export default async () => ({
  database: {
    password: infra.getSSMValue(process.env.DATABASE_PASSWORD),
    host: infra.getSSMValue(process.env.DATABASE_HOST),
    username: infra.getSSMValue(process.env.DATABASE_USERNAME),
    name: infra.getSSMValue(process.env.DATABASE_NAME),
  },
  aws: {
    region: process.env.AWS_REGION,
  },
  cognito: {
    userPoolId: infra.getSSMValue(process.env.COGNITO_USERPOOL_ID),
    userPoolClientId: infra.getSSMValue(process.env.COGNITO_USERPOOL_CLIENT_ID),
  },
});
