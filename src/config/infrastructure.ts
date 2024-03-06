import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { Injectable, Logger } from '@nestjs/common';
const { env } = process;

@Injectable()
export class AWSInfrastructure {
  private readonly logger = new Logger(AWSInfrastructure.name);
  private ssmClient = new SSMClient({ region: env.AWS_REGION });

  async getSSMValue(paramName: string) {
    const params = {
      Name: paramName,
      WithDecryption: true,
    };
    try {
      this.logger.log(`Getting SSM Param: ${paramName}`);
      const command = new GetParameterCommand(params);
      const response = await this.ssmClient.send(command);
      return response.Parameter.Value;
    } catch (error) {
      this.logger.error(`Error retrieving secret: ${error}`);
      throw error;
    }
  }
}
